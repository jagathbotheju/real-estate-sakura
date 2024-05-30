import AddPropertyForm from "@/components/AddPropertyForm";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);
  // const propertyTypes = await prisma.propertyType.findMany();

  return (
    <div className="flex container px-20 mx-auto flex-col">
      <div className="my-10 flex flex-col w-full">
        <h2 className="text-3xl font-semibold py-2-">Add Property</h2>
        <Separator className="mt-5" />
      </div>

      <AddPropertyForm types={propertyTypes} statuses={propertyStatuses} />
    </div>
  );
};

export default AddPropertyPage;
