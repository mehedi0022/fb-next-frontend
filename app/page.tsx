"use client";
import { useGetUsersQuery } from "@/appstore/modules/users/api";
import React from "react";

const HomePage = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  // console.log("data", data, error, isLoading);
  return <div className="text-primary">Home page
  
  <h1 className=" text-secondary">ফ্রি রেজিস্ট্রেশন করে আজই শুরু করুন আপনার ড্রপশিপিং বিজনেস। কোনো ইনভেস্টমেন্ট ছাড়াই ইনকাম করার সুযোগ!</h1>
  </div>;
};

export default HomePage;
