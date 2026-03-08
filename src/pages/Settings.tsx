import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings, Wifi, Key, Globe, RefreshCw, CheckCircle2, XCircle,
  AlertTriangle, Activity, Server, Database, Cpu, Clock, Zap, Shield,
  BarChart3, Terminal, HardDrive, Network, Docker, Lock, Download, Upload,
  FileText, Monitor, Power, Trash2, Archive, Mail, Bell, Users,
} from "lucide-react";

const integrations = [
  { name: "OpenClaw", desc: "AI agent orchestration platform", status: "connected", endpoint: "https://api.openclaw.ai/v1", lastSync: "2s ago", icon: Cpu },
  { name: "Home Assistant", desc: "Home automation & device control", status: "connected", endpoint: "http://homeassistant.local:8123", lastSync: "5s ago", icon: Globe },
  { name: "Voice Pipeline", desc: "STT/TTS processing service", status: "connected", endpoint: "wss://voice.simon.local/ws", lastSync: "1s ago", icon: Activity },
  { name: "Event Bus", desc: "Real-time event messaging", status: "connected", endpoint: "wss://events.simon.local/ws", lastSync: "0s ago", icon: Zap },
  { name: "MQTT Broker", desc: "IoT device messaging", status: "connected", endpoint: "mqtt://broker.simon.local:1883", lastSync: "0s ago", icon: Network },
  { name: "InfluxDB", desc: "Time-series metrics store", status: "connected", endpoint: "http://influxdb.simon.local:8086", lastSync: "3s ago", icon: Database },
];

const healthMetrics = [
  { name: "API Gateway", status: "healthy", latency: "8ms", uptime: "99.99%", icon: Server },
  { name: "PostgreSQL", status: "healthy", latency: "3ms", uptime: "99.97%", icon: Database },
  { name: "Agent Runtime", status: "healthy", latency: "12ms", uptime: "99.95%", icon: Cpu },
  { name: "WebSocket Hub", status: "healthy", latency: "2ms", uptime: "100%", icon: Activity },
  { name: "Task Queue", status: "warning", latency: "45ms", uptime: "99.8%", icon: BarChart3 },
  { name: "Auth Service", status: "healthy", latency: "5ms", uptime: "99.99%", icon: Shield },
  { name: "Redis Cache", status: "healthy", latency: "1ms", uptime: "100%", icon: Zap },
  { name: "File Storage", status: "healthy", latency: "15ms", uptime: "99.9%", icon: HardDrive },
];

const dockerContainers = [
  { name: "simon-core", image: "openclaw/simon:2.4.1", status: "running", cpu: "12%", mem: "1.2 GB", uptime: "14d 3h" },
  { name: "simon-voice", image: "openclaw/voice:1.8.0", status: "running", cpu: "8%", mem: "3.4 GB", uptime: "14d 3h" },
  { name: "simon-agents", image: "openclaw/agents:2.1.0", status: "running", cpu: "24%", mem: "8.2 GB", uptime: "14d 3h" },
  { name: "postgres", image: "postgres:16-alpine", status: "running", cpu: "3%", mem: "512 MB", uptime: "28d 1h" },
  { name: "redis", image: "redis:7-alpine", status: "running", cpu: "1%", mem: "128 MB", uptime: "28d 1h" },
  { name: "mosquitto", image: "eclipse-mosquitto:2.0", status: "running", cpu: "1%", mem: "64 MB", uptime: "28d 1h" },
  { name: "influxdb", image: "influxdb:2.7", status: "running", cpu: "5%", mem: "896 MB", uptime: "21d 5h" },
  { name: "grafana", image: "grafana/grafana:10.3", status: "running", cpu: "2%", mem: "256 MB", uptime: "21d 5h" },
  { name: "nginx", image: "nginx:1.25-alpine", status: "running", cpu: "1%", mem: "32 MB", uptime: "28d 1h" },
];

const envStatus = [
  { key: "NODE_ENV", value: "production" },
  { key: "OPENCLAW_API_KEY", value: "sk-•••••••••••3x7f" },
  { key: "HA_TOKEN", value: "eyJ•••••••••••kQ2" },
  { key: "VOICE_WS_URL", value: "wss://voice.simon.local/ws" },
  { key: "EVENT_BUS_URL", value: "wss://events.simon.local/ws" },
  { key: "DB_CONNECTION", value: "postgres://•••@db:5432/simon" },
  { key: "REDIS_URL", value: "redis://redis:6379/0" },
  { key: "MQTT_BROKER", value: "mqtt://broker:1883" },
  { key: "INFLUXDB_URL", value: "http://influxdb:8086" },
  { key: "INFLUXDB_TOKEN", value: "tok-•••••••••••abc" },
  { key: "GRAFANA_URL", value: "http://grafana:3000" },
  { key: "TLS_CERT_PATH", value: "/etc/ssl/certs/simon.pem" },
  { key: "LOG_LEVEL", value: "info" },
  { key: "MAX_AGENTS", value: "12" },
  { key: "BACKUP_SCHEDULE", value: "0 3 * * *" },
];

