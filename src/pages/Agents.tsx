import { motion } from "framer-motion";
import { Bot, Wifi, WifiOff, Clock, ArrowRightLeft, Activity, Zap, Radio } from "lucide-react";

const agents = [
  {
    name: "Simon",
    role: "Primary Personal Assistant",
    status: "listening",
    latency: "12ms",
    channel: "Main",
    lastAction: "Processed voice command",
    taskCount: 142,
    avatar: "S",
  },
  {
    name: "Home Agent",
    role: "Device Controller & Automator",
    status: "thinking",
    latency: "28ms",
    channel: "Devices",
    lastAction: "Adjusted thermostat",
    taskCount: 89,
    avatar: "H",
  },
  {
    name: "Research Agent",
    role: "Data Analysis & Retrieval",
    status: "idle",
    latency: "45ms",
    channel: "Data",
    lastAction: "Completed report",
    taskCount: 34,
    avatar: "R",
  },
  {
    name: "Security Agent",
    role: "Monitoring & Alerts",
    status: "speaking",
    latency: "8ms",
    channel: "Security",
    lastAction: "Motion alert cleared",
    taskCount: 67,
    avatar: "X",
  },
  {
    name: "Voice Pipeline",
    role: "STT/TTS Processing",
    status: "idle",
    latency: "6ms",
    channel: "Audio",
    lastAction: "Transcription complete",
    taskCount: 203,
    avatar: "V",
  },
  {
    name: "Canvas Worker",
    role: "Workflow Execution",
    status: "offline",
    latency: "—",
    channel: "Canvas",
    lastAction: "Workflow paused",
    taskCount: 12,
    avatar: "C",
  },
];

const activityFeed = [
  { time: "5s", agent: "Simon", event: "Voice command received", type: "info" },
  { time: "12s", agent: "Home Agent", event: "Thermostat adjustment queued", type: "info" },
  { time: "30s", agent: "Security Agent", event: "Camera motion cleared", type: "success" },
  { time: "1m", agent: "Simon", event: "Handoff to Home Agent", type: "warning" },
  { time: "2m", agent: "Research Agent", event: "Report completed", type: "success" },
  { time: "5m", agent: "Voice Pipeline", event: "Session ended", type: "info" },
];

const statusConfig: Record<string, { badge: string; dot: string }> = {
  listening: { badge: "status-badge-success", dot: "neon-dot-success" },
  speaking: { badge: "status-badge-info", dot: "neon-dot-info" },
  thinking: { badge: "status-badge-warning", dot: "neon-dot-warning" },
  idle: { badge: "status-badge-neutral", dot: "neon-dot-info" },
  offline: { badge: "status-badge-error", dot: "neon-dot-error" },
};

const feedTypeColor: Record<string, string> = {
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
};

export default function Agents() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Agent Hub</h1>
        <p className="page-subtitle">Multi-agent orchestration and live status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active", value: "4", icon: Wifi, cls: "text-success" },
          { label: "Offline", value: "1", icon: WifiOff, cls: "text-muted-foreground" },
          { label: "Tasks Today", value: "547", icon: Zap, cls: "text-primary" },
          { label: "Avg Latency", value: "20ms", icon: Clock, cls: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-3">
            <s.icon className={`w-5 h-5 ${s.cls}`} />
            <div>
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Agent Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {agents.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{a.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{a.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{a.role}</p>
                  </div>
                </div>
                <span className={statusConfig[a.status].badge}>{a.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="glass-surface p-2 text-center">
                  <div className="text-muted-foreground">Latency</div>
                  <div className="font-mono font-medium mt-0.5">{a.latency}</div>
                </div>
                <div className="glass-surface p-2 text-center">
                  <div className="text-muted-foreground">Channel</div>
                  <div className="font-medium mt-0.5">{a.channel}</div>
                </div>
                <div className="glass-surface p-2 text-center">
                  <div className="text-muted-foreground">Tasks</div>
                  <div className="font-mono font-medium mt-0.5">{a.taskCount}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="w-3 h-3" />
                <span>{a.lastAction}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="cta-button-outline text-xs py-1.5 px-3 flex-1">
                  <ArrowRightLeft className="w-3 h-3" />Route
                </button>
                <button className="cta-button text-xs py-1.5 px-3 flex-1">
                  <Radio className="w-3 h-3" />Connect
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-5 space-y-3">
          <h3 className="section-title">Live Activity</h3>
          <div className="space-y-2">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 glass-surface">
                <Activity className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${feedTypeColor[item.type]}`} />
                <div className="min-w-0">
                  <p className="text-xs"><span className="font-medium text-primary">{item.agent}</span> — {item.event}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time} ago</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border/50">
            <h4 className="text-xs font-semibold mb-2">Handoff Timeline</h4>
            <div className="space-y-1.5">
              {["User → Simon → Home Agent (device cmd)", "User → Simon → Research Agent (data query)", "Security Agent → Simon (alert escalation)"].map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground p-1.5 glass-surface">
                  <ArrowRightLeft className="w-3 h-3 text-primary shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
