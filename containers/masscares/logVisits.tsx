// LogVisit.tsx
"use client";

import { useEffect, useRef } from "react";

const LogVisit = ({ massacreId }: { massacreId: string }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (loggedRef.current) return; // Prevent duplicate logging
    loggedRef.current = true;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/massacres/visits`, {
      method: "POST",
      body: JSON.stringify({ massacreId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [massacreId]);

  return null;
};

export default LogVisit;
