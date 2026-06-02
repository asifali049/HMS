import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(
        credentials
      ) {
        const admin =
          await prisma.admin.findUnique(
            {
              where: {
                email:
                  credentials.email as string,
              },
            }
          );

        if (!admin)
          return null;

        const valid =
          await bcrypt.compare(
            credentials.password as string,
            admin.password
          );

        if (!valid)
          return null;

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret:
    process.env.AUTH_SECRET,
});