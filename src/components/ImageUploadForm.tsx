"use client";
import { ProfileSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import ImageUpload from "./ImageUpload";
import { useEffect, useState, useTransition } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "./ui/button";
import { ImagePlus, SaveAllIcon, SaveIcon } from "lucide-react";
import { updateProfileImage } from "@/actions/userActions";
import { toast } from "sonner";

interface Props {
  user: User;
}

const ImageUploadForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing("imageUploader");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      image: "",
    },
    mode: "all",
  });

  useEffect(() => {
    if (user && user.image) {
      form.setValue("image", user.image);
    }
  }, [form, user]);

  const onSubmit = async (formData: z.infer<typeof ProfileSchema>) => {
    let uploadedImageUrl = formData.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
      if (uploadedImageUrl) {
        formData.image = uploadedImageUrl;
        startTransition(() => {
          updateProfileImage({ image: uploadedImageUrl, id: user.id })
            .then((res) => {
              console.log("ImageUploadForm", res);
              if (res.success) {
                return toast.success(res.message);
              } else {
                return toast.error(res.error);
              }
            })
            .catch((err) => {
              return toast.error(err);
            });
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex relative">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url) => field.onChange(url)}
                  setFiles={setFiles}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          size="icon"
          type="submit"
          className="absolute bottom-1 right-1"
        >
          <SaveIcon />
        </Button>
      </form>
    </Form>
  );
};

export default ImageUploadForm;
