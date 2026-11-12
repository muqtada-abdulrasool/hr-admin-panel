"use client";

import { useEffect, useState } from "react";

export default function MSWComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const isOffline =
      process.env.NEXT_PUBLIC_OFFLINE_MODE === "true" ||
      process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

    if (isOffline && typeof window !== "undefined") {
      import("./browser")
        .then(async ({ worker }) => {
          try {
            await worker.start({
              serviceWorker: {
                url: "/mockServiceWorker.js",
              },
            });
            console.log("[MSW] Mock Service Worker running (Offline Mode).");
          } catch (err) {
            console.warn("[MSW] Service Worker registration failed:", err);
          } finally {
            setMswReady(true);
          }
        })
        .catch((err) => {
          console.warn("[MSW] Failed to import browser worker:", err);
          setMswReady(true);
        });
    } else {
      setMswReady(true);
    }
  }, []);

  return <>{children}</>;
}
