"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateProfileImage = async ({
  image,
  id,
}: {
  image: string;
  id: string;
}) => {
  try {
    const updatedProfile = await prisma.user.update({
      where: { id },
      data: {
        image,
      },
    });

    if (updatedProfile) {
      revalidatePath("/");
      return {
        success: true,
        message: "Profile image update successfully",
      };
    }

    return {
      success: false,
      error: "Could not update profile image, try later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, updating profile image",
    };
  }
};
