// LogVisit.tsx
"use client";

import { useEffect, useRef } from "react";

const LogVisit = ({ missing_id }: { missing_id: string }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (loggedRef.current) return; // Prevent duplicate logging
    loggedRef.current = true;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/missings/visits`, {
      method: "POST",
      body: JSON.stringify({ missing_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [missing_id]);

  return null;
};

export default LogVisit;
