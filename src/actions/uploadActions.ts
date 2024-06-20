"use server";

import { UTApi } from "uploadthing/server";

export const deleteFile = async (url: string) => {
  console.log("delete url...", url);
  try {
    const newUrl = url.substring(url.lastIndexOf("/") + 1);
    console.log("delete new url...", newUrl);
    const utapi = new UTApi();
    const response = await utapi.deleteFiles(newUrl);

    // console.log("deleteFile response", response);

    if (response.success) {
      return {
        success: true,
        message: "Image deleted successfully",
      };
    }

    return {
      success: false,
      message: "Could not delete image, please try again later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: error,
      error: "Internal Server Error, deleting file",
    };
  }
};
