// Authentication disabled - commenting out middleware
// import NextAuth from "next-auth";
// import { authConfig } from "@/app/(auth)/auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ["/", "/:id", "/api/:path*", "/login", "/register"],
// };

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/(auth)/auth";

export default function middleware(request: NextRequest) {
  return NextResponse.next();
}
