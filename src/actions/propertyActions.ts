"use server";
import prisma from "@/lib/prisma";
import { Property } from "@prisma/client";
import { PropertyFormData } from "@/types";
import { revalidatePath } from "next/cache";

export const createProperty = async (formData: PropertyFormData) => {
  console.log("createProperty", "creating property.....");
  try {
    const property = await prisma.property.create({
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        propertyType: {
          connect: { id: formData.type },
        },
        propertyStatus: {
          connect: { id: formData.status },
        },
        images: {
          create: formData.images,
        },
        user: {
          connect: {
            id: formData.userId,
          },
        },
        propertyLocation: {
          create: formData.propertyLocation,
        },
        propertyFeature: {
          create: formData.propertyFeature,
        },
        contact: {
          create: formData.contact,
        },
      },
    });

    if (property) {
      revalidatePath("/user/properties");
      return {
        success: true,
        message: "New Property created successfully",
      };
    }

    return {
      success: false,
      error: "Could not create property, try again later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error, creating property",
    };
  }
};
