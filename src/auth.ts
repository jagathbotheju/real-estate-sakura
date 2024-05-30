import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "database",
  },
});
