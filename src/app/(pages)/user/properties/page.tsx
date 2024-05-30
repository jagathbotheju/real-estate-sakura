import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const PropertiesPage = () => {
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
      </div>
    </div>
  );
};

export default PropertiesPage;
