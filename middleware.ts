import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = "seller" | "admin" | "super_admin" | null;

const AUTH_PAGES = ["/login", "/login/two-factor", "/register"];
const LOCAL_API_FALLBACK = "http://localhost:5000/api/v1";

const normalizeUrl = (url?: string | null) => {
  if (!url) return null;
  return url.replace(/\/$/, "");
};

const getApiBaseUrls = (request: NextRequest) => {
  const urls: string[] = [];
  const configuredApiUrl = normalizeUrl(process.env.NEXT_PUBLIC_API_URL);
  if (configuredApiUrl) {
    urls.push(configuredApiUrl);
  }

  const hostname = request.nextUrl.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocalHost) {
    const localApiUrl = normalizeUrl(process.env.NEXT_PUBLIC_LOCAL_API_URL)
      || LOCAL_API_FALLBACK;
    if (!urls.includes(localApiUrl)) {
      urls.push(localApiUrl);
    }
  }

  return urls;
};

const getRoleFromApi = async (request: NextRequest): Promise<Role> => {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const apiBaseUrls = getApiBaseUrls(request);
  for (const apiBaseUrl of apiBaseUrls) {
    try {
      const response = await fetch(`${apiBaseUrl}/auth/check-me`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const data = await response.json();
      const role = data?.user?.role;

      if (role === "seller" || role === "admin" || role === "super_admin") {
        return role;
      }
    } catch {
      continue;
    }
  }

  return null;
};

const redirectByRole = (role: Role, request: NextRequest) => {
  if (role === "seller") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (role === "admin" || role === "super_admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.redirect(
    new URL(
      `/login?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.url,
    ),
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccessToken = request.cookies.has("accessToken");
  const hasRefreshToken = request.cookies.has("refreshToken");
  const hasAuthCookies = hasAccessToken || hasRefreshToken;

  const isAuthPage = AUTH_PAGES.some(
    (authPath) => pathname === authPath || pathname.startsWith(`${authPath}/`),
  );
  const isSellerRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAuthPage && !isSellerRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (!hasAuthCookies) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(pathname)}`,
        request.url,
      ),
    );
  }

  const role = await getRoleFromApi(request);

  if (!role) {
    if (isAuthPage) return NextResponse.next();
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(pathname)}`,
        request.url,
      ),
    );
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
  matcher: [
    "/login",
    "/login/:path*",
    "/register",
    "/register/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
