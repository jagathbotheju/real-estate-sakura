"use client";
import { SearchSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="flex container justify-start mt-10 w-[40%] items-center relative">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        placeholder="search..."
        className="dark:bg-slate-600"
        defaultValue={searchParams.get("query") ?? ""}
      />

      {/* <Button variant="ghost">Search</Button> */}
      <SearchIcon className="text-red-500 right-[40px] absolute" />
    </div>
  );
};

export default Search;
