import { motion } from "framer-motion";
import {
  Bot, Shield, Heart, Brain, Sparkles, Settings2, Star, Clock,
  Cpu, Mic, Eye, EyeOff, Volume2, Zap, FileText, Lock
} from "lucide-react";

const recentActions = [
  { action: "Dimmed living room lights to 40%", time: "2m ago" },
  { action: "Set bedroom thermostat to 69°F", time: "5m ago" },
  { action: "Delivered morning briefing", time: "3h ago" },
  { action: "Ran Night Mode automation", time: "12h ago" },
  { action: "Completed research: smart locks", time: "1d ago" },
];

const skills = [
  "Voice Commands", "Device Control", "Weather", "Calendar",
  "Research", "Energy Analysis", "Security Monitoring", "Scheduling",
  "Smart Routines", "Notifications", "Music Control", "Reminders",
];

const goals = [
  { goal: "Optimize energy usage below 5kWh/day", progress: 72 },
  { goal: "Maintain indoor comfort (70-73°F)", progress: 95 },
  { goal: "Ensure all devices are secure", progress: 88 },
  { goal: "Learn user preferences (ongoing)", progress: 45 },
];

const preferences = [
  { label: "Tone", value: "Friendly & Concise", icon: Volume2 },
  { label: "Initiative", value: "Proactive", icon: Sparkles },
  { label: "Privacy", value: "High", icon: Lock },
  { label: "Voice", value: "Neural Voice 2", icon: Mic },
];

const trustedDevices = [
  { name: "iPhone 16 Pro", type: "Mobile", trusted: true },
  { name: "MacBook Pro", type: "Laptop", trusted: true },
  { name: "Living Room Display", type: "Hub", trusted: true },
  { name: "Guest iPad", type: "Tablet", trusted: false },
];

export default function SimonAgent() {
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center animate-pulse-glow">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 neon-dot-success w-4 h-4 border-2 border-background rounded-full" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="page-title">Simon</h1>
          <p className="page-subtitle">Personal AI Agent — Online & Listening</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
            <span className="status-badge-success">Active</span>
            <span className="status-badge-info">4 skills active</span>
            <span className="status-badge-neutral">142 tasks completed today</span>
          </div>
        </div>
        <button className="cta-button-outline">
          <Settings2 className="w-4 h-4" />Configure
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Goals */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Brain className="w-4 h-4 text-primary" />Goals & Routines</h2>
          <div className="space-y-3">
            {goals.map((g) => (
              <div key={g.goal} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span>{g.goal}</span>
                  <span className="font-mono text-muted-foreground">{g.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Settings2 className="w-4 h-4 text-primary" />Agent Settings</h2>
          <div className="space-y-2">
            {preferences.map((p) => (
              <div key={p.label} className="flex items-center justify-between p-3 glass-surface">
                <div className="flex items-center gap-2.5">
                  <p.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{p.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Zap className="w-4 h-4 text-primary" />Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1.5 glass-surface text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>

        {/* Memory */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Heart className="w-4 h-4 text-primary" />Memory & Context</h2>
          <div className="space-y-2 text-xs">
            {[
              "Prefers lights at 80% during morning",
              "Likes bedroom at 69°F for sleep",
              "Works in office 9 AM - 5 PM weekdays",
              "Favorite music: ambient/lo-fi",
              "Guest room used ~2x/month",
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 glass-surface">
                <Brain className="w-3 h-3 text-primary shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Lock className="w-3 h-3" />Memory is encrypted and stored locally
          </p>
        </div>

        {/* Recent Actions */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />Recent Actions</h2>
          <div className="space-y-2">
            {recentActions.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 glass-surface">
                <span className="text-xs">{a.action}</span>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Devices */}
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Trusted Devices</h2>
          <div className="space-y-2">
            {trustedDevices.map((d) => (
              <div key={d.name} className="flex items-center justify-between p-3 glass-surface">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs font-medium">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">{d.type}</p>
                  </div>
                </div>
                {d.trusted ? (
                  <span className="status-badge-success">Trusted</span>
                ) : (
                  <span className="status-badge-neutral">Limited</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
