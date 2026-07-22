import React from "react";
import { tokens } from "../../styles/theme";

export default function FeatureCard({ icon: Icon, color, title, desc }) {
  return (
    <div
      style={{
        background: tokens.rise,
        border: `1px solid ${tokens.line}`,
        borderRadius: 14,
        padding: "26px 24px",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: tokens.rise2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Icon size={20} color={color} />
      </div>
      <h3 className="display" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: tokens.mute, lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  );
}
