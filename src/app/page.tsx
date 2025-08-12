"use client";

import { AuthProvider, useAuthContext } from "@/utils/auth-context";

import HomePage from "@/components/home-page/home-page";

export default function Home() {
  return <HomePage content={<div />}></HomePage>;
}
