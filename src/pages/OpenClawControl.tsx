import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu, Server, Radio, Zap, Globe, Shield, Database, Activity, Settings, Terminal,
  Play, Pause, RefreshCw, ChevronRight, Clock, Wifi, WifiOff, CheckCircle2,
  AlertTriangle, XCircle, Key, GitBranch, Layers, BarChart3, Volume2,
  Bot, ArrowRightLeft, Hash, FileText, Lock, Eye, Download, Upload, Mic,
} from "lucide-react";

const pipelines = [
  { name: "Voice → Intent → Action", status: "active", throughput: "142 req/min", latency: "28ms", steps: ["STT", "NLU", "Router", "Action", "TTS"], errorRate: "0.2%" },
  { name: "Security → Detect → Alert", status: "active", throughput: "89 req/min", latency: "12ms", steps: ["Camera", "Vision", "Classifier", "Alert"], errorRate: "0.1%" },
  { name: "Research → Summarize → Notify", status: "idle", throughput: "0 req/min", latency: "—", steps: ["Query", "Search", "Extract", "Summarize", "Notify"], errorRate: "0%" },
  { name: "Data → Analyze → Dashboard", status: "active", throughput: "34 req/min", latency: "45ms", steps: ["Ingest", "Transform", "Analyze", "Render"], errorRate: "0.5%" },
];

const models = [
  { name: "openclaw-7b-instruct", type: "LLM", size: "7B", status: "loaded", vram: "14.2 GB", requests: 4821, avgLatency: "340ms" },
  { name: "whisper-large-v3", type: "STT", size: "1.5B", status: "loaded", vram: "3.1 GB", requests: 2340, avgLatency: "120ms" },
  { name: "openclaw-tts-v2", type: "TTS", size: "800M", status: "loaded", vram: "1.6 GB", requests: 1890, avgLatency: "85ms" },
  { name: "openclaw-vision-v1", type: "Vision", size: "2B", status: "loaded", vram: "4.2 GB", requests: 890, avgLatency: "210ms" },
  { name: "openclaw-embed-v2", type: "Embeddings", size: "400M", status: "standby", vram: "0.8 GB", requests: 3200, avgLatency: "15ms" },
  { name: "openclaw-classify-v1", type: "Classifier", size: "200M", status: "standby", vram: "0.4 GB", requests: 560, avgLatency: "8ms" },
];

const channels = [
  { name: "main", agents: ["Simon", "Home Agent"], messages: 12400, status: "active" },
  { name: "security", agents: ["Security Agent"], messages: 3200, status: "active" },
  { name: "voice", agents: ["Voice Pipeline", "Simon"], messages: 8900, status: "active" },
  { name: "data", agents: ["Research Agent", "Canvas Worker"], messages: 1200, status: "idle" },
  { name: "automation", agents: ["Home Agent"], messages: 5600, status: "active" },
  { name: "admin", agents: ["System"], messages: 890, status: "active" },
];

const apiKeys = [
  { name: "Primary API Key", prefix: "oc_live_", created: "2026-01-15", lastUsed: "2s ago", permissions: ["full"] },
  { name: "Voice Service Key", prefix: "oc_svc_", created: "2026-02-01", lastUsed: "1m ago", permissions: ["voice", "agents"] },
  { name: "Webhook Signing Key", prefix: "oc_whk_", created: "2026-02-20", lastUsed: "5m ago", permissions: ["webhooks"] },
  { name: "Read-Only Dashboard", prefix: "oc_ro_", created: "2026-03-01", lastUsed: "12m ago", permissions: ["read"] },
];

const recentDeployments = [
  { version: "v2.4.1", time: "2h ago", status: "success", changes: "Updated voice pipeline latency" },
  { version: "v2.4.0", time: "1d ago", status: "success", changes: "Added multi-agent router v2" },
  { version: "v2.3.9", time: "3d ago", status: "success", changes: "Security agent camera improvements" },
  { version: "v2.3.8", time: "5d ago", status: "failed", changes: "Attempted embedding model swap" },
];

