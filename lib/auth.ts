
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config"



export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth ({
  pages: {
    signIn: "/login",
    error:"/login"
  },
  callbacks: {
    async jwt({token}) {
      return token;
    },
    async session({token, session}) {
      return {
        ...session,
        token,
      }
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})