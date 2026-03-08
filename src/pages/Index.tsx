import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare, Mic, Bot, Zap, Cpu, LayoutDashboard, ScrollText, Settings,
  ArrowRight, Activity, Wifi, Clock, Radio, TrendingUp, Shield
} from "lucide-react";

const quickActions = [
  { label: "Open Live Chat", icon: MessageSquare, to: "/chat", color: "text-primary" },
  { label: "Start Voice Session", icon: Mic, to: "/voice", color: "text-success" },
  { label: "Launch Canvas", icon: LayoutDashboard, to: "/canvas", color: "text-warning" },
  { label: "Run Automation", icon: Zap, to: "/automations", color: "text-primary" },
  { label: "Manage Devices", icon: Cpu, to: "/devices", color: "text-success" },
  { label: "Connect Services", icon: Settings, to: "/settings", color: "text-muted-foreground" },
];

const systemServices = [
  { name: "OpenClaw Core", status: "connected", latency: "12ms", uptime: "99.97%" },
  { name: "Home Assistant", status: "connected", latency: "34ms", uptime: "99.82%" },
  { name: "Voice Pipeline", status: "idle", latency: "8ms", uptime: "100%" },
  { name: "Event Bus", status: "connected", latency: "2ms", uptime: "99.99%" },
];

const recentEvents = [
  { time: "2s ago", msg: "Simon processed voice command: 'dim the lights'", type: "voice" },
  { time: "14s ago", msg: "Automation 'Night Mode' triggered", type: "automation" },
  { time: "1m ago", msg: "Living room thermostat set to 72°F", type: "device" },
  { time: "3m ago", msg: "OpenClaw agent 'Research' completed task", type: "agent" },
  { time: "5m ago", msg: "New device discovered: Kitchen Sensor v2", type: "system" },
];

const phases = [
  { phase: "Phase 2", title: "Backend + Integration Layer", desc: "Service layers, integration settings, system health, event logs", icon: Wifi, status: "Active" },
  { phase: "Phase 3", title: "Real-Time Chat + Voice", desc: "Live chat, voice studio, multi-agent hub, streaming responses", icon: Radio, status: "Active" },
  { phase: "Phase 4", title: "Automations + Devices + Agent", desc: "Routines, device control, Simon personal agent, canvas workflows", icon: Shield, status: "Active" },
];

const statusColor: Record<string, string> = {
  connected: "neon-dot-success",
  idle: "neon-dot-info",
  error: "neon-dot-error",
};

const eventTypeColor: Record<string, string> = {
  voice: "text-success",
  automation: "text-warning",
  device: "text-primary",
  agent: "text-primary",
  system: "text-muted-foreground",
};

export default function Home() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="page-title">Simon Home Hub</h1>
        <p className="page-subtitle">AI Operating System for Your Home — All Systems Nominal</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Agents", value: "4", icon: Bot },
          { label: "Connected Devices", value: "18", icon: Cpu },
          { label: "Automations", value: "12", icon: Zap },
          { label: "Uptime", value: "99.9%", icon: TrendingUp },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to}
            className="glass-card-hover p-4 flex flex-col items-center gap-2 text-center group cursor-pointer">
            <a.icon className={`w-6 h-6 ${a.color} transition-transform group-hover:scale-110`} />
            <span className="text-xs font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* System Services */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Activity className="w-4 h-4 text-primary" />System Health</h2>
            <Link to="/settings" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-2.5">
            {systemServices.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 glass-surface">
                <div className="flex items-center gap-3">
                  <div className={statusColor[s.status] || "neon-dot-info"} />
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono">{s.latency}</span>
                  <span>{s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><ScrollText className="w-4 h-4 text-primary" />Live Events</h2>
            <Link to="/logs" className="text-xs text-primary hover:underline">View Logs</Link>
          </div>
          <div className="space-y-2">
            {recentEvents.map((e, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 glass-surface">
                <Clock className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${eventTypeColor[e.type]}`} />
                <div className="min-w-0">
                  <p className="text-sm truncate">{e.msg}</p>
                  <p className="text-xs text-muted-foreground">{e.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Phases */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="section-title">Architecture Phases</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {phases.map((p) => (
            <div key={p.phase} className="glass-surface p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary">{p.phase}</span>
                <span className="status-badge-success">{p.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <p.icon className="w-4 h-4 text-primary shrink-0" />
                <h3 className="text-sm font-semibold">{p.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
