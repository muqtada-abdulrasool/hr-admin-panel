"use client";

import { useUserApi } from "@/auth/devices/user-device";
import HomePage from "@/components/home-page/home-page";
import { useEffect } from "react";

export default function Home() {
  const { createUser, userData } = useUserApi();
  useEffect(() => {
    createUser("whisker42@catmail.com", "M!a0w$7zPq");
  }, [createUser]);
  return <HomePage content={<div />} sideBarIndex={3}></HomePage>;
}
