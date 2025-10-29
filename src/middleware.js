import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    authorized({req, token}) {
      if (token) return true;
    },
  }
})

export const config = { matcher: ["/user"] };
