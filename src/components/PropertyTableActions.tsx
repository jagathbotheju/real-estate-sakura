import { Edit2Icon, EyeIcon, FilePenIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { PropertyTableData } from "@/types";

interface Props {
  data: PropertyTableData;
}

const PropertyTableActions = ({ data }: Props) => {
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
            <Link href={`/user/properties/delete/${data.propertyId}`}>
              <Trash2Icon className="w-5 h-5 cursor-pointer text-red-500" />
            </Link>
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
