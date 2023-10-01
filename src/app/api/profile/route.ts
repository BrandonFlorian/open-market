import { profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "@/types/constants";
import prisma from "@/services/prismaClient";
import { authorizeUser } from "@/lib/serverUtils";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Not found" },
      { status: HTTP_STATUS_CODES.NOT_FOUND }
    );
  }

  try {
    if (!prisma) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    const token = request.headers.get("Authorization");
    const userData = await authorizeUser(token);

    if (!userData) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      );
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    // If a user ID is provided, fetch the single user
    if (username) {
      if (username !== userData.user.user_metadata.username) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: HTTP_STATUS_CODES.UNAUTHORIZED }
        );
      }
      return await getUserByUsername(username);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
  //server error
  return NextResponse.json(
    { message: "Server Error" },
    { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
  );
}

//Needs to be updated to take in a username and auth header to check if the user is authorized to create the profile
export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }
  if (!prisma) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }

  // Parse the request body
  const body = JSON.parse(await request.text());

  // Extract and validate required fields
  const { firstName, lastName, email, username } = body;

  // These fields are required for user creation
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof username !== "string"
  ) {
    return NextResponse.json(
      { message: "Bad Request" },
      { status: HTTP_STATUS_CODES.BAD_REQUEST }
    );
  }

  // Optional fields with validation
  const phoneNumber =
    typeof body.phoneNumber === "string" ? body.phoneNumber : null;
  const dateOfBirth =
    typeof body.dateOfBirth === "string" ? body.dateOfBirth : null;
  const profileImageUrl =
    typeof body.profileImageUrl === "string" ? body.profileImageUrl : null;
  const bio = typeof body.bio === "string" ? body.bio : null;

  // Use Prisma to create a new user
  try {
    const newUser: profile = await prisma.profile.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        profile_image_url: profileImageUrl,
        bio: bio,
        updated_at: new Date(),
        created_at: new Date(),
      },
    });

    return NextResponse.json(newUser, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    console.error("Request method is not PUT");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }
  if (!prisma) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }

  try {
    const token = request.headers.get("Authorization");

    const userData = await authorizeUser(token);

    if (!userData) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      );
    }

    // Parse the request body
    const body = JSON.parse(await request.text());
    // Get the user ID from the URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("username");
    // Check if userId is null
    if (!userId) {
      return NextResponse.json(
        { message: "Bad Request" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    // Validate the data
    const {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      bio,
      dateOfBirth,
      profileImageUrl,
      id,
    } = body;

    return await updateUser(userId, {
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      phone_number: phoneNumber,
      bio: bio,
      date_of_birth: dateOfBirth,
      profile_image_url: profileImageUrl,
      updated_at: new Date(),
      created_at: new Date(),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function updateUser(username: string, data: profile) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    const payload = {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      username: data.username,
      phoneNumber: data.phone_number,
      bio: data.bio,
      dateOfBirth: data.date_of_birth,
      profileImageUrl: data.profile_image_url,
      updatedAt: data.updated_at,
    };
    const updatedUser: profile = await prisma.profile.update({
      where: {
        username: username,
      },
      data: payload,
    });

    return NextResponse.json(updatedUser, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getUserByUsername(username: string) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    const user = await prisma.profile.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(user, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getAllUsers() {
  try {
    if (!prisma) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
    const users = await prisma.profile.findMany();

    if (!users) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(users, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
