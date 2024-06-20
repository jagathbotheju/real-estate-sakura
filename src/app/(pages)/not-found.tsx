import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex container px-20 mx-auto justify-center">
      <div className="mt-20 bg-red-100 rounded-md shadow-md p-10 h-fit w-full flex flex-col">
        <h1 className="font-semibold text-3xl text-center">Page Not Found!</h1>
        <Button asChild className="w-fit">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
