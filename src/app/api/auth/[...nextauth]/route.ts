import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
require('dotenv').config()

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async ({user, account, profile})=> {
      const existUser = await prisma.users.findUnique({
        where : {
          google_user_id: user.id
        }
      })

      if(!existUser) await prisma.users.create({
        data: {
          google_user_id: user.id,
          google_name: user.name as string,
          email: user.email as string,
          avatar_url: user.image
        }
      })

      await prisma.$disconnect()
      return true
    },
    async jwt({token, user}) {
      // Modificar el token como sea necesario
      if (user) {
        // Agregar el id del usuario al token
        token.user_id = user.id;
      }

      return token;
    },
    session: async({session, token, user})=>{
      const userFound = await prisma.users.findFirst({
        where: {
          google_user_id: token.user_id as string
        }
      })

      if(userFound){
        session.user.user_id = userFound.user_id
        session.user.name = userFound.google_name
        session.user.avatar_url = userFound.avatar_url
        }
        
      return session
    },
    
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}
