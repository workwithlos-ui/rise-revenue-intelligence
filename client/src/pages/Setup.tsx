/*
 * Setup / Settings - Elite Dark Design
 * Glassmorphism metric input cards
 * Focus glow effects, gradient save button
 * Syne headings, DM Sans body
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Save, Check, Settings, FileText } from "lucide-react";
import { toast } from "sonner";

interface MetricField {
  key: string;
  label: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  color: string;
}

const metricFields: MetricField[] = [
  { key: "monthlyRevenue", label: "Monthly Revenue", placeholder: "75000", prefix: "$", color: "#a78bfa", },
  { key: "monthlyAdSpend", label: "Monthly Ad Spend", placeholder: "8500", prefix: "$", color: "#67e8f9", },
  { key: "customerLTV", label: "Customer LTV", placeholder: "45000", prefix: "$", color: "#a78bfa", },
  { key: "cac", label: "Customer Acquisition Cost", placeholder: "2800", prefix: "$", color: "#f87171", },
  { key: "churnRate", label: "Monthly Churn Rate", placeholder: "4.5", suffix: "%", color: "#34d399", },
  { key: "pipelineValue", label: "Pipeline Value", placeholder: "320000", prefix: "$", color: "#67e8f9", },
  { key: "closeRate", label: "Close Rate", placeholder: "22", suffix: "%", color: "#fbbf24", },
  { key: "avgDealSize", label: "Average Deal Size", placeholder: "12500", prefix: "$", color: "#a78bfa", },
];

export default function Setup() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Metrics snapshot saved", {
      description: "RISE will use this data for your next analysis.",
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="px-5 lg:px-8 py-6 lg:py-8 max-w-[720px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-violet-400" />
          <span className="label-micro text-violet-400">Configuration</span>
        </div>
        <h1
          className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
        >
          Metrics Setup
        </h1>
        <p className="text-sm text-white/40 mt-2 leading-relaxed">
          Each submission creates a timestamped record. RISE compares periods to detect trends and anomalies using GRIP scoring.
        </p>
      </motion.div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metricFields.map((field, i) => {
            const isFocused = focusedField === field.key;
            return (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                className="rounded-2xl p-4 transition-all duration-200"
                style={{
                  background: isFocused ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isFocused ? `${field.color}30` : "rgba(255,255,255,0.07)"}`,
                  boxShadow: isFocused ? `0 0 20px ${field.color}10, 0 4px 20px rgba(0,0,0,0.2)` : "none",
                }}
              >
                <label className="label-micro mb-2 block">{field.label}</label>
                <div className="flex items-center gap-1">
                  {field.prefix && (
                    <span
                      className="text-lg font-bold"
                      style={{ color: isFocused ? field.color : "rgba(255,255,255,0.2)" }}
                    >
                      {field.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    value={values[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 bg-transparent text-xl font-bold text-white placeholder:text-white/15 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  />
                  {field.suffix && (
                    <span
                      className="text-lg font-bold"
                      style={{ color: isFocused ? field.color : "rgba(255,255,255,0.2)" }}
                    >
                      {field.suffix}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.42 }}
          className="rounded-2xl p-4 transition-all duration-200"
          style={{
            background: focusedField === "notes" ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
            border: `1px solid ${focusedField === "notes" ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)"}`,
            boxShadow: focusedField === "notes" ? "0 0 20px rgba(124,58,237,0.08)" : "none",
          }}
        >
          <label className="label-micro mb-2 flex items-center gap-1.5">
            <FileText className="w-3 h-3" />
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
            onFocus={() => setFocusedField("notes")}
            onBlur={() => setFocusedField(null)}
            placeholder="Any context for this period..."
            rows={3}
            className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/15 focus:outline-none resize-none leading-relaxed"
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.48 }}
          className="pt-2"
        >
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              background: saved
                ? "linear-gradient(135deg, #059669, #10b981)"
                : "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: saved
                ? "0 0 20px rgba(16,185,129,0.4)"
                : "0 0 20px rgba(124,58,237,0.35), 0 4px 16px rgba(0,0,0,0.3)",
              color: "white",
            }}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved Successfully
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Metrics Snapshot
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
