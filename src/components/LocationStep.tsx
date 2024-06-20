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
import { PropertyExt } from "@/types";

interface Props {
  className?: string;
  next: () => void;
  back: () => void;
  property?: PropertyExt | null | undefined;
  setLocationStepData: (formData: z.infer<typeof LocationStepSchema>) => void;
}

const LocationStep = ({
  className,
  next,
  back,
  property,
  setLocationStepData,
}: Props) => {
  const form = useForm<z.infer<typeof LocationStepSchema>>({
    resolver: zodResolver(LocationStepSchema),
    defaultValues: {
      address: property ? property.propertyLocation.address : "",
      city: property ? property.propertyLocation.city : "",
      postalCode: property ? property.propertyLocation.postalCode : "",
      district: property ? property.propertyLocation.district : "",
      province: property ? property.propertyLocation.province : "",
      landmark: property ? property.propertyLocation.landmark : "",
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
          <Button onClick={back} type="button">
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
