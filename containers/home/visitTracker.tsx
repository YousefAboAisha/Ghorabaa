"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VisitTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem("visit-tracked");

    if (!alreadyTracked) {
      const trackVisit = async () => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics/visits/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                path: pathname,
                referrer: document.referrer || null,
              }),
            }
          );

          sessionStorage.setItem("visit-tracked", "true");
        } catch (err) {
          console.warn("Visit tracking failed:", err);
        }
      };

      trackVisit();
    }
  }, [pathname]);

  return null;
};

export default VisitTracker;
