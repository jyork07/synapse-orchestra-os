import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollText, Filter, Search, Bot, Mic, Cpu, Zap, Shield, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  source: string;
  category: string;
  message: string;
}

const logs: LogEntry[] = [
  { id: "1", timestamp: "10:03:42.128", level: "info", source: "Simon", category: "agent", message: "Voice command processed: 'dim the lights'" },
  { id: "2", timestamp: "10:03:42.140", level: "info", source: "Home Agent", category: "device", message: "Sending command to living_room_lights: brightness=40" },
  { id: "3", timestamp: "10:03:42.178", level: "success", source: "Home Agent", category: "device", message: "Device living_room_lights updated successfully" },
  { id: "4", timestamp: "10:03:41.002", level: "info", source: "Voice Pipeline", category: "voice", message: "STT transcription: 'dim the lights' (confidence: 0.97)" },
  { id: "5", timestamp: "10:03:40.812", level: "info", source: "Event Bus", category: "system", message: "Routing voice_command to simon_agent channel" },
  { id: "6", timestamp: "10:02:38.445", level: "warn", source: "Security Agent", category: "agent", message: "Camera motion detected in backyard — no threat pattern matched" },
  { id: "7", timestamp: "10:01:12.234", level: "error", source: "Home Assistant", category: "system", message: "WebSocket reconnect attempt #2 — timeout after 5000ms" },
  { id: "8", timestamp: "10:01:12.890", level: "success", source: "Home Assistant", category: "system", message: "WebSocket connection restored" },
  { id: "9", timestamp: "10:00:05.123", level: "info", source: "Automation Engine", category: "automation", message: "Automation 'Night Mode' scheduled for 10:00 PM" },
  { id: "10", timestamp: "09:58:32.001", level: "info", source: "Simon", category: "agent", message: "Morning briefing delivered to living room speaker" },
  { id: "11", timestamp: "09:55:00.456", level: "warn", source: "OpenClaw", category: "system", message: "API rate limit approaching: 82% of hourly quota used" },
  { id: "12", timestamp: "09:50:11.789", level: "success", source: "Automation Engine", category: "automation", message: "Morning Routine completed in 12.3s — 3 actions executed" },
];

const categories = ["all", "agent", "voice", "device", "automation", "system"];

const levelIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-3.5 h-3.5 text-primary" />,
  warn: <AlertTriangle className="w-3.5 h-3.5 text-warning" />,
  error: <XCircle className="w-3.5 h-3.5 text-destructive" />,
  success: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
};

const levelBg: Record<string, string> = {
  info: "",
  warn: "border-l-2 border-l-warning/50",
  error: "border-l-2 border-l-destructive/50",
  success: "",
};

export default function Logs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) => {
    if (activeCategory !== "all" && l.category !== activeCategory) return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">System Logs</h1>
        <p className="page-subtitle">Real-time event stream and diagnostics</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                activeCategory === c ? "bg-primary text-primary-foreground" : "glass-surface text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 glass-surface px-3 py-1.5 flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="bg-transparent outline-none text-xs flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Log Stream */}
      <div className="glass-card p-1 space-y-0.5 font-mono text-xs max-h-[calc(100vh-16rem)] overflow-auto scrollbar-thin">
        {filtered.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`flex items-start gap-3 px-3 py-2 hover:bg-muted/30 rounded transition-colors ${levelBg[log.level]}`}
          >
            <span className="text-muted-foreground shrink-0 w-24">{log.timestamp}</span>
            <span className="shrink-0 mt-0.5">{levelIcons[log.level]}</span>
            <span className="text-muted-foreground shrink-0 w-28 truncate">[{log.source}]</span>
            <span className="text-foreground/90 break-all">{log.message}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
