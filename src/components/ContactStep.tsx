"use client";
import { ContactStepSchema } from "@/lib/schema";
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
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  PlusIcon,
} from "lucide-react";
import { PropertyExt } from "@/types";

interface Props {
  className?: string;
  back: () => void;
  isEdit: boolean;
  property?: PropertyExt | null | undefined;
  setContactStepData: (formData: z.infer<typeof ContactStepSchema>) => void;
  formSubmit: (formData: z.infer<typeof ContactStepSchema>) => void;
}

const ContactStep = ({
  className,
  back,
  property,
  setContactStepData,
  formSubmit,
  isEdit,
}: Props) => {
  const form = useForm<z.infer<typeof ContactStepSchema>>({
    resolver: zodResolver(ContactStepSchema),
    defaultValues: {
      name: property && property.contact ? property.contact.name : "",
      phone: property && property.contact ? property.contact.phone : "",
      email: property && property.contact ? property.contact.email : "",
    },
    mode: "all",
  });

  const onSubmit = (formData: z.infer<typeof ContactStepSchema>) => {
    // setContactStepData(formData);
    formSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6 w-[70%] flex flex-col mt-5", className)}
      >
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

        {/* phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
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

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
        <div className="flex gap-5 ml-auto pt-6">
          <Button onClick={back} type="button">
            <ChevronLeftIcon />
            Previous
          </Button>
          <Button disabled={!form.formState.isValid} type="submit">
            {isEdit ? "Update Property" : "Create Property"}
            <PlusCircleIcon className="ml-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactStep;
