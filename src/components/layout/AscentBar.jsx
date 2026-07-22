import React from "react";
import { Flame } from "lucide-react";
import { tokens } from "../../styles/theme";

// Signature visual: an ascending staircase, each step representing a
// streak day, the final lit step representing today's win.
export default function AscentBar() {
  const steps = [38, 50, 62, 74, 86, 100];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        height: 110,
        background: tokens.rise,
        border: `1px solid ${tokens.line}`,
        borderRadius: 14,
        padding: "16px 20px 0",
      }}
    >
      {steps.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: "6px 6px 0 0",
            background: i === steps.length - 1 ? tokens.amber : tokens.rise2,
            border: i === steps.length - 1 ? "none" : `1px solid ${tokens.line}`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 8,
          }}
        >
          {i === steps.length - 1 && <Flame size={16} color="#1A1304" />}
        </div>
      ))}
    </div>
  );
}
