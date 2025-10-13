import React from "react";
export default function WaveDivider({ className="" }){
  return (
    <div className={`wave-top ${className}`}>
      <svg viewBox="0 0 1440 140" className="w-full" preserveAspectRatio="none">
        <path d="M0,80 C320,160 480,0 720,60 C960,120 1120,40 1440,70 L1440,140 L0,140Z"
              fill="url(#g)"/>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity=".28"/>
            <stop offset="1" stopColor="var(--primary)" stopOpacity=".28"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
