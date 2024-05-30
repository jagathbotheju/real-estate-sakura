import { z } from "zod";

export const LocationStepSchema = z.object({
  address: z.string().min(1, "location is required"),
  city: z.string().min(1, "city is required"),
  postalCode: z.string().min(1, "postal code is required"),
  district: z.string().min(1, "district is required"),
  province: z.string().min(1, "province is required"),
  landmark: z.string().min(1, "landmark is required"),
});

export const BasicStepSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  type: z.string().min(1, "property type is required"),
  price: z.coerce.number().int().min(1, "price is required"),
});

export const SettingsSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "e-mail is required")
    .email("please enter valid email address"),
  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});

export const ProfileSchema = z.object({
  image: z.string().min(1, "image is required"),
});
