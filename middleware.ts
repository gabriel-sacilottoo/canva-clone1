import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/design(.*)"]);
const isProtectedRoute = createRouteMatcher(["/design(.*)", "/dashboard"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (isProtectedRoute(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
