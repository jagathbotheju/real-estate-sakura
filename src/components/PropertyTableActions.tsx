"use client";
import { Edit2Icon, EyeIcon, FilePenIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { PropertyTableData } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { deleteProperty } from "@/actions/propertyActions";
import { deleteFile } from "@/actions/uploadActions";
import { toast } from "sonner";

interface Props {
  data: PropertyTableData;
}

const PropertyTableActions = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();

  // console.log("PropertyTableActions", data);

  return (
    <div className="flex gap-6 items-center">
      <TooltipProvider>
        {/* view */}
        <Tooltip>
          <TooltipTrigger>
            <Link href={`/user/properties/${data.propertyId}`}>
              <EyeIcon className="w-5 h-5 cursor-pointer" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View</p>
          </TooltipContent>
        </Tooltip>

        {/* edit */}
        <Tooltip>
          <TooltipTrigger>
            <Link href={`/user/properties/edit/${data.propertyId}`}>
              <FilePenIcon className="w-5 h-5 cursor-pointer" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        {/* delete */}
        <Tooltip>
          <TooltipTrigger>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2Icon className="w-5 h-5 cursor-pointer text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure to delete this Property?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your record and remove your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      startTransition(() => {
                        deleteProperty(data)
                          .then((res) => {
                            if (res.success) {
                              data.images.map((image) => {
                                deleteFile(image.url);
                              });
                              return toast.success(res.message);
                            } else {
                              return toast.error(res.error);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            return toast.error(err.message);
                          });
                      });
                    }}
                  >
                    DELETE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PropertyTableActions;
