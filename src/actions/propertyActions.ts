"use server";
import prisma from "@/lib/prisma";
import { Property, PropertyImage } from "@prisma/client";
import { PropertyFormData, PropertyTableData } from "@/types";
import { revalidatePath } from "next/cache";

export const deleteImage = async (imageId: string) => {
  try {
    const deletedImage = await prisma.propertyImage.delete({
      where: {
        id: imageId,
      },
    });

    if (deletedImage) {
      revalidatePath(`/user/properties`);
      return {
        success: true,
        message: "Image deleted successfully",
      };
    }

    return {
      success: false,
      error: "Could not delete image, please try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, deleting image",
    };
  }
};

export const updateProperty = async ({
  formData,
  imageIds,
}: {
  formData: PropertyFormData;
  imageIds: string[];
}) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: {
        id: formData.id,
      },
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        propertyType: {
          update: {
            value: formData.type,
          },
        },
        propertyStatus: {
          update: {
            value: formData.status,
          },
        },
        images: {
          create: formData.images,
          deleteMany: {
            id: { in: imageIds },
          },
        },
        propertyLocation: {
          update: formData.propertyLocation,
        },
        propertyFeature: {
          update: formData.propertyFeature,
        },
        contact: {
          update: formData.contact,
        },
      },
    });

    if (updatedProperty) {
      revalidatePath("/user/properties");
      return {
        success: true,
        message: "Property updated successfully",
      };
    }

    return {
      success: false,
      error: "Could not update property, try again later.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error, updating property...",
    };
  }
};

export const deleteProperty = async (property: PropertyTableData) => {
  console.log("deleteProperty -Server", property);

  // const deleteImages = prisma.propertyImage.deleteMany({
  //   where: {
  //     id: {
  //       in: property.images.map((image: PropertyImage) => image.id),
  //     },
  //   },
  // });

  const deleteProperty = await prisma.property.delete({
    where: {
      id: property.id,
    },
  });

  // const [resDeleteImages, resDeleteProperty] = await Promise.all([
  //   deleteImages,
  //   deleteProperty,
  // ]);

  if (deleteProperty) {
    revalidatePath("/user/properties");
    return {
      success: true,
      message: "Property deleted successfully",
    };
  }

  try {
    return {
      success: true,
      error: "Unable to delete property, try again later",
    };
  } catch (error) {
    console.log("deleteProperty", error);
    return {
      success: false,
      error: "Internal Server Error, deleting property...",
    };
  }
};

export const createProperty = async (formData: PropertyFormData) => {
  console.log("creteProperty - server", formData);
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
