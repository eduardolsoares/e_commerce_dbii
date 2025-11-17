import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/src/lib/prisma"

async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    await prisma.account.update({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: token.sub, // 'sub' is the Google ID
        },
      },
      data: {
        access_token: refreshedTokens.access_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
        refresh_token: refreshedTokens.refresh_token ?? token.refreshToken, // Keep old refresh token if new one is not provided
      },
    })

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Error refreshing access token: ", error)
    // Force sign out on refresh failure
    return { ...token, error: "RefreshAccessTokenError" }
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline", // Required to get a refresh token
          response_type: "code"
        }
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, role: true },
        });

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          id: dbUser.id,
          role: dbUser.role,
        }
      }

      if (Date.now() < token.accessTokenExpires * 1000) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  basePath: "/api/auth",
}

export default authConfig;
