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

    // ✅ whitelist fields only
    const updateData: Partial<StoryInterface> = {
      ...(body.id_number && { id_number: body.id_number }),
      ...(body.title &&
        body.title.first_name &&
        body.title.last_name && { title: body.title }),
      ...(body.nickname && { nickname: body.nickname }),
      ...(body.profession && { profession: body.profession }),
      ...(body.gender && { gender: body.gender }),
      ...(body.birth_date && { birth_date: new Date(body.birth_date) }),
      ...(body.death_date && { death_date: new Date(body.death_date) }),
      ...(body.social_media && { social_media: body.social_media }),
      ...(body.location && { location: body.location }),
      ...(body.bio && { bio: body.bio }),
      ...(body.image && { image: body.image }),
      ...(body.warTitle && { warTitle: body.warTitle }),
      updatedAt: new Date(),
    };

    // Calculate age if dates are provided
    if (body.birth_date && body.death_date) {
      updateData.age =
        new Date(body.death_date).getFullYear() -
        new Date(body.birth_date).getFullYear();
    }

    // Status logic
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
