"use client";
import Image from "next/image";
import { Container, toBanglaNumber } from "@/lib/home";
import BannerLoginRegLink from "./BannerLoginRegLink";
import { useGetBannersQuery } from "@/appstore/modules/(basic-routes)/banner/api";

const Banner = () => {
  const { data, isLoading } = useGetBannersQuery();

  console.log({ data, isLoading });

  if (isLoading) {
    return (
      <section className="bg-ternary py-2 md:py-4 lg:py-8 overflow-hidden">
        <Container>
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        </Container>
      </section>
    );
  }

  const banner = data?.data?.[0];

  if (!banner) {
    return null;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v\d+$/i, "");

  const title = banner.title || "দেশের সর্ববৃহৎ";
  const highlight_text = banner.highlight_text || "ড্রপশিপিং এবং রিসেলিং";
  const subtitle = banner.subtitle || "";
  const imageSrc = banner?.image ? `${apiBaseUrl}/${banner.image}` : "/assets/Bannar.png";

  return (
    <section className="bg-ternary py-2 md:py-4 lg:py-8 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* // Left side - Content */}
          <div className="order-2 md:order-1 text-center md:text-left space-y-5 flex flex-col items-center md:items-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-neutral-800 !leading-[1.2]">
              {title}
              <span className="text-secondary text-wrap relative inline-block">
                {highlight_text}
                <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary/20 -z-10 rounded"></span>
              </span>{" "}
              প্ল্যাটফর্ম
            </h1>

            <p className="text-xl sm:text-lg text-neutral-800 max-w-2xl md:max-w-none leading-loose">
              {subtitle}
            </p>

            <BannerLoginRegLink />

            <div className="pt-5 flex items-center gap-3 text-sm text-neutral-00 tracking-wide">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
              <span className="text-xl">{toBanglaNumber(500)}+</span> অ্যাক্টিভ
              রিসেলার আমাদের সাথে যুক্ত
            </div>
          </div>

          {/* // Right Side - Image */}
          <div className="flex order-1 md:order-2 justify-center md:justify-end items-center relative group p-4 lg:p-10">
            <div className="absolute inset-0 bg-secondary/15 rounded-full blur-[80px] md:blur-[120px] transform scale-75 group-hover:scale-100 group-hover:bg-secondary/25 transition-all duration-700 ease-in-out"></div>

            {/* // Main container  */}
            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[450px] lg:max-w-[580px] transition-transform duration-500 group-hover:scale-[1.02] ">
              <Image
                src={imageSrc}
                width={700}
                height={700}
                alt="Freelancer Bangladesh Dropshipping and Reselling"
                priority={true}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-float animate-pulse"
              />

              <div className="absolute -bottom-6 -right-6 md:right-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 animate-bounce shadow-secondary/5 sm:flex border border-neutral-100">
                {/* কালারফুল সার্কেল */}
                <div className=" bg-secondary p-2.5 rounded-full shadow-lg shadow-secondary/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="text-xs font-bold text-neutral-800 leading-tight">
                  100% Verified Dropshipping <br />
                  <span className="text-secondary font-medium">Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
