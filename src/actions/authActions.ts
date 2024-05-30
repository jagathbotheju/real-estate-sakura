"use server";
import { signIn } from "@/auth";

export const loginGoogle = async (callbackUrl: string | undefined) => {
  await signIn("google", { redirectTo: callbackUrl ? callbackUrl : "/" });
};
