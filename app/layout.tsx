import { Providers } from "@/app/providers";
import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
  variable: "--font-tiro-bangla",
});

export const metadata: Metadata = {
  title: "Freelancer Bangladesh | Home - বাংলাদেশের সর্ববৃহৎ ড্রপশিপিং প্ল্যাটফর্ম",
  description:
    "কোনো বিনিয়োগ ছাড়াই ফ্রিতে রেজিস্ট্রেশন করে ফুল ক্যাশ অন ডেলিভারিতে ড্রপশিপিং বিজনেস শুরু করুন। ইন্সট্যান্ট পেমেন্ট, সহজ অর্ডার ম্যানেজমেন্ট এবং নির্ভরযোগ্য সার্ভিস—সব এক প্ল্যাটফর্মে।",

  keywords: [
    "Freelancer Bangladesh",
    "dropshipping Bangladesh",
    "online business BD",
    "cash on delivery business",
    "reseller platform BD",
  ],

  authors: [{ name: "Freelancer Bangladesh" }],

  openGraph: {
    title:
      "Freelancer Bangladesh - বাংলাদেশের সর্ববৃহৎ ড্রপশিপিং প্ল্যাটফর্ম",
    description:
      "ফ্রি রেজিস্ট্রেশন করে আজই শুরু করুন আপনার ড্রপশিপিং বিজনেস। কোনো ইনভেস্টমেন্ট ছাড়াই ইনকাম করার সুযোগ!",
    url: "https://freelancerbangladesh.com",
    siteName: "Freelancer Bangladesh",
    locale: "bn_BD",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tiroBangla.variable} antialiased`}
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
