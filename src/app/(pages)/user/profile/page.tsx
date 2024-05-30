import { auth } from "@/auth";
import { User } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { UploadButton } from "@/lib/uploadthing";
import { Edit2 } from "lucide-react";
import { CloudUpload, Trash2 } from "lucide-react";
import ImageUploadForm from "@/components/ImageUploadForm";

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user as User;

  if (!user) {
    return redirect("/auth/signin");
  }

  // console.log("ProfilePage", user);

  return (
    <div className="flex container px-20 mx-auto">
      <div className="mt-10 flex flex-col w-full">
        <h2 className="text-3xl font-semibold py-2-">My Profile</h2>

        <div className="flex flex-col border rounded-t-md mt-5 w-[70%] shadow-lg">
          <h3 className="font-semibold text-lg bg-slate-200 p-3 text-muted-foreground">
            Basic Information
          </h3>

          <div className="flex w-full">
            <ImageUploadForm user={user} />

            <div className="p-4 flex flex-col w-full">
              <h4 className="font-semibold text-xl">{user.name}</h4>
              <p className="text-xs">{user.email}</p>
              <p>member since {format(user.createdAt, "yyyy-MMM-dd")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
