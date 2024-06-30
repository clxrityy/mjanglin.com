import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
    if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
    }
});

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)"
]);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};