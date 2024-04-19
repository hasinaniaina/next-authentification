import { loginSchema } from "@/schema/schemas";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        console.log("test =>" + JSON.stringify(validatedFields))
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await db.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(
            password, 
            user.password
          );

            if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
