// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };
// --------------------------------
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
