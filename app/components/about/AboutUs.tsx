import React from "react";
import Container from "../common/Container";

const AboutUs = () => {
  return (
    <section className="py-20 bg-amber-200">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Section Title */}
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-800 tracking-tight">
              আমাদের সম্পর্কে
            </h2>
            {/* আন্ডারলাইন ইফেক্ট */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1.5 bg-primary rounded-full"></div>
          </div>

          {/* Description Content */}
          <p className="text-lg md:text-xl text-neutral-600 leading-[1.8] md:leading-[2] font-medium px-4">
            <span className="text-neutral-800 font-bold">Freelancer Bangladesh</span> বাংলাদেশের সর্ববৃহৎ ড্রপশিপিং এবং রিসেলিং প্ল্যাটফর্ম। কোনো পণ্য কিনে বা ইনভেন্টরি ধরে রাখার প্রয়োজন নেই — আমাদের মাধ্যমে সহজেই নিজের অনলাইন বিজনেস শুরু করতে পারেন! আমরা দিচ্ছি ওয়েবসাইট, প্রোডাক্ট, ইমেজ, সাপোর্ট সহ সম্পূর্ণ অটোমেটেড সলিউশন।
          </p>

          {/* অতিরিক্ত ট্রাস্ট এলিমেন্ট (ঐচ্ছিক) */}
          <div className="pt-4 flex flex-wrap justify-center gap-6 text-sm font-semibold text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 animate-pulse bg-green-700 rounded-full"></div>
              অটোমেটেড সলিউশন
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-700 animate-pulse rounded-full"></div>
              ২৪/৭ সাপোর্ট
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 animate-pulse bg-green-700 rounded-full"></div>
              নিজস্ব ইনভেন্টরি প্রয়োজন নেই
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutUs;