/*
 * Feed/Insights - Elite Dark Design
 * GRIP-scored insight cards with glassmorphism
 * Severity glow borders, animated expand
 * Violet/teal/red color coding
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  Info,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

type Severity = "all" | "critical" | "warning" | "opportunity" | "info";

interface Insight {
  id: number;
  severity: Exclude<Severity, "all">;
  metric: string;
  metricValue: string;
  headline: string;
  description: string;
  gripScore: number;
  action?: string;
}

const insights: Insight[] = [
  {
    id: 1,
    severity: "critical",
    metric: "CAC",
    metricValue: "$2,800",
    headline: "CAC is 522% Above Industry Benchmark",
    description: "Your $2,800 CAC is 522% above the industry benchmark of $450, burning $2,350 excess per customer. At current acquisition rate (2.8 customers/month), this costs $6,580 monthly in inefficient spend. Your proof bank directly addresses the primary objection of ROI uncertainty.",
    gripScore: 94,
    action: "Restructure acquisition channels",
  },
  {
    id: 2,
    severity: "critical",
    metric: "Avg Deal Size",
    metricValue: "$12,500",
    headline: "LTV/CAC Ratio at 16:1 Signals Underpricing",
    description: "Your LTV/CAC of 16:1 vs industry standard 18.7:1 masks a pricing crisis. With $12,500 avg deal size and $45K LTV, you are capturing only 28% of lifetime value upfront. Your proof shows $200K+ headcount replacement per client, yet pricing does not reflect this value.",
    gripScore: 91,
    action: "Raise base price to $18K-$22K",
  },
  {
    id: 3,
    severity: "warning",
    metric: "Close Rate",
    metricValue: "22%",
    headline: "Pipeline Conversion Gap Leaving $70K on Table",
    description: "22% close rate matches industry benchmark but $320K pipeline suggests only 5.47 deals closing monthly vs 7.36 needed for $75K target. Different segments show faster buying triggers but require different proof positioning for each ICP.",
    gripScore: 78,
    action: "Segment ICP proof positioning",
  },
  {
    id: 4,
    severity: "opportunity",
    metric: "Churn Rate",
    metricValue: "4.5%",
    headline: "Churn Rate 11% Better Than Benchmark",
    description: "4.5% churn vs 5% industry average indicates strong product-market fit and reveals an expansion opportunity. Current monthly revenue suggests customers are not expanding into additional modules after initial build. This is a signal to introduce upsell paths.",
    gripScore: 82,
    action: "Build upsell motion",
  },
  {
    id: 5,
    severity: "opportunity",
    metric: "LTV:CAC",
    metricValue: "16:1",
    headline: "LTV:CAC Ratio Signals Significant Underpricing",
    description: "A 16:1 ratio means you are delivering 16x more value than you charge to acquire. This is a clear signal that your pricing has significant room to increase without impacting acquisition velocity. The market will absorb a 40-60% price increase.",
    gripScore: 88,
    action: "Test 40% price increase",
  },
  {
    id: 6,
    severity: "opportunity",
    metric: "Pricing",
    metricValue: "Low",
    headline: "Advisory Board OS is Drastically Underpriced",
    description: "Based on the value delivered and competitive landscape, the Advisory Board OS offering has significant pricing headroom. Comparable services in the market command 2-3x your current price point. You are leaving $25K-$35K per month on the table.",
    gripScore: 85,
    action: "Reposition pricing tier",
  },
  {
    id: 7,
    severity: "warning",
    metric: "Close Rate",
    metricValue: "22%",
    headline: "Close Rate Will Dip Temporarily with Price Increases",
    description: "If you raise prices, expect a temporary dip in close rate as the market adjusts. Plan for a 15-20% reduction in close rate for 60-90 days, then recovery as proof compounds at the new price point.",
    gripScore: 72,
    action: "Build 90-day transition plan",
  },
  {
    id: 8,
    severity: "critical",
    metric: "Churn",
    metricValue: "4.5%",
    headline: "Churn Becomes Expensive at Higher Price Points",
    description: "At current pricing, each churned customer costs $12,500 in lost revenue. At proposed higher pricing, each churn event could cost $20K+. Invest in retention infrastructure before raising prices.",
    gripScore: 89,
    action: "Build retention playbook first",
  },
  {
    id: 9,
    severity: "opportunity",
    metric: "Pipeline",
    metricValue: "$320K",
    headline: "Repackage Entry Offer to Protect Volume",
    description: "Create a lower-friction entry point ($3K-$5K diagnostic or audit) that feeds into the full engagement. This protects pipeline volume while moving average deal size up on the backend.",
    gripScore: 80,
    action: "Design diagnostic offer",
  },
  {
    id: 10,
    severity: "info",
    metric: "Ad Spend",
    metricValue: "11.3%",
    headline: "Ad Spend Efficiency at 11.3% of Revenue",
    description: "$8,500 ad spend represents 11.3% of revenue vs industry 28% margin benchmark, suggesting room for increased acquisition investment. However, high CAC indicates spend allocation inefficiency rather than a volume problem.",
    gripScore: 65,
    action: "Audit channel attribution",
  },
];

const severityConfig = {
  critical: {
    label: "Critical",
    glow: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.25)",
    activeBorder: "rgba(239,68,68,0.4)",
    text: "#f87171",
    bg: "rgba(239,68,68,0.08)",
    icon: AlertTriangle,
    dot: "#ef4444",
  },
  warning: {
    label: "Warning",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.2)",
    activeBorder: "rgba(245,158,11,0.35)",
    text: "#fbbf24",
    bg: "rgba(245,158,11,0.07)",
    icon: AlertTriangle,
    dot: "#f59e0b",
  },
  opportunity: {
    label: "Opportunity",
    glow: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.2)",
    activeBorder: "rgba(16,185,129,0.35)",
    text: "#34d399",
    bg: "rgba(16,185,129,0.07)",
    icon: TrendingUp,
    dot: "#10b981",
  },
  info: {
    label: "Info",
    glow: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.15)",
    activeBorder: "rgba(124,58,237,0.3)",
    text: "#a78bfa",
    bg: "rgba(124,58,237,0.06)",
    icon: Info,
    dot: "#7c3aed",
  },
};

const filterCounts = {
  all: insights.length,
  critical: insights.filter((i) => i.severity === "critical").length,
  warning: insights.filter((i) => i.severity === "warning").length,
  opportunity: insights.filter((i) => i.severity === "opportunity").length,
  info: insights.filter((i) => i.severity === "info").length,
};

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState<Severity>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? insights
      : insights.filter((i) => i.severity === activeFilter);

  return (
    <div className="px-5 lg:px-8 py-6 lg:py-8 max-w-[900px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="label-micro text-violet-400">Intelligence Feed</span>
            </div>
            <h1
              className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
            >
              GRIP Insights
            </h1>
            <p className="text-sm text-white/40 mt-2">
              AI-scored by Gravity, Reach, Impact, and Proof
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Regenerate
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none"
      >
        {(["all", "critical", "warning", "opportunity", "info"] as Severity[]).map((filter) => {
          const isActive = activeFilter === filter;
          const config = filter !== "all" ? severityConfig[filter] : null;
          return (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                background: isActive
                  ? filter === "all"
                    ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.15))"
                    : config?.bg
                  : "rgba(255,255,255,0.04)",
                border: isActive
                  ? `1px solid ${filter === "all" ? "rgba(124,58,237,0.4)" : config?.border}`
                  : "1px solid rgba(255,255,255,0.07)",
                color: isActive
                  ? filter === "all" ? "#a78bfa" : config?.text
                  : "rgba(255,255,255,0.35)",
                boxShadow: isActive && config
                  ? `0 0 12px ${config.glow}`
                  : "none",
              }}
            >
              {filter !== "all" && config && (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: config.dot }}
                />
              )}
              {filter === "all" ? "All" : config?.label}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                  color: isActive ? "white" : "rgba(255,255,255,0.3)",
                }}
              >
                {filterCounts[filter]}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Insight Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((insight, i) => {
            const config = severityConfig[insight.severity];
            const isExpanded = expandedId === insight.id;

            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
                className="relative rounded-2xl p-5 cursor-pointer group transition-all duration-250"
                style={{
                  background: isExpanded
                    ? `rgba(255,255,255,0.04)`
                    : "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${isExpanded ? config.activeBorder : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isExpanded ? `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${config.glow}` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = config.border;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.2), 0 0 12px ${config.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                  style={{ background: isExpanded ? config.dot : "transparent", transition: "background 0.2s" }}
                />

                <div className="flex items-start gap-4 pl-2">
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: config.bg, border: `1px solid ${config.border}` }}
                  >
                    <config.icon className="w-4 h-4" style={{ color: config.text }} strokeWidth={2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase"
                        style={{ color: config.text }}
                      >
                        {config.label}
                      </span>
                      <span className="text-[10px] text-white/25">
                        {insight.metric}: {insight.metricValue}
                      </span>
                      <span
                        className="ml-auto text-[10px] font-bold"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: insight.gripScore >= 85 ? "#a78bfa" : insight.gripScore >= 70 ? "#fbbf24" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        GRIP {insight.gripScore}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      className="text-sm font-semibold text-white leading-snug"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {insight.headline}
                    </h3>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-white/50 mt-3 leading-relaxed">
                            {insight.description}
                          </p>
                          {insight.action && (
                            <div className="mt-4 flex items-center gap-2">
                              <div
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                                style={{ background: config.bg, color: config.text, border: `1px solid ${config.border}` }}
                              >
                                <Target className="w-3 h-3" />
                                Action: {insight.action}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-1"
                  >
                    <ChevronDown className="w-4 h-4 text-white/25" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
