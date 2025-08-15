import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { StoryInterface } from "@/app/interfaces";
import { Role, StoryStatus } from "@/app/enums";

import type { NextRequest } from "next/server";

type Params = Promise<{ id: string }>;
const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid story ID format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ghorabaa");
    const storiesCollection = db.collection("stories");

    // Get existing story
    const existingStory = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Authorization check
    if (
      existingStory.publisher_id.toString() !== token.id &&
      token.role !== Role.ADMIN
    ) {
      return NextResponse.json(
        { error: "Not authorized to update this story" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      id_number,
      name,
      nickname,
      profession,
      gender,
      birth_date,
      death_date,
      social_media,
      city,
      neighborhood,
      bio,
      image,
      warTitle,
      ...rest
    } = body;

    // Remove _id from rest if it exists
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...safeRest } = rest;

    const age = birth_date
      ? new Date(death_date).getFullYear() - new Date(birth_date).getFullYear()
      : null;

    // Basic validation
    if (!name?.first_name || !name?.last_name) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    const updateData: Partial<StoryInterface> = {
      ...safeRest,
      id_number,
      name,
      age,
      ...(nickname && { nickname }),
      ...(profession && { profession }),
      ...(gender && { gender }),
      ...(birth_date && { birth_date: new Date(birth_date) }),
      ...(death_date && { death_date: new Date(death_date) }),
      ...(social_media && { social_media }),
      ...(city && { city }),
      ...(neighborhood && { neighborhood }),
      ...(bio && { bio }),
      ...(image && { image }),
      ...(warTitle && { warTitle }),
      updatedAt: new Date(),
    };

    // For admin updates, preserve the original status
    if (
      token.role !== Role.ADMIN &&
      existingStory.status === StoryStatus.APPROVED
    ) {
      updateData.status = StoryStatus.PENDING;
    }

    const result = await storiesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes were made to the story" },
        { status: 400 }
      );
    }

    const updatedStory = await storiesCollection.findOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json(
      { message: "Story updated successfully", data: updatedStory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json(
      { error: "Failed to update story" },
      { status: 500 }
    );
  }
}
