"use client";
import React from "react";
import Container from "../../common/Container";
import { useGetFeaturesQuery } from "@/appstore/modules/(basic-routes)/features/api";

const SpecialFeatures = () => {
  const { data, isLoading } = useGetFeaturesQuery();
  const features =
    data?.data
      .filter((feature) => feature.status === "active")
      .sort((a, b) => a.sort_order - b.sort_order) ?? [];

  return (
    <section className="py-16 bg-[#f0f7ef] mt-10">
      <Container>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
            আমাদের স্পেশাল ফিচারস
          </h2>
        </div>

        {/* Empty */}
        {!isLoading && features.length === 0 && (
          <p className="text-center text-gray-500">কোনো ফিচার পাওয়া যায়নি।</p>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Loading */}
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-orange-200 animate-pulse"
              >
                <div className="h-5 w-2/5 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/5 bg-gray-200 rounded" />
                </div>
              </div>
            ))}

          {/* Features Items */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base md:text-[17px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SpecialFeatures;
