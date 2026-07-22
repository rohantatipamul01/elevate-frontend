import React from "react";
import Navbar from "./Navbar";
import { tokens } from "../../styles/theme";

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="elevate-root">
      <Navbar />
      <div
        style={{
          minHeight: "calc(100vh - 73px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: tokens.rise,
            border: `1px solid ${tokens.line}`,
            borderRadius: 16,
            padding: "36px 32px",
          }}
        >
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: tokens.amber,
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </p>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px" }}>
            {title}
          </h1>
          <p style={{ fontSize: 14, color: tokens.mute, margin: "0 0 28px" }}>{subtitle}</p>
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}
