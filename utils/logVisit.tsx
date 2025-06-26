// LogVisit.tsx
"use client";

import { useEffect, useRef } from "react";

const LogVisit = ({ storyId }: { storyId: string }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (loggedRef.current) return; // Prevent duplicate logging
    loggedRef.current = true;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/stories/visits`, {
      method: "POST",
      body: JSON.stringify({ storyId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [storyId]);

  return null;
};

export default LogVisit;
