import { auth } from "@/auth";
import AddPropertyForm from "@/components/AddPropertyForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { PropertyExt } from "@/types";
import { Property, User } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import _ from "lodash";

interface Props {
  params: {
    id: string;
  };
}

const PropertyEditPage = async ({ params }: Props) => {
  const [propertyTypes, propertyStatuses, property] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        propertyType: true,
        propertyFeature: true,
        propertyLocation: true,
        propertyStatus: true,
        images: true,
        contact: true,
      },
    }),
  ]);

  const session = await auth();
  const user = session?.user as User;

  console.log("PropertyEditPage property**********", property);

  if (!user) {
    redirect("/auth/signin");
  }
  if (
    _.isEmpty(propertyTypes) ||
    _.isEmpty(propertyStatuses) ||
    _.isEmpty(property) ||
    _.isEmpty(property.propertyLocation)
  ) {
    return notFound();
  }

  return (
    <div className="flex container px-20 mx-auto">
      <div className="my-10 flex flex-col w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold py-2-">Edit Property</h2>
          <Button asChild variant="outline">
            <Link href="/user/properties">Cancel</Link>
          </Button>
        </div>
        <Separator className="mt-2 mb-8 bg-slate-700" />

        <AddPropertyForm
          types={propertyTypes}
          statuses={propertyStatuses}
          user={user}
          property={property as PropertyExt}
          isEdit
        />
      </div>
    </div>
  );
};

export default PropertyEditPage;
