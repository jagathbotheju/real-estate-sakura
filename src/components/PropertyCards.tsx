import { PropertyExt } from "@/types";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: PropertyExt[];
}

const PropertyCards = ({ properties }: Props) => {
  return (
    <div className="flex container px-20 mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyCards;
