import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings, Wifi, WifiOff, Key, Globe, RefreshCw, CheckCircle2, XCircle,
  AlertTriangle, Activity, Server, Database, Cpu, Clock, Zap, Shield,
  BarChart3, Terminal
} from "lucide-react";

const integrations = [
  {
    name: "OpenClaw",
    desc: "AI agent orchestration platform",
    status: "connected",
    endpoint: "https://api.openclaw.ai/v1",
    lastSync: "2s ago",
    icon: Cpu,
  },
  {
    name: "Home Assistant",
    desc: "Home automation & device control",
    status: "connected",
    endpoint: "http://homeassistant.local:8123",
    lastSync: "5s ago",
    icon: Globe,
  },
  {
    name: "Voice Pipeline",
    desc: "STT/TTS processing service",
    status: "connected",
    endpoint: "wss://voice.simon.local/ws",
    lastSync: "1s ago",
    icon: Activity,
  },
  {
    name: "Event Bus",
    desc: "Real-time event messaging",
    status: "connected",
    endpoint: "wss://events.simon.local/ws",
    lastSync: "0s ago",
    icon: Zap,
  },
];

const healthMetrics = [
  { name: "API Gateway", status: "healthy", latency: "8ms", uptime: "99.99%", icon: Server },
  { name: "Database", status: "healthy", latency: "3ms", uptime: "99.97%", icon: Database },
  { name: "Agent Runtime", status: "healthy", latency: "12ms", uptime: "99.95%", icon: Cpu },
  { name: "WebSocket Hub", status: "healthy", latency: "2ms", uptime: "100%", icon: Activity },
  { name: "Task Queue", status: "warning", latency: "45ms", uptime: "99.8%", icon: BarChart3 },
  { name: "Auth Service", status: "healthy", latency: "5ms", uptime: "99.99%", icon: Shield },
];

const envStatus = [
  { key: "NODE_ENV", value: "production" },
  { key: "OPENCLAW_API_KEY", value: "sk-•••••••••••3x7f" },
  { key: "HA_TOKEN", value: "eyJ•••••••••••kQ2" },
  { key: "VOICE_WS_URL", value: "wss://voice.simon.local/ws" },
  { key: "EVENT_BUS_URL", value: "wss://events.simon.local/ws" },
  { key: "DB_CONNECTION", value: "postgres://•••@db:5432/simon" },
];

const statusIcon: Record<string, React.ReactNode> = {
  connected: <CheckCircle2 className="w-4 h-4 text-success" />,
  disconnected: <XCircle className="w-4 h-4 text-destructive" />,
  error: <AlertTriangle className="w-4 h-4 text-warning" />,
  healthy: <CheckCircle2 className="w-4 h-4 text-success" />,
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
};

const statusBadge: Record<string, string> = {
  connected: "status-badge-success",
  disconnected: "status-badge-error",
  healthy: "status-badge-success",
  warning: "status-badge-warning",
  error: "status-badge-error",
};

export default function SettingsPage() {
  const [testing, setTesting] = useState<string | null>(null);

  const testConnection = (name: string) => {
    setTesting(name);
    setTimeout(() => setTesting(null), 1500);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Settings & Integrations</h1>
        <p className="page-subtitle">Backend configuration, connections, and system diagnostics</p>
      </div>

      {/* Integration Cards */}
      <div className="space-y-3">
        <h2 className="section-title">Integrations</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {integrations.map((int, i) => (
            <motion.div
              key={int.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <int.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{int.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{int.desc}</p>
                  </div>
                </div>
                <span className={statusBadge[int.status]}>{int.status}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 glass-surface">
                  <span className="text-muted-foreground">Endpoint</span>
                  <span className="font-mono text-[10px] truncate max-w-[180px]">{int.endpoint}</span>
                </div>
                <div className="flex items-center justify-between p-2 glass-surface">
                  <span className="text-muted-foreground">Last Sync</span>
                  <span className="font-mono">{int.lastSync}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="cta-button-outline text-xs py-1.5 px-3 flex-1">
                  <Key className="w-3 h-3" />Configure
                </button>
                <button
                  onClick={() => testConnection(int.name)}
                  className="cta-button text-xs py-1.5 px-3 flex-1"
                >
                  <RefreshCw className={`w-3 h-3 ${testing === int.name ? "animate-spin" : ""}`} />
                  {testing === int.name ? "Testing..." : "Test"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="space-y-3">
        <h2 className="section-title">System Health Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {healthMetrics.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <m.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold">{m.name}</span>
                </div>
                {statusIcon[m.status]}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Latency: <span className="font-mono text-foreground">{m.latency}</span></span>
                <span>Uptime: <span className="font-mono text-foreground">{m.uptime}</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Environment */}
      <div className="glass-card p-5 space-y-3">
        <h2 className="section-title flex items-center gap-2"><Terminal className="w-4 h-4 text-primary" />Environment</h2>
        <div className="space-y-1 font-mono text-xs">
          {envStatus.map((e) => (
            <div key={e.key} className="flex items-center gap-3 p-2 glass-surface">
              <span className="text-primary w-40 shrink-0">{e.key}</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-foreground/80 truncate">{e.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostics */}
      <div className="glass-card p-5 space-y-3">
        <h2 className="section-title">Diagnostics</h2>
        <div className="flex flex-wrap gap-2">
          {["Run Full Health Check", "Sync All Services", "Clear Event Queue", "Reset WebSocket Connections", "Export System Report"].map((action) => (
            <button key={action} className="cta-button-outline text-xs">{action}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
