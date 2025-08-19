// LogVisit.tsx
"use client";

import { useEffect, useRef } from "react";

const LogVisit = ({ event_id }: { event_id: string }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (loggedRef.current) return; // Prevent duplicate logging
    loggedRef.current = true;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/events/visits`, {
      method: "POST",
      body: JSON.stringify({ event_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [event_id]);

  return null;
};

export default LogVisit;
