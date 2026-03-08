import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare, Mic, Bot, Zap, Cpu, LayoutDashboard, ScrollText, Settings,
  ArrowRight, Activity, Clock, Radio, TrendingUp, Shield, Package,
  Server, Database, HardDrive, Thermometer, GitBranch, Key, Bell,
  CheckCircle2, AlertTriangle, XCircle, Power, Wifi, Globe,
} from "lucide-react";

const quickActions = [
  { label: "Open Live Chat", icon: MessageSquare, to: "/chat", color: "text-primary" },
  { label: "Start Voice Session", icon: Mic, to: "/voice", color: "text-success" },
  { label: "OpenClaw Control", icon: Cpu, to: "/openclaw", color: "text-warning" },
  { label: "Run Automation", icon: Zap, to: "/automations", color: "text-primary" },
  { label: "Manage Devices", icon: Cpu, to: "/devices", color: "text-success" },
  { label: "Skill Catalog", icon: Package, to: "/catalog", color: "text-warning" },
  { label: "Launch Canvas", icon: LayoutDashboard, to: "/canvas", color: "text-primary" },
  { label: "Server Admin", icon: Settings, to: "/settings", color: "text-muted-foreground" },
];

const systemServices = [
  { name: "OpenClaw Core", status: "connected", latency: "12ms", uptime: "99.97%", icon: Cpu },
  { name: "Home Assistant", status: "connected", latency: "34ms", uptime: "99.82%", icon: Globe },
  { name: "Voice Pipeline", status: "connected", latency: "8ms", uptime: "100%", icon: Mic },
  { name: "Event Bus", status: "connected", latency: "2ms", uptime: "99.99%", icon: Zap },
  { name: "MQTT Broker", status: "connected", latency: "1ms", uptime: "100%", icon: Radio },
  { name: "InfluxDB", status: "connected", latency: "3ms", uptime: "99.97%", icon: Database },
];

const recentEvents = [
  { time: "2s ago", msg: "Simon processed voice command: 'dim the lights'", type: "voice" },
  { time: "14s ago", msg: "Automation 'Night Mode' triggered", type: "automation" },
  { time: "1m ago", msg: "Living room thermostat set to 72°F", type: "device" },
  { time: "3m ago", msg: "OpenClaw agent 'Research' completed task", type: "agent" },
  { time: "5m ago", msg: "New device discovered: Kitchen Sensor v2", type: "system" },
  { time: "8m ago", msg: "Security camera motion detected — cleared", type: "security" },
  { time: "12m ago", msg: "Model openclaw-7b-instruct inference: 340ms", type: "system" },
  { time: "15m ago", msg: "Backup completed: 2.4 GB database snapshot", type: "system" },
];

const serverMetrics = [
  { label: "CPU", value: "34%", bar: 34 },
  { label: "RAM", value: "12.4 / 32 GB", bar: 39 },
  { label: "VRAM", value: "24.3 / 48 GB", bar: 51 },
  { label: "Disk", value: "124 / 500 GB", bar: 25 },
];

const dockerStatus = [
  { name: "simon-core", status: "running", cpu: "12%" },
  { name: "simon-voice", status: "running", cpu: "8%" },
  { name: "simon-agents", status: "running", cpu: "24%" },
  { name: "postgres", status: "running", cpu: "3%" },
  { name: "redis", status: "running", cpu: "1%" },
  { name: "mosquitto", status: "running", cpu: "1%" },
  { name: "influxdb", status: "running", cpu: "5%" },
  { name: "grafana", status: "running", cpu: "2%" },
  { name: "nginx", status: "running", cpu: "1%" },
];

const pipelineStatus = [
  { name: "Voice → Intent → Action", status: "active", throughput: "142/min" },
  { name: "Security → Detect → Alert", status: "active", throughput: "89/min" },
  { name: "Data → Analyze → Dashboard", status: "active", throughput: "34/min" },
];

const statusColor: Record<string, string> = { connected: "neon-dot-success", idle: "neon-dot-info", error: "neon-dot-error" };
const eventTypeColor: Record<string, string> = { voice: "text-success", automation: "text-warning", device: "text-primary", agent: "text-primary", system: "text-muted-foreground", security: "text-destructive" };

export default function Home() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="page-title">Simon Home Server</h1>
        <p className="page-subtitle">OpenClaw AI Operating System — All Systems Nominal</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: "Active Agents", value: "6", icon: Bot },
          { label: "Devices", value: "18", icon: Cpu },
          { label: "Automations", value: "12", icon: Zap },
          { label: "Containers", value: "9", icon: Server },
          { label: "Models Loaded", value: "4", icon: GitBranch },
          { label: "Skills Installed", value: "7", icon: Package },
          { label: "Uptime", value: "14d 3h", icon: TrendingUp },
          { label: "API Requests", value: "13.7k", icon: Activity },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-3 flex items-center gap-2">
            <s.icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <div className="text-lg font-bold leading-tight">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to} className="glass-card-hover p-3 flex flex-col items-center gap-2 text-center group cursor-pointer">
            <a.icon className={`w-5 h-5 ${a.color} transition-transform group-hover:scale-110`} />
            <span className="text-[10px] font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Server Metrics + Pipelines */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-4">
          <h2 className="section-title flex items-center gap-2"><Server className="w-4 h-4 text-primary" />Server Resources</h2>
          <div className="space-y-3">
            {serverMetrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-mono">{m.value}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${m.bar > 80 ? "bg-destructive" : m.bar > 60 ? "bg-warning" : "bg-primary"}`} style={{ width: `${m.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-5 space-y-4">
          <h2 className="section-title flex items-center gap-2"><GitBranch className="w-4 h-4 text-primary" />Active Pipelines</h2>
          <div className="space-y-2">
            {pipelineStatus.map((p) => (
              <div key={p.name} className="p-3 glass-surface flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="neon-dot-success" />
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{p.throughput}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Docker + Services */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Activity className="w-4 h-4 text-primary" />Services</h2>
            <Link to="/settings" className="text-xs text-primary hover:underline">Admin</Link>
          </div>
          <div className="space-y-2">
            {systemServices.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-2.5 glass-surface">
                <div className="flex items-center gap-2.5">
                  <div className={statusColor[s.status] || "neon-dot-info"} />
                  <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="font-mono">{s.latency}</span>
                  <span>{s.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Server className="w-4 h-4 text-primary" />Docker Containers</h2>
            <Link to="/settings" className="text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="space-y-1.5">
            {dockerStatus.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-2 glass-surface">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  <span className="text-xs font-mono">{c.name}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">CPU: {c.cpu}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title flex items-center gap-2"><ScrollText className="w-4 h-4 text-primary" />Live Events</h2>
          <Link to="/logs" className="text-xs text-primary hover:underline">View Logs</Link>
        </div>
        <div className="space-y-1.5">
          {recentEvents.map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-2 glass-surface">
              <Clock className={`w-3 h-3 mt-0.5 shrink-0 ${eventTypeColor[e.type]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-xs truncate">{e.msg}</p>
              </div>
              <p className="text-[10px] text-muted-foreground shrink-0">{e.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
