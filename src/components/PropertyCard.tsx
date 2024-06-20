import { formatPrice } from "@/lib/formatPrice";
import { PropertyExt } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  property: PropertyExt;
}

const PropertyCard = ({ property }: Props) => {
  // console.log("PropertyCard", property);

  return (
    <Link href={`/user/properties/${property.id}`}>
      <div className="flex flex-col rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-500 w-[300px] h-fit cursor-pointer">
        <div className="w-full h-[250px] relative">
          <Image
            src={property.images[0].url}
            alt="property"
            fill
            className="rounded-md"
          />
        </div>

        <div className="flex flex-col p-2">
          <h2 className="text-lg font-semibold text-slate-800">
            {property.name}
          </h2>
          <p className="text-xs text-muted-foreground">
            {property.propertyLocation.city},{" "}
            {property.propertyLocation.district}
          </p>
          <p className="rounded-b-md font-semibold">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
