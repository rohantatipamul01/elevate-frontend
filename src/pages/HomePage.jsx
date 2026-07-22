import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  TrendingUp,
  BellRing,
  CalendarClock,
  Flame,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import AscentBar from "../components/AscentBar";
import FeatureCard from "../components/FeatureCard";
import { tokens } from "../styles/theme";

const FEATURES = [
  { icon: CheckCircle2, color: tokens.teal, title: "Create tasks", desc: "Capture what's next in seconds, no clutter, no setup." },
  { icon: TrendingUp, color: tokens.teal, title: "Track progress", desc: "Watch each task move from started to done, at a glance." },
  { icon: BellRing, color: tokens.amber, title: "Set reminders", desc: "Get nudged before things slip, not after they do." },
  { icon: CalendarClock, color: tokens.amber, title: "Due dates", desc: "Give every task a deadline and keep your week honest." },
  { icon: Flame, color: tokens.amber, title: "Streaks", desc: "Show up daily and watch your streak climb with you." },
  { icon: Trophy, color: tokens.amber, title: "Achievements", desc: "Unlock milestones as consistency turns into momentum." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="elevate-root">
      <Navbar />

      <section style={{ padding: "96px 48px 80px", maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: tokens.rise,
            border: `1px solid ${tokens.line}`,
            borderRadius: 999,
            padding: "6px 14px",
            fontSize: 13,
            color: tokens.mute,
            marginBottom: 28,
          }}
        >
          <Flame size={14} color={tokens.amber} />
          Built for people who show up daily
        </div>
        <h1 className="display" style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
          Every task is a step.
          <br />
          <span style={{ color: tokens.amber }}>Climb a little</span> each day.
        </h1>
        <p style={{ fontSize: 17, color: tokens.mute, maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Elevate turns your to-do list into momentum: tasks, deadlines, and reminders that
          build into streaks and achievements you can actually see.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button className="btn-primary" style={{ padding: "14px 26px", fontSize: 15 }} onClick={() => navigate("/signup")}>
            Get started free <ArrowRight size={17} />
          </button>
          <button className="btn-ghost" style={{ padding: "14px 26px", fontSize: 15 }} onClick={() => navigate("/login")}>
            I have an account
          </button>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: "0 auto 88px", padding: "0 48px" }}>
        <AscentBar />
      </section>

      <section style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 100px" }}>
        <p style={{ textAlign: "center", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.mute, marginBottom: 12 }}>
          What keeps you climbing
        </p>
        <h2 className="display" style={{ textAlign: "center", fontSize: 30, fontWeight: 600, margin: "0 0 48px" }}>
          Everything a streak needs
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${tokens.line}`, padding: "56px 48px", textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: 26, fontWeight: 600, margin: "0 0 10px" }}>
          Start your streak today
        </h2>
        <p style={{ color: tokens.mute, margin: "0 0 24px" }}>Free to join. Takes less than a minute.</p>
        <button className="btn-primary" style={{ padding: "13px 24px" }} onClick={() => navigate("/signup")}>
          Create your account <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
