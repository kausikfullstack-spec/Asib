"use client";

import { useState, type CSSProperties } from "react";

function FlipUnit({ digit }: { digit: string }) {
  const [frame, setFrame] = useState({ current: digit, previous: digit, revision: 0 });
  if (digit !== frame.current) {
    setFrame({ current: digit, previous: frame.current, revision: frame.revision + 1 });
  }
  return <span className="flip-unit" aria-hidden="true">
    <span className="flip-card flip-card__top"><span>{frame.current}</span></span>
    <span className="flip-card flip-card__bottom"><span>{frame.current}</span></span>
    {frame.revision > 0 && <span className="flipper is-flipping" key={frame.revision}>
      <span className="flip-card flipper__top"><span>{frame.previous}</span></span>
      <span className="flip-card flipper__bottom"><span>{frame.current}</span></span>
    </span>}
  </span>;
}

// Controlled by the wedding clock so every unit shares one accurate timer.
export function FlipCountdown({ value, className = "", cardBgColor = "#cc3783", textColor = "#ffe34d" }: {
  value: number | null;
  className?: string;
  cardBgColor?: string;
  textColor?: string;
}) {
  const digits = value === null ? "––" : String(Math.max(0, Math.floor(value))).padStart(2, "0");
  const style = { "--flip-card-bg": cardBgColor, "--flip-card-text": textColor } as CSSProperties;
  return <span className={`flip-countdown-container ${className}`} style={style} aria-label={value === null ? "Loading" : String(value)}>
    {digits.split("").map((digit, index) => <FlipUnit key={digits.length - index} digit={digit} />)}
  </span>;
}
