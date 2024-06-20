import { auth } from "@/auth";
import AddPropertyForm from "@/components/AddPropertyForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import Link from "next/link";
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
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold py-2-">Add Property</h2>
          <Button asChild variant="outline">
            <Link href="/user/properties">Cancel</Link>
          </Button>
        </div>
        <Separator className="mt-5" />
      </div>

      <AddPropertyForm
        types={propertyTypes}
        statuses={propertyStatuses}
        user={user}
        isEdit={false}
      />
    </div>
  );
};

export default AddPropertyPage;
