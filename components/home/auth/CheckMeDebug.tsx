"use client";

import { useCheckMeQuery } from "@/appstore/api/authApi";
import { useEffect } from "react";

export default function CheckMeDebug() {
  const { data, isLoading, isError, error } = useCheckMeQuery();

  useEffect(() => {
    console.log("=== CHECK-ME DEBUG ===");
    console.log("isLoading:", isLoading);
    console.log("isError:", isError);
    console.log("error:", error);
    console.log("data:", data);
    console.log("======================");
  }, [data, isLoading, isError, error]);

  return null;
}
