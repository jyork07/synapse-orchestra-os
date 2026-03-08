import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic, MicOff, Volume2, VolumeX, Radio, Headphones, Settings2,
  Phone, PhoneOff, Activity, Waves, Monitor, Speaker
} from "lucide-react";

const agents = [
  { name: "Simon", role: "Primary Assistant", status: "listening", color: "text-primary" },
  { name: "Home Agent", role: "Device Controller", status: "idle", color: "text-success" },
  { name: "Research Agent", role: "Data & Analysis", status: "idle", color: "text-warning" },
  { name: "Security Agent", role: "Monitoring", status: "offline", color: "text-muted-foreground" },
];

const transcriptItems = [
  { speaker: "You", text: "Hey Simon, can you dim the living room lights?", time: "0:12" },
  { speaker: "Simon", text: "Sure, dimming living room lights to 40%. Done.", time: "0:15" },
  { speaker: "You", text: "What's the temperature in the bedroom?", time: "0:22" },
  { speaker: "Simon", text: "The bedroom is currently at 71°F with humidity at 45%. Would you like me to adjust?", time: "0:25" },
  { speaker: "You", text: "Set it to 69 degrees", time: "0:30" },
  { speaker: "Simon", text: "Setting bedroom thermostat to 69°F. It should reach target in about 10 minutes.", time: "0:33" },
];

const statusStyles: Record<string, string> = {
  listening: "status-badge-success",
  speaking: "status-badge-info",
  thinking: "status-badge-warning",
  idle: "status-badge-neutral",
  offline: "status-badge-error",
};

export default function Voice() {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [mode, setMode] = useState<"push" | "continuous">("continuous");

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Voice Studio</h1>
          <p className="page-subtitle">Live audio interaction with Simon agents</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === "push" ? "continuous" : "push")}
            className="px-3 py-1.5 glass-surface text-xs font-medium"
          >
            {mode === "push" ? "Push-to-Talk" : "Continuous"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-6">
        {/* Main Voice Area */}
        <div className="space-y-6">
          {/* Orb */}
          <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px]">
            {!isActive ? (
              <motion.div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <Mic className="w-12 h-12 text-primary/50" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Start Voice Session</h2>
                  <p className="text-sm text-muted-foreground mt-1">Connect to Simon's voice pipeline</p>
                </div>
                <button onClick={() => setIsActive(true)} className="cta-button">
                  <Phone className="w-4 h-4" />Start Session
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6 w-full">
                {/* Animated orb */}
                <div className="relative w-40 h-40 mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <div className="absolute inset-8 rounded-full bg-primary/40 flex items-center justify-center animate-orb-breathe">
                    <Waves className="w-10 h-10 text-primary" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-primary">Simon is listening...</p>
                  <p className="text-xs text-muted-foreground mt-1">Session active — 0:33 elapsed</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full transition-all ${isMuted ? "bg-destructive/20 text-destructive" : "glass-surface text-foreground"}`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsActive(false)}
                    className="p-4 rounded-full bg-destructive text-destructive-foreground hover:brightness-110 transition-all"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-3 rounded-full transition-all ${!isSpeakerOn ? "bg-destructive/20 text-destructive" : "glass-surface text-foreground"}`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                {/* Device/Channel Selector */}
                <div className="flex items-center justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 glass-surface px-3 py-1.5">
                    <Monitor className="w-3 h-3 text-muted-foreground" />
                    <span>Default Mic</span>
                  </div>
                  <div className="flex items-center gap-1.5 glass-surface px-3 py-1.5">
                    <Speaker className="w-3 h-3 text-muted-foreground" />
                    <span>Living Room</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Transcript */}
          {isActive && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-3">
              <h3 className="section-title flex items-center gap-2"><Radio className="w-4 h-4 text-primary" />Live Transcript</h3>
              <div className="space-y-2 max-h-60 overflow-auto scrollbar-thin">
                {transcriptItems.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 glass-surface">
                    <span className={`text-xs font-semibold shrink-0 w-14 ${t.speaker === "You" ? "text-foreground" : "text-primary"}`}>
                      {t.speaker}
                    </span>
                    <p className="text-sm flex-1">{t.text}</p>
                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">{t.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar: Agents + Activity */}
        <div className="space-y-4">
          <div className="glass-card p-4 space-y-3">
            <h3 className="text-sm font-semibold">Active Agents</h3>
            {agents.map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3 glass-surface">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className={`text-xs font-bold ${a.color}`}>{a.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">{a.role}</p>
                  </div>
                </div>
                <span className={statusStyles[a.status]}>{a.status}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-4 space-y-3">
            <h3 className="text-sm font-semibold">Session Info</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: "Channel", value: "Main" },
                { label: "Pipeline Latency", value: "42ms" },
                { label: "Audio Quality", value: "High (48kHz)" },
                { label: "VAD", value: "Active" },
                { label: "Barge-in", value: "Enabled" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2 glass-surface">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
