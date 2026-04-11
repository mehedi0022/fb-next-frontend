"use client";
import { useGetUsersQuery } from "@/appstore/modules/users/api";
import React from "react";

const HomePage = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  // console.log("data", data, error, isLoading);
  return <div className="">Home page</div>;
};

export default HomePage;
