import React from "react";
import Container from "../common/Container";

const SpecialFeatures = () => {
  const features = [
    {
      title: "জিরো ইনভেস্টমেন্ট",
      description:
        "কোন রকম পুঁজি বা ইনভেস্টমেন্ট ছাড়াই সম্পূর্ণ ফ্রি তে রেজিস্ট্রেশন করে ফুল ক্যাশ অন ডেলিভারিতে বিজনেস করতে পারবেন আমাদের মাধ্যমে।",
    },
    {
      title: "ইনস্ট্যান্ট পেমেন্ট",
      description:
        "আপনার অর্ডার ডেলিভারি হওয়ার পর প্রফিটের টাকা উইথড্র দেওয়ার সাথে সাথেই অটোমেটিক ভাবে সেকেন্ডেই চলে যাবে আপনার একাউন্টে।",
    },
  ];

  return (
    <section className="py-16 bg-[#f0f7ef] mt-10">
      <Container>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
            আমাদের স্পেশাল ফিচারস
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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