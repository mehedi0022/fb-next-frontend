"use client";
import React from "react";
import Container from "../../common/Container";
import { useGetStepsQuery } from "@/appstore/modules/(basic-routes)/steps/api";
import { Title } from "@/lib/home";

const HowItWorks = () => {
  const { data, isLoading } = useGetStepsQuery();

  const steps =
    data?.data
      ?.filter((step) => step.status === "active")
      ?.sort((a, b) => a.sort_order - b.sort_order) ?? [];

  return (
    <section className="py-8 bg-white">
      <Container>
        {/* Header Section */}
        <Title subtitle="কোনো ঝামেলা ছাড়াই মাত্র কয়েক ধাপে অনলাইনে নিজের বিজনেস শুরু করুন">
          কিভাবে আমাদের মাধ্যমে বিজনেস করবেন
        </Title>

        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-800 mb-4">
            কিভাবে আমাদের মাধ্যমে বিজনেস করবেন
          </h2>
          <p className="text-neutral-500 text-lg">
            কোনো ঝামেলা ছাড়াই মাত্র কয়েক ধাপে অনলাইনে নিজের বিজনেস শুরু করুন
          </p>
        </div> */}

        {/* Empty Space */}
        {!isLoading && steps.length === 0 && (
          <p className="text-center text-gray-500">কোনো তথ্য পাওয়া যায়নি।</p>
        )}

        {/* Steps Card Container */}
        <div className="max-w-3xl mx-auto bg-primary p-3 md:p-5 rounded-md shadow-2xl">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 p-4 md:p-5 rounded-md shadow-sm animate-pulse"
                >
                  <div className="h-4 w-full bg-gray-300 rounded mb-2" />
                  <div className="h-4 w-3/5 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 md:gap-6 bg-white p-4 md:p-5 rounded-md transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
              >
                {/* Number Circle */}
                <div className="flex-shrink-1 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 text-neutral-800 font-bold text-lg md:text-xl rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>

                {/* Step Text */}
                <p className="text-neutral-700 text-base md:text-lg font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
