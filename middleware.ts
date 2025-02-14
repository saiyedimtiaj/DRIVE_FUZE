import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.services";

// Define public authentication routes
const AuthRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/verify",
  "/change-password",
];

// Define role-based routes
type Role = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  user: [/^\/dashboard/, /^\/subscribe\/[a-zA-Z0-9]+\/booking/],
  admin: [/^\/admin/],
  dealer: [/^\/dealer/],
};

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Retrieve the current user
  const user = await getCurrentUser();

  // If no user is logged in, allow access only to authentication routes
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Build the redirect URL with existing query parameters
    const redirectParams = new URLSearchParams(searchParams);

    if (searchParams.has("additionalDriver")) {
      redirectParams.set("additionalDriver", "yes");
    }
    if (searchParams.has("addMiles")) {
      redirectParams.set("addMiles", "yes");
    }

    // Redirect to the sign-in page with a redirect query containing all parameters
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirect=${encodeURIComponent(
          pathname + "?" + redirectParams.toString()
        )}`,
        request.url
      )
    );
  }

  // Check role-based route access
  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];
    // Check if the current route matches any of the user's allowed routes
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Deny access if the user tries to access a route outside their role's permissions
  return NextResponse.redirect(new URL("/", request.url));
}

// Matching configuration
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:page*",
    "/admin",
    "/admin/:page*",
    "/dealer",
    "/dealer/:page*",
    "/booking",
    "/subscribe/:id*/booking",
    "/sign-in",
    "/sign-up",
  ],
};
