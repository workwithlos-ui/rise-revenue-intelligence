/*
 * Dashboard - Elite Dark Design
 * Glassmorphism metric cards with animated counters
 * Glowing area chart with gradient fills
 * Animated gradient header with GRIP score ring
 */

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Animated counter hook
function useAnimatedCounter(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return value;
}

const metrics = [
  {
    label: "Monthly Revenue",
    value: 75000,
    display: "$75,000",
    change: "+12.5%",
    trend: "up",
    detail: "vs $66,700 last month",
    color: "violet",
    prefix: "$",
    suffix: "",
    numericTarget: 75000,
  },
  {
    label: "Pipeline Value",
    value: 320000,
    display: "$320K",
    change: "+8.2%",
    trend: "up",
    detail: "28 active deals",
    color: "teal",
    prefix: "$",
    suffix: "K",
    numericTarget: 320,
  },
  {
    label: "Customer LTV",
    value: 45000,
    display: "$45,000",
    change: "+3.1%",
    trend: "up",
    detail: "16:1 LTV/CAC ratio",
    color: "violet",
    prefix: "$",
    suffix: "",
    numericTarget: 45000,
  },
  {
    label: "Close Rate",
    value: 22,
    display: "22%",
    change: "-1.4%",
    trend: "neutral",
    detail: "Industry avg: 22%",
    color: "neutral",
    prefix: "",
    suffix: "%",
    numericTarget: 22,
  },
  {
    label: "CAC",
    value: 2800,
    display: "$2,800",
    change: "+5.3%",
    trend: "down",
    detail: "Target: < $450",
    color: "red",
    prefix: "$",
    suffix: "",
    numericTarget: 2800,
  },
  {
    label: "Churn Rate",
    value: 4.5,
    display: "4.5%",
    change: "-0.3%",
    trend: "up",
    detail: "Below 5% benchmark",
    color: "teal",
    prefix: "",
    suffix: "%",
    numericTarget: 4.5,
  },
];

const revenueData = [
  { month: "Sep", revenue: 42000, pipeline: 180000 },
  { month: "Oct", revenue: 48000, pipeline: 210000 },
  { month: "Nov", revenue: 51000, pipeline: 240000 },
  { month: "Dec", revenue: 55000, pipeline: 255000 },
  { month: "Jan", revenue: 59000, pipeline: 270000 },
  { month: "Feb", revenue: 66700, pipeline: 295000 },
  { month: "Mar", revenue: 75000, pipeline: 320000 },
];

const dealData = [
  { stage: "Discovery", value: 96000, count: 12 },
  { stage: "Proposal", value: 112000, count: 8 },
  { stage: "Negotiation", value: 75000, count: 5 },
  { stage: "Closing", value: 37000, count: 3 },
];

const gripScores = [
  { label: "Gravity", score: 94, color: "#7c3aed" },
  { label: "Reach", score: 78, color: "#06b6d4" },
  { label: "Impact", score: 91, color: "#a78bfa" },
  { label: "Proof", score: 85, color: "#67e8f9" },
];

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const colorMap = {
    violet: { glow: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.25)", text: "#a78bfa", bg: "rgba(124,58,237,0.08)" },
    teal: { glow: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.2)", text: "#67e8f9", bg: "rgba(6,182,212,0.07)" },
    red: { glow: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#f87171", bg: "rgba(239,68,68,0.07)" },
    neutral: { glow: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.04)" },
  };
  const c = colorMap[metric.color as keyof typeof colorMap] || colorMap.neutral;

  const isPositive = metric.trend === "up";
  const isNegative = metric.trend === "down";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="stat-card-glow relative rounded-2xl p-5 cursor-default"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${c.glow}`;
        (e.currentTarget as HTMLDivElement).style.borderColor = c.border;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px rgba(0,0,0,0.3)`;
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Label */}
      <div className="label-micro mb-4">{metric.label}</div>

      {/* Value */}
      <div
        className="text-4xl font-extrabold tracking-tight mb-3 text-white"
        style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
      >
        {metric.display}
      </div>

      {/* Change + detail */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: isPositive && metric.label !== "CAC" ? "rgba(16,185,129,0.12)" :
                        isNegative ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
            color: isPositive && metric.label !== "CAC" ? "#34d399" :
                   isNegative ? "#f87171" : "rgba(255,255,255,0.5)",
          }}
        >
          {isPositive && metric.label !== "CAC" ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : isNegative ? (
            <ArrowDownRight className="w-3 h-3" />
          ) : (
            <ArrowUpRight className="w-3 h-3" />
          )}
          {metric.change}
        </span>
        <span className="text-xs text-white/30">{metric.detail}</span>
      </div>

      {/* Accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${c.border}, transparent)` }}
      />
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: "rgba(15,15,25,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p className="text-xs font-medium text-white/40 mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: ${(entry.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
}

function GripScoreRing({ score, color, label }: { score: number; color: string; label: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-12 h-12">
        <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
          <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <motion.circle
            cx="24"
            cy="24"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-bold text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {score}
          </span>
        </div>
      </div>
      <span className="text-[10px] text-white/40 font-medium">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="px-5 lg:px-8 py-6 lg:py-8 max-w-[1200px]">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div
          className="relative rounded-2xl p-6 lg:p-8 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/91190584/4dCQHRpysqBCPxxMmUBVAe/rise-hero-bg-8DcnDtm7urFsZAKpbKpCTN.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
                    Live Intelligence
                  </span>
                </div>
              </div>
              <h1
                className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
              >
                Revenue Intelligence
              </h1>
              <p className="text-sm text-white/40">
                GRIP-scored metrics for April 2026. Updated in real time.
              </p>
            </div>

            {/* GRIP Score Rings */}
            <div className="flex items-center gap-5">
              {gripScores.map((g) => (
                <GripScoreRing key={g.label} score={g.score} color={g.color} label={g.label} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-base font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Revenue Trajectory
              </h3>
              <p className="text-xs text-white/30 mt-0.5">7-month trend with pipeline overlay</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400" style={{ boxShadow: "0 0 6px rgba(124,58,237,0.8)" }} />
                <span className="text-xs text-white/40">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px rgba(6,182,212,0.6)" }} />
                <span className="text-xs text-white/40">Pipeline</span>
              </div>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
                  tickFormatter={(v) => `$${v / 1000}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="pipeline"
                  stroke="#06b6d4"
                  strokeWidth={1.5}
                  fill="url(#tealGrad)"
                  name="Pipeline"
                  strokeOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a78bfa"
                  strokeWidth={2.5}
                  fill="url(#violetGrad)"
                  name="Revenue"
                  filter="url(#glow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Deal Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="mb-6">
            <h3
              className="text-base font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Deal Pipeline
            </h3>
            <p className="text-xs text-white/30 mt-0.5">By stage value</p>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealData} layout="vertical" margin={{ top: 0, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="barGrad0" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <linearGradient id="barGrad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="barGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="barGrad3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0e7490" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                  tickFormatter={(v) => `$${v / 1000}K`}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22} name="Value">
                  {dealData.map((_, i) => (
                    <Cell key={i} fill={`url(#barGrad${i})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* GRIP CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="relative rounded-2xl p-6 lg:p-8 overflow-hidden"
        style={{
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.15)",
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.8) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Run Full GRIP Analysis
              </h3>
              <p className="text-sm text-white/40 mt-0.5">
                AI-powered insights scored by Gravity, Reach, Impact, and Proof
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Insights
              <ChevronRight className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
