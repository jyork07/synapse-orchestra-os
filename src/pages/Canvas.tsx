import { motion } from "framer-motion";
import {
  LayoutDashboard, Play, Pause, Clock, ArrowRight, Plus, FileText, Workflow, History
} from "lucide-react";

const workflowNodes = [
  { id: "1", type: "trigger", label: "Voice Command", x: 50, y: 60, status: "active" },
  { id: "2", type: "process", label: "Simon NLU", x: 250, y: 40, status: "active" },
  { id: "3", type: "process", label: "Intent Router", x: 450, y: 60, status: "active" },
  { id: "4", type: "action", label: "Device Control", x: 650, y: 20, status: "idle" },
  { id: "5", type: "action", label: "Research Query", x: 650, y: 100, status: "idle" },
  { id: "6", type: "output", label: "Voice Response", x: 850, y: 60, status: "idle" },
];

const taskCards = [
  { title: "Research: Best smart locks 2026", agent: "Research Agent", status: "running", progress: 68 },
  { title: "Home Orchestration: Night mode prep", agent: "Home Agent", status: "queued", progress: 0 },
  { title: "Voice Pipeline: Custom wake word training", agent: "Voice Pipeline", status: "completed", progress: 100 },
  { title: "Data Render: Weekly energy report", agent: "Canvas Worker", status: "running", progress: 42 },
];

const templates = [
  { name: "Voice → Device Control", nodes: 5 },
  { name: "Security Alert Pipeline", nodes: 7 },
  { name: "Research → Summary → Notify", nodes: 4 },
  { name: "Multi-Agent Handoff", nodes: 6 },
];

const history = [
  { name: "Morning briefing pipeline", time: "Today 6:30 AM", duration: "4.2s", status: "success" },
  { name: "Security camera analysis", time: "Yesterday 11:30 PM", duration: "8.1s", status: "success" },
  { name: "Energy optimization", time: "Yesterday 2:00 PM", duration: "2.4s", status: "error" },
  { name: "Guest detection workflow", time: "3 days ago", duration: "1.8s", status: "success" },
];

const nodeTypeColors: Record<string, string> = {
  trigger: "bg-success/20 border-success/40 text-success",
  process: "bg-primary/20 border-primary/40 text-primary",
  action: "bg-warning/20 border-warning/40 text-warning",
  output: "bg-primary/20 border-primary/40 text-primary",
};

export default function Canvas() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Agent Canvas</h1>
          <p className="page-subtitle">Visual workflow builder and task orchestration</p>
        </div>
        <button className="cta-button"><Plus className="w-4 h-4" />New Workflow</button>
      </div>

      {/* Canvas Area */}
      <div className="glass-card p-6 min-h-[220px] relative overflow-hidden">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">Voice → Action Pipeline</span>
          <span className="status-badge-success">Active</span>
        </div>

        {/* Simplified node view */}
        <div className="flex items-center justify-between pt-10 px-4 gap-3 overflow-x-auto">
          {workflowNodes.map((node, i) => (
            <div key={node.id} className="flex items-center gap-3 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`px-4 py-3 rounded-xl border text-xs font-medium ${nodeTypeColors[node.type]}`}
              >
                {node.label}
              </motion.div>
              {i < workflowNodes.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Task Cards */}
        <div className="space-y-4">
          <h2 className="section-title">Active Tasks</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {taskCards.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{t.title}</h3>
                  <span className={
                    t.status === "running" ? "status-badge-info" :
                    t.status === "completed" ? "status-badge-success" : "status-badge-neutral"
                  }>{t.status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{t.agent}</p>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{t.progress}%</span>
                  {t.status === "running" && (
                    <button className="flex items-center gap-1 text-primary"><Pause className="w-3 h-3" />Pause</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <h3 className="section-title flex items-center gap-2"><Workflow className="w-4 h-4 text-primary" />Templates</h3>
            <div className="space-y-2">
              {templates.map((t) => (
                <button key={t.name} className="w-full p-3 glass-surface text-left hover:border-primary/30 transition-colors">
                  <p className="text-xs font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.nodes} nodes</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h3 className="section-title flex items-center gap-2"><History className="w-4 h-4 text-primary" />Execution History</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div key={i} className="p-2.5 glass-surface">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{h.name}</span>
                    <span className={h.status === "success" ? "text-success" : "text-destructive"}>
                      <span className="text-[10px]">●</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                    <span>{h.time}</span>
                    <span className="font-mono">{h.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
