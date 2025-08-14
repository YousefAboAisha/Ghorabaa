import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { StoryInterface } from "@/app/interfaces";
import { Role, StoryStatus } from "@/app/enums";

import type { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const storyId = params.id;
    if (!ObjectId.isValid(storyId)) {
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
      _id: new ObjectId(storyId),
    });

    if (!existingStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Authorization check - only allow updates by original publisher or admin
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
    } = body;

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
    // For regular users, reset to pending if updating approved story
    if (
      token.role !== Role.ADMIN &&
      existingStory.status === StoryStatus.APPROVED
    ) {
      updateData.status = StoryStatus.PENDING;
    }

    const result = await storiesCollection.updateOne(
      { _id: new ObjectId(storyId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes were made to the story" },
        { status: 400 }
      );
    }

    // Get updated story to return
    const updatedStory = await storiesCollection.findOne({
      _id: new ObjectId(storyId),
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
