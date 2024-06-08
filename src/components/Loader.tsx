import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center container mx-auto">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
