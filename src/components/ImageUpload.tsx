"use client";
import { useDropzone } from "@uploadthing/react";
import { CloudUpload, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const ImageUpload = ({ value, onChange, setFiles }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onChange(URL.createObjectURL(acceptedFiles[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-[300px] w-[300px] cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 border-2 border-dashed items-center justify-center"
    >
      <input {...getInputProps()} />

      {value ? (
        <>
          <div className="h-[300px] w-[300px] relative ">
            <Image
              src={value}
              alt="image"
              // width={500}
              // height={500}
              fill
              className="top-0 left-0 relative w-full h-full object-top object-cover "
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center py-5 text-grey-500 text-slate-500 w-[300px] h-[300px]">
            <CloudUpload className="h-10 w-10" />
            <h3 className="mb-2 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            {/* <Button type="button" className="rounded-full">
              Select from computer
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
