import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import _ from "lodash";
import { PropertyTableData } from "@/types";
import { formatPrice } from "@/lib/formatPrice";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/DataTable";
import PropertyTableColumns from "@/components/PropertyTableColumns";
import TablePagination from "@/components/TablePagination";

const PAGE_SIZE = 10;

interface Props {
  searchParams: {
    page: string;
  };
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const currentPage = searchParams.page ?? 0;
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/auth/signin");

  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user.id,
    },
    include: {
      contact: true,
      images: true,
      propertyFeature: true,
      propertyLocation: true,
      propertyStatus: true,
      propertyType: true,
    },
    // skip: +currentPage * PAGE_SIZE,
    // take: PAGE_SIZE,
  });

  const propertyCountPromise = prisma.property.count({
    where: {
      userId: user.id,
    },
  });

  const [properties, propertyCount] = await Promise.all([
    propertiesPromise,
    propertyCountPromise,
  ]);
  const totalPages = Math.floor(propertyCount / PAGE_SIZE);

  const propertyTableData: PropertyTableData[] = [];
  properties.map((property) => {
    const data: PropertyTableData = {
      id: property.id,
      name: property.name,
      price: formatPrice(property.price),
      type: property.propertyType.value,
      typeData: property.propertyType,
      status: property.propertyStatus.value,
      statusData: property.propertyStatus,
      userId: property.userId,
      propertyId: property.id,
      images: property.images,
      contact: property.contact,
      location: property.propertyLocation,
      feature: property.propertyFeature,
    };
    propertyTableData.push(data);
  });

  // console.log("PropertiesPage", properties);

  return (
    <div className="flex container px-20 mx-auto">
      <div className="mt-10 flex flex-col w-full">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold py-2-">My Properties</h2>
          <Button asChild variant="destructive">
            <Link href="/user/properties/add">NEW</Link>
          </Button>
        </div>
        <Separator className="mt-5" />

        {_.isEmpty(properties) ? (
          <>
            <div className="flex container px-20 mx-auto mt-20">
              <div className="bg-red-100 rounded-md p-10">
                <h1 className="text-3xl font-semibold">Properties Not Found</h1>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* data table */}
            <div className="flex flex-col gap-4">
              <Suspense fallback={<Loader />}>
                <DataTable
                  columns={PropertyTableColumns}
                  data={propertyTableData}
                />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
