import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Play, Pause, Plus, Calendar, ArrowRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface Automation {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  enabled: boolean;
  lastRun: string;
  nextRun?: string;
  category: string;
  runCount: number;
}

const automations: Automation[] = [
  { id: "1", name: "Morning Routine", trigger: "Daily at 6:30 AM", actions: ["Lights to 80%", "Start coffee maker", "Read briefing"], enabled: true, lastRun: "Today 6:30 AM", nextRun: "Tomorrow 6:30 AM", category: "morning", runCount: 312 },
  { id: "2", name: "Night Mode", trigger: "Daily at 10:00 PM", actions: ["Dim all lights", "Lock doors", "Set alarm"], enabled: true, lastRun: "Yesterday 10:00 PM", nextRun: "Today 10:00 PM", category: "night", runCount: 287 },
  { id: "3", name: "Away Mode", trigger: "All occupants leave", actions: ["Thermostat to eco", "Lights off", "Enable cameras"], enabled: true, lastRun: "2 days ago", category: "away", runCount: 45 },
  { id: "4", name: "Guest Welcome", trigger: "Guest device detected", actions: ["Guest lights on", "Set guest temp", "Unlock guest door"], enabled: false, lastRun: "5 days ago", category: "guest", runCount: 8 },
  { id: "5", name: "Security Alert", trigger: "Motion after midnight", actions: ["Notify Simon", "Record cameras", "Flash porch light"], enabled: true, lastRun: "3 days ago", category: "security", runCount: 23 },
  { id: "6", name: "Energy Saver", trigger: "Peak hours (2-6 PM)", actions: ["Reduce AC 2°", "Dim non-essential lights", "Pause EV charging"], enabled: true, lastRun: "Today 2:00 PM", nextRun: "Today 6:00 PM", category: "energy", runCount: 156 },
];

const recentRuns = [
  { name: "Morning Routine", status: "success", time: "Today 6:30 AM", duration: "12s" },
  { name: "Energy Saver", status: "success", time: "Today 2:00 PM", duration: "3s" },
  { name: "Night Mode", status: "success", time: "Yesterday 10:00 PM", duration: "8s" },
  { name: "Security Alert", status: "error", time: "3 days ago", duration: "1s" },
  { name: "Away Mode", status: "success", time: "2 days ago", duration: "5s" },
];

const templates = ["Morning", "Night", "Away", "Guest", "Security", "Party", "Focus", "Movie"];

const catColors: Record<string, string> = {
  morning: "text-warning",
  night: "text-primary",
  away: "text-success",
  guest: "text-primary",
  security: "text-destructive",
  energy: "text-success",
};

export default function Automations() {
  const [items, setItems] = useState(automations);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Automations</h1>
          <p className="page-subtitle">Routines, triggers, and scenario management</p>
        </div>
        <button className="cta-button"><Plus className="w-4 h-4" />New Automation</button>
      </div>

      {/* Templates */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
        {templates.map((t) => (
          <button key={t} className="shrink-0 px-4 py-2 glass-surface text-xs font-medium hover:border-primary/30 transition-colors">
            {t}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Automations Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass-card-hover p-5 space-y-3 ${!a.enabled ? "opacity-60" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${catColors[a.category] || "text-primary"}`} />
                  <h3 className="text-sm font-semibold">{a.name}</h3>
                </div>
                <button
                  onClick={() => toggle(a.id)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${a.enabled ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${a.enabled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />{a.trigger}
              </div>
              <div className="space-y-1">
                {a.actions.map((act, j) => (
                  <div key={j} className="flex items-center gap-1.5 text-xs">
                    <ArrowRight className="w-3 h-3 text-primary" />{act}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/30">
                <span>Last: {a.lastRun}</span>
                <span>{a.runCount} runs</span>
              </div>
              <div className="flex gap-2">
                <button className="cta-button-outline text-xs py-1.5 px-3 flex-1">Edit</button>
                <button className="cta-button text-xs py-1.5 px-3 flex-1"><Play className="w-3 h-3" />Run</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Runs */}
        <div className="glass-card p-5 space-y-3 self-start">
          <h3 className="section-title">Recent Runs</h3>
          <div className="space-y-2">
            {recentRuns.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 glass-surface">
                <div className="flex items-center gap-2.5">
                  {r.status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <div>
                    <p className="text-xs font-medium">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.time}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{r.duration}</span>
              </div>
            ))}
          </div>
          <button className="cta-button-outline w-full text-xs">
            <RotateCcw className="w-3 h-3" />View All History
          </button>
        </div>
      </div>
    </div>
  );
}
