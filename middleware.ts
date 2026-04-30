// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
//   const token = await req.cookies.get("accessToken")?.value;
//   const allToken = await req.cookies.getAll();
//   console.log(token);
//   console.log({ allToken });

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL("/", req.url));
//   // next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/about/:path*", "/dashboard/:path*", "/products/:path*"],
// };