const networkInfo = [
  { label: "LAN IP", value: "192.168.1.100" },
  { label: "WAN IP", value: "74.125.•••.•••" },
  { label: "Hostname", value: "simon.local" },
  { label: "DNS", value: "1.1.1.1, 8.8.8.8" },
  { label: "Gateway", value: "192.168.1.1" },
  { label: "SSL Certificate", value: "Valid until 2027-03-01" },
  { label: "Open Ports", value: "443, 1883, 8123, 8086" },
  { label: "Firewall", value: "Active — 12 rules" },
];

const storageInfo = [
  { mount: "/", size: "500 GB", used: "124 GB", pct: 25 },
  { mount: "/data/models", size: "200 GB", used: "86 GB", pct: 43 },
  { mount: "/data/media", size: "1 TB", used: "342 GB", pct: 34 },
  { mount: "/data/backups", size: "500 GB", used: "89 GB", pct: 18 },
  { mount: "/var/log", size: "50 GB", used: "12 GB", pct: 24 },
];

const statusIcon: Record<string, React.ReactNode> = {
  connected: <CheckCircle2 className="w-4 h-4 text-success" />,
  disconnected: <XCircle className="w-4 h-4 text-destructive" />,
  error: <AlertTriangle className="w-4 h-4 text-warning" />,
  healthy: <CheckCircle2 className="w-4 h-4 text-success" />,
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
  running: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
};

const statusBadge: Record<string, string> = {
  connected: "status-badge-success",
  disconnected: "status-badge-error",
  healthy: "status-badge-success",
  warning: "status-badge-warning",
  error: "status-badge-error",
  running: "status-badge-success",
};

