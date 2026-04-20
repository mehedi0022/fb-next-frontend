import React from "react";
import Container from "../../common/Container";

const HowItWorks = () => {
  const steps = [
    "সম্পূর্ণ ফ্রি তে রেজিস্ট্রেশন করুন আমাদের ওয়েবসাইটে নিজের নাম এবং তথ্য দিয়ে।",
    "প্রোডাক্টের ছবি এবং বর্ণনা ডাউনলোড করে নিজের ফেসবুক পেজ বা ওয়েবসাইটে পোস্ট করুন।",
    "অর্ডার পেলে ২০০-১০০০ টাকা প্রফিট রেট সহ আমাদের সাইটে কাস্টমারের ডিটেইল দিন।",
    "আমরা কাস্টমারের কাছে পণ্য পাঠাবো, আপনি পাবেন প্রফিট সহ পেমেন্ট।",
    "পেমেন্ট পেয়ে আপনার অনলাইন বিজনেস আরও এগিয়ে নিন — কোনো ইনভেস্ট ছাড়াই!",
    "ডেলিভারি সম্পন্ন হলে আপনার প্রফিট আমাদের মাধ্যমে ব্যাংক বা নগদে তুলতে পারবেন।",
  ];

  return (
    <section className="py-8 bg-white">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-800 mb-4">
            কিভাবে আমাদের মাধ্যমে বিজনেস করবেন
          </h2>
          <p className="text-neutral-500 text-lg">
            কোনো ঝামেলা ছাড়াই মাত্র কয়েক ধাপে অনলাইনে নিজের বিজনেস শুরু করুন
          </p>
        </div>

        {/* Steps Card Container */}
        <div className="max-w-3xl mx-auto bg-primary p-3 md:p-5 rounded-md shadow-2xl">
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
                  {step}
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