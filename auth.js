import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/src/lib/prisma"

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.userId = user.id;

        if (user.role) {
          token.role = user.role;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;

        if (account.id_token) {
            token.idToken = account.id_token;
        }
      }

      if (!token.userId && token.sub) {
        token.userId = token.sub;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};

      if (token) {
        if (token.userId) {
          session.user.id = token.userId;
        }
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
  },
}
