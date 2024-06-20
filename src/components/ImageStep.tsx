"use client";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { deleteFile } from "@/actions/uploadActions";
import { Button } from "./ui/button";
import _ from "lodash";
import { PropertyExt } from "@/types";
import { useEffect, useState } from "react";
import { deleteImage } from "@/actions/propertyActions";
import { toast } from "sonner";

interface Props {
  className?: string;
  next: () => void;
  back: () => void;
  images: string[];
  property?: PropertyExt | null | undefined;
  setImages: (images: string[]) => void;
  setImageIds: (imageIds: string[]) => void;
}

const ImageStep = ({
  className,
  next,
  back,
  images,
  setImages,
  setImageIds,
  property,
}: Props) => {
  const [imageDeleteIds, setImageDeleteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!_.isEmpty(property)) {
      property.images.map((image) => {
        if (!images.includes(image.url)) {
          images.push(image.url);
          imageDeleteIds.push(image.id);
        }
      });
    }
  }, [images, property, imageDeleteIds]);

  return (
    <div className={cn("mt-5 flex flex-col justify-start", className)}>
      <div className="flex mt-5">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            console.log("Upload Completed");
            setImages([res[0].url, ...images]);
            setImageIds(imageDeleteIds);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {images.map((image, index) => (
          <Card key={index}>
            <CardContent className="relative w-full h-[200px]">
              <Image src={image} fill alt={image} className="rounded-md" />
              <Trash2Icon
                className="absolute top-1 right-1 text-red-800 cursor-pointer hover:shadow-lg"
                onClick={async () => {
                  setImages([
                    ...images.slice(0, index),
                    ...images.slice(index + 1),
                  ]);

                  //delete file from uploadthing
                  deleteFile(image)
                    .then((res) => {
                      if (res.success) {
                        console.log("file deleted successfully");
                        const deleteImageId =
                          property &&
                          property.images &&
                          property.images.find((item) => item.url === image)
                            ?.id;
                        deleteImage(deleteImageId as string).then((res) => {
                          if (res.success) {
                            console.log("image deleted successfully");
                            return toast.success(res.message);
                          } else {
                            return toast.error(res.error);
                          }
                        });
                      } else {
                        return toast.error(res.error);
                      }
                    })
                    .catch((err) => {
                      toast.error("Internal Server Error");
                    });
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* buttons */}
      <div className="flex gap-5 mt-5">
        <Button onClick={back}>
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button
          disabled={_.isEmpty(images)}
          onClick={() => {
            next();
            // setImages(images);
          }}
        >
          Next
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ImageStep;
