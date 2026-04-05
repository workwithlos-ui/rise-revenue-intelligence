/*
 * Report / Deep Analysis - Elite Dark Design
 * Cinematic chat interface with glassmorphism
 * Animated typing indicator, gradient send button
 * Quick question cards with hover glow
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  Zap,
} from "lucide-react";

const quickQuestions = [
  {
    text: "What is my single highest-leverage revenue action this week?",
    icon: Zap,
    color: "#a78bfa",
  },
  {
    text: "Analyze my LTV:CAC ratio and tell me if I should prioritize retention or acquisition.",
    icon: ArrowRight,
    color: "#67e8f9",
  },
  {
    text: "Where is pipeline leaking and what does it cost me per month?",
    icon: ArrowRight,
    color: "#fbbf24",
  },
  {
    text: "What content or offer should I build next based on my ICP and proof bank?",
    icon: ArrowRight,
    color: "#34d399",
  },
  {
    text: "If I raise prices 20%, what happens to my growth math?",
    icon: ArrowRight,
    color: "#f87171",
  },
];

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const sampleResponse = `Based on your current metrics, your **single highest-leverage action** this week is to restructure your pricing.

Here is the math:

**Current State:**
Monthly Revenue: $75,000 | Average Deal Size: $12,500 | LTV: $45,000 | LTV/CAC: 16:1

**The Opportunity:**
Your LTV/CAC ratio of 16:1 tells us you are delivering massive value relative to acquisition cost. The industry standard is 18.7:1, but that is because most companies price closer to value delivered.

**Recommended Action:**
Increase your base package from $12,500 to $18,000-$22,000. Your proof bank (4hr to 60s speed-to-lead, $200K+ headcount replacement) justifies this easily.

**Projected Impact:**
Revenue jumps to $100K-$110K/month with same close rate. Even with a 15% close rate dip, you would hit $85K+. CAC becomes more efficient at higher deal sizes.

**GRIP Score: 94/100**
Gravity: High | Reach: Medium | Impact: Very High | Proof: Strong`;

export default function Report() {
  const [activeTab, setActiveTab] = useState<"ask" | "weekly">("ask");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (q?: string) => {
    const question = q || query;
    if (!question.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: sampleResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className="px-5 lg:px-8 py-6 lg:py-8 max-w-[900px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-violet-400" />
          <span className="label-micro text-violet-400">Deep Analysis</span>
        </div>
        <h1
          className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
        >
          Ask RISE
        </h1>
        <p className="text-sm text-white/40 mt-2">
          GRIP-scored analysis with your shared context and latest metrics
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-1 mb-8 p-1 rounded-xl w-fit"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[
          { id: "ask", label: "Ask RISE", icon: MessageSquare },
          { id: "weekly", label: "Weekly Report", icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "ask" | "weekly")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === tab.id
                ? "rgba(255,255,255,0.07)"
                : "transparent",
              color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.35)",
              border: activeTab === tab.id ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
            }}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {activeTab === "ask" && (
        <>
          {/* Quick Questions */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mb-8"
            >
              <p className="label-micro mb-4">Quick Questions</p>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    onClick={() => handleSubmit(q.text)}
                    className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm text-white/70 hover:text-white group transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${q.color}30`;
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px ${q.color}10`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.025)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${q.color}15` }}
                    >
                      <q.icon className="w-3 h-3" style={{ color: q.color }} />
                    </div>
                    <span className="flex-1 leading-snug">{q.text}</span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: q.color }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                      style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
                    >
                      <Bot className="w-4 h-4 text-violet-400" />
                    </div>
                  )}
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3.5"
                    style={{
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.15))"
                        : "rgba(255,255,255,0.04)",
                      border: msg.role === "user"
                        ? "1px solid rgba(124,58,237,0.3)"
                        : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="text-sm leading-relaxed text-white/85 whitespace-pre-wrap">
                      {msg.content.split("**").map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="font-bold text-white">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                    <p className="text-[10px] mt-2 text-white/25">{msg.timestamp}</p>
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <User className="w-4 h-4 text-white/50" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
                  >
                    <Bot className="w-4 h-4 text-violet-400" />
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0, 150, 300].map((delay) => (
                        <motion.div
                          key={delay}
                          className="w-1.5 h-1.5 rounded-full bg-violet-400"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity, delay: delay / 1000 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-2xl p-1.5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask RISE anything about your business..."
                rows={3}
                className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
              />
              <motion.button
                onClick={() => handleSubmit()}
                disabled={!query.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 mb-1 transition-all duration-200 disabled:opacity-30"
                style={{
                  background: query.trim() && !isLoading
                    ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                    : "rgba(255,255,255,0.06)",
                  boxShadow: query.trim() && !isLoading
                    ? "0 0 16px rgba(124,58,237,0.4)"
                    : "none",
                }}
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
          <p className="text-[11px] text-white/20 mt-2 text-center">
            RISE knows your ICPs, proof bank, metrics, and offers
          </p>
        </>
      )}

      {activeTab === "weekly" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-10 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}
          >
            <Calendar className="w-7 h-7 text-violet-400" />
          </div>
          <h3
            className="text-xl font-bold text-white mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Weekly Intelligence Report
          </h3>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto leading-relaxed">
            Generate a comprehensive weekly report analyzing trends, anomalies, and recommended actions based on your latest metrics.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Weekly Report
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
