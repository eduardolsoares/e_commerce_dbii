import { withAuth } from "next-auth/middleware"
const protectedRoutes = ["/account", "/cart", "/Orders"];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/api/auth/signin';
        return NextResponse.redirect(url);
      }
    const pathname = req.nextUrl.pathname;
    if (protectedRoutes.includes(pathname) && !token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    authorized({req, token}) {
      return !!token;
    },
  }
})

export const config = { matcher: ["/user"] };
