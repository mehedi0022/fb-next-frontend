import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = "seller" | "admin" | "super_admin" | null;

const AUTH_PAGES = ["/login", "/login/two-factor", "/register"];

const getApiBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, "");
};

const getRoleFromApi = async (request: NextRequest): Promise<Role> => {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return null;

  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/check-me`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    const role = data?.user?.role;

    if (role === "seller" || role === "admin" || role === "super_admin") {
      return role;
    }
    return null;
  } catch {
    return null;
  }
};

const redirectByRole = (role: Role, request: NextRequest) => {
  if (role === "seller") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (role === "admin" || role === "super_admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.redirect(new URL("/login", request.url));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccessToken = request.cookies.has("accessToken");
  const hasRefreshToken = request.cookies.has("refreshToken");
  const hasAuthCookies = hasAccessToken || hasRefreshToken;

  const isAuthPage = AUTH_PAGES.some(
    (authPath) => pathname === authPath || pathname.startsWith(`${authPath}/`),
  );
  const isSellerRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAuthPage && !isSellerRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (!hasAuthCookies) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = await getRoleFromApi(request);

  if (!role) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage) {
    return redirectByRole(role, request);
  }

  if (isSellerRoute && role !== "seller") {
    return redirectByRole(role, request);
  }

  if (isAdminRoute && role !== "admin" && role !== "super_admin") {
    return redirectByRole(role, request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/register/:path*", "/dashboard/:path*", "/admin/:path*"],
};