export default function SettingsPage() {
  const [testing, setTesting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("integrations");

  const testConnection = (name: string) => {
    setTesting(name);
    setTimeout(() => setTesting(null), 1500);
  };

  const tabs = [
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "health", label: "System Health", icon: Activity },
    { id: "docker", label: "Docker", icon: Server },
    { id: "network", label: "Network", icon: Network },
    { id: "storage", label: "Storage", icon: HardDrive },
    { id: "env", label: "Environment", icon: Terminal },
    { id: "backups", label: "Backups", icon: Archive },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Server Administration</h1>
        <p className="page-subtitle">System configuration, services, networking, and diagnostics</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin pb-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === t.id ? "bg-primary/20 text-primary border border-primary/30" : "glass-surface text-muted-foreground hover:text-foreground"
            }`}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {/* Integrations Tab */}
      {activeTab === "integrations" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((int, i) => (
            <motion.div key={int.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><int.icon className="w-5 h-5 text-primary" /></div>
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
                <button className="cta-button-outline text-xs py-1.5 px-3 flex-1"><Key className="w-3 h-3" />Configure</button>
                <button onClick={() => testConnection(int.name)} className="cta-button text-xs py-1.5 px-3 flex-1">
                  <RefreshCw className={`w-3 h-3 ${testing === int.name ? "animate-spin" : ""}`} />
                  {testing === int.name ? "Testing..." : "Test"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Health Tab */}
      {activeTab === "health" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {healthMetrics.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="glass-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><m.icon className="w-4 h-4 text-primary" /><span className="text-xs font-semibold">{m.name}</span></div>
                  {statusIcon[m.status]}
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Latency: <span className="font-mono text-foreground">{m.latency}</span></span>
                  <span>Uptime: <span className="font-mono text-foreground">{m.uptime}</span></span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="glass-card p-5 space-y-3">
            <h2 className="section-title">Diagnostics</h2>
            <div className="flex flex-wrap gap-2">
              {["Run Full Health Check", "Sync All Services", "Clear Event Queue", "Reset WebSocket Connections", "Export System Report", "Restart All Services", "Flush Cache", "Run Database Vacuum"].map((action) => (
                <button key={action} className="cta-button-outline text-xs">{action}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Docker Tab */}
      {activeTab === "docker" && (
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Server className="w-4 h-4 text-primary" />Containers</h2>
            <div className="flex gap-2">
              <button className="cta-button-outline text-xs"><RefreshCw className="w-3 h-3" />Refresh</button>
              <button className="cta-button text-xs"><Power className="w-3 h-3" />Restart Stack</button>
            </div>
          </div>
          <div className="space-y-2">
            {dockerContainers.map((c) => (
              <div key={c.name} className="p-3 glass-surface flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon[c.status]}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold font-mono">{c.name}</span>
                      <span className={statusBadge[c.status]}>{c.status}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{c.image}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[10px] text-muted-foreground">
                  <span>CPU: <span className="font-mono text-foreground">{c.cpu}</span></span>
                  <span>Mem: <span className="font-mono text-foreground">{c.mem}</span></span>
                  <span>Up: <span className="font-mono text-foreground">{c.uptime}</span></span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:text-primary"><RefreshCw className="w-3 h-3" /></button>
                    <button className="p-1 hover:text-warning"><Power className="w-3 h-3" /></button>
                    <button className="p-1 hover:text-primary"><Terminal className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === "network" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5 space-y-3">
            <h2 className="section-title flex items-center gap-2"><Network className="w-4 h-4 text-primary" />Network Configuration</h2>
            <div className="space-y-2 text-xs">
              {networkInfo.map((n) => (
                <div key={n.label} className="flex items-center justify-between p-2.5 glass-surface">
                  <span className="text-muted-foreground">{n.label}</span>
                  <span className="font-mono text-foreground">{n.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5 space-y-3">
            <h2 className="section-title">Port Forwarding</h2>
            <div className="space-y-2 text-xs">
              {[
                { ext: "443", int: "nginx:443", proto: "HTTPS" },
                { ext: "1883", int: "mosquitto:1883", proto: "MQTT" },
                { ext: "8123", int: "hass:8123", proto: "HTTP" },
                { ext: "8086", int: "influxdb:8086", proto: "HTTP" },
              ].map((p) => (
                <div key={p.ext} className="flex items-center justify-between p-2.5 glass-surface">
                  <span className="font-mono text-foreground">:{p.ext}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-mono text-foreground">{p.int}</span>
                  <span className="status-badge-info text-[10px]">{p.proto}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Storage Tab */}
      {activeTab === "storage" && (
        <div className="glass-card p-5 space-y-4">
          <h2 className="section-title flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" />Storage Volumes</h2>
          <div className="space-y-3">
            {storageInfo.map((s) => (
              <div key={s.mount} className="p-3 glass-surface space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono font-semibold">{s.mount}</span>
                  <span className="text-xs text-muted-foreground">{s.used} / {s.size}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${s.pct > 80 ? "bg-destructive" : s.pct > 60 ? "bg-warning" : "bg-primary"}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environment Tab */}
      {activeTab === "env" && (
        <div className="glass-card p-5 space-y-3">
          <h2 className="section-title flex items-center gap-2"><Terminal className="w-4 h-4 text-primary" />Environment Variables</h2>
          <div className="space-y-1 font-mono text-xs">
            {envStatus.map((e) => (
              <div key={e.key} className="flex items-center gap-3 p-2 glass-surface">
                <span className="text-primary w-48 shrink-0">{e.key}</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-foreground/80 truncate">{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backups Tab */}
      {activeTab === "backups" && (
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title flex items-center gap-2"><Archive className="w-4 h-4 text-primary" />Backup Schedule</h2>
              <button className="cta-button text-xs"><Download className="w-3 h-3" />Backup Now</button>
            </div>
            {[
              { name: "Full System Backup", schedule: "Daily at 3:00 AM", lastRun: "Today 3:00 AM", size: "2.4 GB", status: "success" },
              { name: "Database Backup", schedule: "Every 6 hours", lastRun: "2h ago", size: "340 MB", status: "success" },
              { name: "Config Backup", schedule: "On change", lastRun: "1d ago", size: "12 MB", status: "success" },
              { name: "Media Backup", schedule: "Weekly Sunday", lastRun: "5d ago", size: "18.2 GB", status: "success" },
            ].map((b) => (
              <div key={b.name} className="p-3 glass-surface flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <div>
                    <span className="text-sm font-medium">{b.name}</span>
                    <p className="text-[10px] text-muted-foreground">{b.schedule} • Last: {b.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{b.size}</span>
                  <button className="cta-button-outline text-xs py-1 px-2"><Download className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <h2 className="section-title flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Security Overview</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "TLS/SSL", value: "Active — Let's Encrypt", icon: Lock, status: "success" },
                { label: "Firewall", value: "12 rules active", icon: Shield, status: "success" },
                { label: "Auth Mode", value: "JWT + API Key", icon: Key, status: "success" },
                { label: "Last Security Scan", value: "2h ago — No issues", icon: Activity, status: "success" },
                { label: "Failed Login Attempts", value: "0 (last 24h)", icon: Users, status: "success" },
                { label: "2FA", value: "Enabled for admin", icon: Lock, status: "success" },
              ].map((s) => (
                <div key={s.label} className="p-3 glass-surface flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <s.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">{s.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
