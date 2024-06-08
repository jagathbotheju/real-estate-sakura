"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FeatureStepSchema } from "@/lib/schema";
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
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface Props {
  className?: string;
  next: () => void;
  back: () => void;
  setFeatureStepData: (formData: z.infer<typeof FeatureStepSchema>) => void;
}

const FeatureStep = ({ className, next, back, setFeatureStepData }: Props) => {
  const form = useForm<z.infer<typeof FeatureStepSchema>>({
    resolver: zodResolver(FeatureStepSchema),
    defaultValues: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 1,
      area: 0,
      hasSwimmingPool: false,
      hasGardenYard: false,
      hasBalcony: false,
    },
  });

  const onSubmit = (formData: z.infer<typeof FeatureStepSchema>) => {
    setFeatureStepData(formData);
    next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6 w-[70%] flex flex-col mt-5", className)}
      >
        {/* bedrooms */}
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
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

        {/* bathrooms */}
        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
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

        {/* parking spots */}
        <FormField
          control={form.control}
          name="parkingSpots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Spots</FormLabel>
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

        {/* area */}
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* hasSwimmingPool */}
          <FormField
            control={form.control}
            name="hasSwimmingPool"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 space-x-3 p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Swimming Pool</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* hasGardenYard */}
          <FormField
            control={form.control}
            name="hasGardenYard"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 space-x-3 p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Garden Yard</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* hasBalcony */}
          <FormField
            control={form.control}
            name="hasBalcony"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 space-x-3 p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Balcony</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* buttons */}
        <div className="flex gap-5 ml-auto">
          <Button onClick={back}>
            <ChevronLeftIcon />
            Previous
          </Button>
          <Button disabled={!form.formState.isValid} type="submit">
            Next
            <ChevronRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FeatureStep;
