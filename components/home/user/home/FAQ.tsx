"use client";

import { useGetFaqsQuery } from "@/appstore/modules/(basic-routes)/faqs/api";
import { Container, Title } from "@/lib/home";
import { Collapse } from "antd";
import { HelpCircle, Minus, Plus } from "lucide-react";
import React from "react";

const FAQ = () => {
  const { data, isLoading } = useGetFaqsQuery();

  const faqs =
    data?.data
      ?.filter((item) => item.status === "active") ?? [];

  const items = faqs.map((faq) => ({
    key: String(faq.id),
    label: (
      <div className="flex items-center gap-2.5 font-poppins font-tiro-bangla">
        <HelpCircle size={26} color="#6366f1" />
        <span className="font-semibold text-lg font-poppins font-tiro-bangla">
          {faq.question}
        </span>
      </div>
    ),
    children: (
      <p className="leading-relaxed  text-md text-[#555 font-tiro-bangla font-poppins">
        {faq.answer}
      </p>
    ),
  }));

  return (
    <Container className="py-5">
      {/* Title */}
      <Title>প্রায়শই জিজ্ঞাসিত প্রশ্ন ?</Title>

      {/* Loading */}
      {isLoading && <p>লোড হচ্ছে...</p>}

      {/* Empty */}
      {!isLoading && faqs.length === 0 && <p>কোনো প্রশ্ন পাওয়া যায়নি।</p>}

      {/* FAQs */}
      <div className="flex justify-center mt-6">
        {!isLoading && faqs.length > 0 && (
          <Collapse
            accordion
            items={items}
            className="mt-3 w-full max-w-xl mx-auto"
            size="large"
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
              isActive ? (
                <Minus size={20} color="#6366f1" />
              ) : (
                <Plus size={20} color="#6366f1" />
              )
            }
          />
        )}
      </div>
    </Container>
  );
};

export default FAQ;
