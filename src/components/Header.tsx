import Link from "next/link";
import AuthButton from "./AuthButton";
import { Home, School2 } from "lucide-react";
import { PiBuildingsFill } from "react-icons/pi";

const Header = async () => {
  return (
    <div className="flex shadow-md">
      <div className="flex items-center justify-between container mx-auto px-20 py-5">
        <Link
          href="/"
          className="text-3xl font-bold flex items-center gap-2 pt-[2px]"
        >
          <PiBuildingsFill className="w-10 h-10 text-rose-500" />
          SK Real Estate
        </Link>

        <div className="flex gap-5 items-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
