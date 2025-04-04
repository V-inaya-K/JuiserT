
import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes (accessible without auth)
const publicRoutes = ["/", "/auth(.*)", "/api(.*)"];

export default withClerkMiddleware((req) => {
  const isPublic = publicRoutes.some((path) => req.nextUrl.pathname.match(path));

  if (isPublic) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Match all routes except static assets
};
