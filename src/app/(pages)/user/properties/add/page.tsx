import { auth } from "@/auth";
import AddPropertyForm from "@/components/AddPropertyForm";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);
  const session = await auth();
  const user = session?.user as User;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex container px-20 mx-auto flex-col">
      <div className="my-10 flex flex-col w-full">
        <h2 className="text-3xl font-semibold py-2-">Add Property</h2>
        <Separator className="mt-5" />
      </div>

      <AddPropertyForm
        types={propertyTypes}
        statuses={propertyStatuses}
        user={user}
      />
    </div>
  );
};

export default AddPropertyPage;
