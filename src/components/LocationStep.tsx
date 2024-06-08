"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { LocationStepSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  next: () => void;
  back: () => void;
  setLocationStepData: (formData: z.infer<typeof LocationStepSchema>) => void;
}

const LocationStep = ({
  className,
  next,
  back,
  setLocationStepData,
}: Props) => {
  const form = useForm<z.infer<typeof LocationStepSchema>>({
    resolver: zodResolver(LocationStepSchema),
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
      district: "",
      province: "",
      landmark: "",
    },
    mode: "all",
  });

  const onSubmit = (formData: z.infer<typeof LocationStepSchema>) => {
    setLocationStepData(formData);
    next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-5 w-[70%] mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 mb-5",
          className
        )}
      >
        {/* address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* city */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* postal code */}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* district */}
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* province */}
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* landmark */}
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* buttons */}
        <div className="flex gap-5 ml-auto col-span-2">
          <Button onClick={back}>
            <ChevronLeftIcon />
            Previous
          </Button>
          <Button
            disabled={!form.formState.isValid}
            // onClick={next}
            type="submit"
          >
            Next
            <ChevronRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LocationStep;
