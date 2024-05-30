import { BasicStepSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyStatus, PropertyType } from "@prisma/client";
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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  types: PropertyType[];
  statuses: PropertyStatus[];
  className?: string;
  next: () => void;
}

const BasicStep = ({ types, statuses, className, next }: Props) => {
  const form = useForm<z.infer<typeof BasicStepSchema>>({
    resolver: zodResolver(BasicStepSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      price: 0,
    },
    mode: "all",
  });

  const onSubmit = (formData: z.infer<typeof BasicStepSchema>) => {
    console.log("BasicStep", formData);
  };

  // console.log("BasicStep", types);

  return (
    <Form {...form}>
      <form
        className={cn("mt-8", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full md:w-[50%] space-y-5">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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

          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* property types */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.value}>
                          {type.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* property status */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((type) => (
                        <SelectItem key={type.id} value={type.value}>
                          {type.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
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

          {/* buttons */}
          <div className="flex gap-5 pt-7 ml-auto">
            <Button disabled={true}>
              <ChevronLeftIcon />
              Previous
            </Button>
            <Button disabled={!form.formState.isValid} onClick={next}>
              Next
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BasicStep;