const systemMetrics = [
  { label: "CPU", value: "34%", bar: 34 },
  { label: "RAM", value: "12.4 / 32 GB", bar: 39 },
  { label: "VRAM", value: "24.3 / 48 GB", bar: 51 },
  { label: "Disk", value: "124 / 500 GB", bar: 25 },
  { label: "Network", value: "45 Mbps", bar: 18 },
  { label: "GPU Temp", value: "62°C", bar: 62 },
];

const statusIcon: Record<string, React.ReactNode> = {
  active: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
  loaded: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
  idle: <Clock className="w-3.5 h-3.5 text-muted-foreground" />,
  standby: <Clock className="w-3.5 h-3.5 text-warning" />,
  error: <XCircle className="w-3.5 h-3.5 text-destructive" />,
  success: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
  failed: <XCircle className="w-3.5 h-3.5 text-destructive" />,
};

export default function OpenClawControl() {
  const [activeTab, setActiveTab] = useState("overview");
  const [testing, setTesting] = useState<string | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "pipelines", label: "Pipelines", icon: GitBranch },
    { id: "models", label: "Models", icon: Cpu },
    { id: "channels", label: "Channels", icon: Radio },
    { id: "keys", label: "API Keys", icon: Key },
    { id: "deploy", label: "Deployments", icon: Upload },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="page-title">OpenClaw Control Center</h1>
              <p className="page-subtitle">Pipeline orchestration, model management, and system configuration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-badge-success">Core Online</span>
            <span className="text-xs font-mono text-muted-foreground">v2.4.1</span>
          </div>
        </div>
      </motion.div>

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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {systemMetrics.map((m) => (
              <div key={m.label} className="glass-card p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-mono font-medium">{m.value}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${m.bar > 80 ? "bg-destructive" : m.bar > 60 ? "bg-warning" : "bg-primary"}`} style={{ width: `${m.bar}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Active Pipelines", value: "3", icon: GitBranch, cls: "text-success" },
              { label: "Loaded Models", value: "4", icon: Cpu, cls: "text-primary" },
              { label: "Active Channels", value: "5", icon: Radio, cls: "text-warning" },
              { label: "Total Requests", value: "13.7k", icon: Zap, cls: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 flex items-center gap-3">
                <s.icon className={`w-5 h-5 ${s.cls}`} />
                <div>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline + Channel Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-5 space-y-3">
              <h2 className="section-title flex items-center gap-2"><GitBranch className="w-4 h-4 text-primary" />Active Pipelines</h2>
              {pipelines.filter((p) => p.status === "active").map((p) => (
                <div key={p.name} className="p-3 glass-surface space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{p.name}</span>
                    {statusIcon[p.status]}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span>Throughput: <span className="font-mono text-foreground">{p.throughput}</span></span>
                    <span>Latency: <span className="font-mono text-foreground">{p.latency}</span></span>
                    <span>Errors: <span className="font-mono text-foreground">{p.errorRate}</span></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card p-5 space-y-3">
              <h2 className="section-title flex items-center gap-2"><Radio className="w-4 h-4 text-primary" />Channels</h2>
              {channels.map((c) => (
                <div key={c.name} className="flex items-center justify-between p-3 glass-surface">
                  <div className="flex items-center gap-2">
                    {statusIcon[c.status]}
                    <div>
                      <span className="text-sm font-medium font-mono">#{c.name}</span>
                      <p className="text-[10px] text-muted-foreground">{c.agents.join(", ")}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{c.messages.toLocaleString()} msgs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pipelines Tab */}
      {activeTab === "pipelines" && (
        <div className="space-y-4">
          {pipelines.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon[p.status]}
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <span className={p.status === "active" ? "status-badge-success" : "status-badge-neutral"}>{p.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="cta-button-outline text-xs py-1.5 px-3"><Settings className="w-3 h-3" />Configure</button>
                  <button className="cta-button text-xs py-1.5 px-3">
                    {p.status === "active" ? <><Pause className="w-3 h-3" />Pause</> : <><Play className="w-3 h-3" />Start</>}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
                {p.steps.map((step, j) => (
                  <div key={step} className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary">{step}</span>
                    {j < p.steps.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">Throughput</span><div className="font-mono font-medium mt-0.5">{p.throughput}</div></div>
                <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">Latency</span><div className="font-mono font-medium mt-0.5">{p.latency}</div></div>
                <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">Error Rate</span><div className="font-mono font-medium mt-0.5">{p.errorRate}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Models Tab */}
      {activeTab === "models" && (
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Loaded Models</h2>
              <button className="cta-button text-xs"><Download className="w-3 h-3" />Load Model</button>
            </div>
            <div className="space-y-3">
              {models.map((m, i) => (
                <motion.div key={m.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="p-4 glass-surface space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {statusIcon[m.status]}
                      <div>
                        <h3 className="text-sm font-semibold font-mono">{m.name}</h3>
                        <p className="text-[10px] text-muted-foreground">{m.type} • {m.size} params</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={m.status === "loaded" ? "status-badge-success" : "status-badge-warning"}>{m.status}</span>
                      <button className="cta-button-outline text-xs py-1 px-2"><RefreshCw className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">VRAM</span><div className="font-mono mt-0.5">{m.vram}</div></div>
                    <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">Requests</span><div className="font-mono mt-0.5">{m.requests.toLocaleString()}</div></div>
                    <div className="glass-surface p-2 text-center"><span className="text-muted-foreground">Avg Latency</span><div className="font-mono mt-0.5">{m.avgLatency}</div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === "channels" && (
        <div className="grid md:grid-cols-2 gap-4">
          {channels.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {statusIcon[c.status]}
                  <h3 className="text-sm font-semibold font-mono">#{c.name}</h3>
                </div>
                <span className={c.status === "active" ? "status-badge-success" : "status-badge-neutral"}>{c.status}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.agents.map((a) => (
                  <span key={a} className="px-2 py-0.5 rounded-md bg-primary/10 text-[10px] text-primary font-medium">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.messages.toLocaleString()} messages</span>
                <div className="flex gap-2">
                  <button className="cta-button-outline text-xs py-1 px-2"><Eye className="w-3 h-3" />Monitor</button>
                  <button className="cta-button-outline text-xs py-1 px-2"><Settings className="w-3 h-3" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "keys" && (
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title flex items-center gap-2"><Key className="w-4 h-4 text-primary" />API Keys</h2>
            <button className="cta-button text-xs"><Key className="w-3 h-3" />Generate Key</button>
          </div>
          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div key={k.name} className="p-4 glass-surface space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{k.name}</h3>
                  <div className="flex items-center gap-2">
                    <button className="cta-button-outline text-xs py-1 px-2"><RefreshCw className="w-3 h-3" />Rotate</button>
                    <button className="text-xs text-destructive hover:underline">Revoke</button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="font-mono">{k.prefix}•••••••••</span>
                  <span>Created: {k.created}</span>
                  <span>Last used: {k.lastUsed}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {k.permissions.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-md bg-primary/10 text-[10px] text-primary font-mono">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deployments Tab */}
      {activeTab === "deploy" && (
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="section-title flex items-center gap-2"><Upload className="w-4 h-4 text-primary" />Recent Deployments</h2>
              <button className="cta-button text-xs"><Upload className="w-3 h-3" />Deploy Now</button>
            </div>
            {recentDeployments.map((d, i) => (
              <div key={d.version} className="p-4 glass-surface flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon[d.status]}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold font-mono">{d.version}</span>
                      <span className={d.status === "success" ? "status-badge-success" : "status-badge-error"}>{d.status}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{d.changes}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{d.time}</span>
              </div>
            ))}
          </div>
          <div className="glass-card p-5 space-y-3">
            <h2 className="section-title">Deployment Config</h2>
            <div className="space-y-2 font-mono text-xs">
              {[
                { key: "DEPLOY_MODE", value: "rolling" },
                { key: "HEALTH_CHECK_INTERVAL", value: "30s" },
                { key: "ROLLBACK_ON_FAILURE", value: "true" },
                { key: "MAX_CONCURRENT_DEPLOYS", value: "1" },
                { key: "DEPLOY_TIMEOUT", value: "300s" },
              ].map((e) => (
                <div key={e.key} className="flex items-center gap-3 p-2 glass-surface">
                  <span className="text-primary w-52 shrink-0">{e.key}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-foreground/80">{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
