"use client";

import { useEffect, useState } from "react";
import { FlipCountdown } from "@/components/ui/flip-countdown";

// Wedding day begins at midnight in India (UTC+05:30).
const weddingDay = Date.parse("2026-12-27T00:00:00+05:30");
const units = ["Days", "Hours", "Minutes", "Seconds"];

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      const seconds = Math.max(0, Math.floor((weddingDay - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0 && interval) clearInterval(interval);
      return seconds;
    };
    if (update() > 0) interval = setInterval(update, 1000);
    return () => { if (interval) clearInterval(interval); };
  }, []);

  const values = remaining === null ? null : [
    Math.floor(remaining / 86400),
    Math.floor(remaining / 3600) % 24,
    Math.floor(remaining / 60) % 60,
    remaining % 60,
  ];

  return <div className="countdown" data-reveal>
    <p className="countdown-heading">{remaining === 0 ? "Our wedding day has arrived!" : "Counting down to our forever"}</p>
    <div className="countdown-units" role="timer" aria-label="Time left until 27 December 2026, midnight India time" aria-live="off">
      {units.map((unit, index) => <div className="countdown-unit" key={unit}>
        <FlipCountdown value={values ? values[index] : null} />
        <span className="countdown-label">{unit}</span>
      </div>)}
    </div>
    {remaining !== 0 && <span className="countdown-note">left until 27 December</span>}
  </div>;
}
