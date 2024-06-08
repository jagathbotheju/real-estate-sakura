"use server";

import { UTApi } from "uploadthing/server";

export const deleteFile = async (url: string) => {
  try {
    const newUrl = url.substring(url.lastIndexOf("/") + 1);
    const utapi = new UTApi();
    const response = await utapi.deleteFiles(newUrl);

    console.log(response);
  } catch (error) {
    console.log(error);
    return {
      success: error,
      error: "Internal Server Error, deleting file",
    };
  }
};
