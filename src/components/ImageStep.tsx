"use client";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { deleteFile } from "@/actions/uploadActions";
import { Button } from "./ui/button";
import _ from "lodash";

interface Props {
  className?: string;
  next: () => void;
  back: () => void;
  images: string[];
  setImages: (images: string[]) => void;
}

const ImageStep = ({ className, next, back, images, setImages }: Props) => {
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
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <div className="flex gap-5 mt-8">
        {images.map((image, index) => (
          <Card key={index}>
            <CardContent className="relative w-[250px] h-[200px]">
              <Image src={image} fill alt={image} />
              <Trash2Icon
                className="absolute top-1 right-1 text-red-800 cursor-pointer hover:shadow-lg"
                onClick={async () => {
                  setImages([
                    ...images.slice(0, index),
                    ...images.slice(index + 1),
                  ]);

                  //delete file from uploadthing
                  await deleteFile(image);
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
        <Button disabled={_.isEmpty(images)} onClick={next}>
          Next
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ImageStep;
