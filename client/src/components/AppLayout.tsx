/*
 * AppLayout - Elite Dark Design System
 * Glassmorphism sidebar with gradient active states
 * Ambient orb background, particle layer
 * Smooth mobile drawer with backdrop blur
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  FileText,
  Settings,
  Menu,
  X,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/feed", label: "Insights", icon: Zap },
  { path: "/report", label: "Reports", icon: FileText },
  { path: "/setup", label: "Settings", icon: Settings },
];

function NavItem({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[0];
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={item.path} onClick={onClick}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 group cursor-pointer
          ${
            active
              ? "nav-active text-white"
              : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
          }
        `}
      >
        {active && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.08))",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}
        <item.icon
          className={`w-4 h-4 relative z-10 transition-all duration-200 ${
            active
              ? "text-violet-400"
              : "text-white/30 group-hover:text-white/60"
          }`}
          strokeWidth={active ? 2 : 1.75}
        />
        <span className="relative z-10">{item.label}</span>
        {active && (
          <div className="absolute right-3 w-1 h-1 rounded-full bg-violet-400 z-10" />
        )}
      </motion.div>
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const [location] = useLocation();

  return (
    <div className="flex flex-col h-full relative">
      {/* Glow line on right edge */}
      <div className="sidebar-glow-line" />

      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <Link href="/" onClick={onClose}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 opacity-20 blur-sm" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <div
                className="text-base font-bold tracking-tight text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                RISE
              </div>
              <div className="text-[9px] text-white/30 tracking-widest uppercase -mt-0.5">
                Revenue Intelligence
              </div>
            </div>
          </motion.div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="label-micro px-3 mb-3">Navigation</div>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            active={location === item.path}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Status indicator */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-50" />
          </div>
          <div>
            <div className="text-xs font-medium text-white/70">Live Data</div>
            <div className="text-[10px] text-white/30">April 2026</div>
          </div>
          <div className="ml-auto">
            <div
              className="text-[10px] font-mono text-violet-400"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              GRIP
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <a
          href="https://LosSilva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors group"
        >
          <span>Powered by</span>
          <span className="font-semibold text-white/40 group-hover:text-violet-400 transition-colors">
            ELIOS
          </span>
          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080810] relative overflow-x-hidden">
      {/* Particle layer */}
      <ParticleBackground />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          top: "-200px",
          left: "-100px",
          animation: "orbFloat 20s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          bottom: "-150px",
          right: "-100px",
          animation: "orbFloat2 25s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          top: "40%",
          right: "20%",
          animation: "orbFloat 30s ease-in-out infinite reverse",
        }}
      />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-[220px] z-30">
        <div
          className="flex flex-col h-full"
          style={{
            background: "rgba(8, 8, 16, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Sidebar />
        </div>
      </aside>

      {/* Mobile header */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 flex items-center px-4"
        style={{
          background: "rgba(8, 8, 16, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-sm font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            RISE
          </span>
        </div>
        <div className="w-9" />
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 w-[240px] z-50"
              style={{
                background: "rgba(8, 8, 16, 0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:pl-[220px] relative z-10">
        <div className="min-h-screen pt-14 lg:pt-0">
          <motion.div
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
