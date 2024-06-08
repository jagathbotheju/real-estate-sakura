import PropertyImageSlider from "@/components/PropertyImageSlider";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import prisma from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

const PropertyDetails = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      propertyFeature: true,
      propertyLocation: true,
      propertyStatus: true,
      contact: true,
    },
  });

  return (
    <div className="flex container px-20 mx-auto">
      <div className="mt-10 flex flex-col w-full">
        <div>
          <h1 className="text-3xl font-bold mb-2">Property Details</h1>
          <Separator className="bg-slate-500" />
        </div>

        <div className="flex flex-col md:flex-row mt-10 gap-4">
          <div className="w-full md:w-[60%] rounded-md shadow-md">
            <PropertyImageSlider images={property?.images} />
          </div>

          <div className="flex flex-col p-5 h-[420px] rounded-md shadow-md w-full">
            {/* features */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Features</h3>
              <Separator className="bg-slate-500 my-1" />
              <div className="flex justify-between">
                <p>Bedrooms</p>
                <p>{property?.propertyFeature?.bedrooms}</p>
              </div>
              <div className="flex justify-between">
                <p>Bathrooms</p>
                <p>{property?.propertyFeature?.bathrooms}</p>
              </div>
              <div className="flex justify-between">
                <p>Parkings</p>
                <p>{property?.propertyFeature?.parkingSpots}</p>
              </div>
              <div className="flex justify-between">
                <p>Area</p>
                <p>{property?.propertyFeature?.area}</p>
              </div>
            </div>

            {/* address */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Address</h3>
              <Separator className="bg-slate-500 my-1" />
              <div className="flex justify-between">
                <p>City</p>
                <p>{property?.propertyLocation?.city}</p>
              </div>
              <div className="flex justify-between">
                <p>Landmark</p>
                <p>{property?.propertyLocation?.landmark}</p>
              </div>
              <div className="flex justify-between">
                <p>Zipcode</p>
                <p>{property?.propertyLocation?.postalCode}</p>
              </div>
              <div className="flex justify-between">
                <p>Address</p>
                <p>{property?.propertyLocation?.address}</p>
              </div>
            </div>

            {/* owner details */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Features</h3>
              <Separator className="bg-slate-500 my-1" />
              <div className="flex justify-between">
                <p>Name</p>
                <p>{property?.contact?.name}</p>
              </div>
              <div className="flex justify-between">
                <p>Email</p>
                <p>{property?.contact?.email}</p>
              </div>
              <div className="flex justify-between">
                <p>Phone</p>
                <p>{property?.contact?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-5">
          <h2 className="text-3xl font-bold">
            {formatPrice(property?.price ?? 0)}
          </h2>
          <Separator className="bg-slate-500" orientation="vertical" />
          <h2 className="text-3xl font-bold">
            {property?.propertyStatus.value}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
