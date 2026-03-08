import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Download, Star, GitFork, Search, Filter, Check, ExternalLink,
  Bot, Mic, Shield, Zap, Brain, Home, Thermometer, Camera, Music,
  Globe, Code, MessageSquare, Eye, Clock, TrendingUp, Package,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type CatalogItem = {
  id: string;
  name: string;
  description: string;
  repo: string;
  author: string;
  stars: number;
  forks: number;
  category: "agent" | "skill" | "integration" | "voice" | "automation";
  tags: string[];
  icon: React.ElementType;
  installed: boolean;
  updated: string;
  downloads: number;
};

const catalogItems: CatalogItem[] = [
  { id: "1", name: "Home Assistant Bridge", description: "Full bidirectional sync with Home Assistant entities, automations, and scenes.", repo: "openclaw/ha-bridge", author: "openclaw", stars: 2340, forks: 412, category: "integration", tags: ["home-assistant", "devices", "scenes"], icon: Home, installed: true, updated: "2d ago", downloads: 18200 },
  { id: "2", name: "Voice Pipeline Agent", description: "Real-time STT/TTS pipeline with multi-language support and barge-in detection.", repo: "simon-ai/voice-pipeline", author: "simon-ai", stars: 1870, forks: 290, category: "voice", tags: ["voice", "stt", "tts", "realtime"], icon: Mic, installed: false, updated: "5h ago", downloads: 12400 },
  { id: "3", name: "Security Sentinel", description: "AI-powered camera monitoring, anomaly detection, and automated alerts.", repo: "smart-home-os/sentinel", author: "smart-home-os", stars: 3210, forks: 580, category: "agent", tags: ["security", "camera", "alerts", "ml"], icon: Shield, installed: true, updated: "1d ago", downloads: 24100 },
  { id: "4", name: "Energy Optimizer", description: "Track and optimize energy consumption across all connected devices with ML predictions.", repo: "green-home/energy-opt", author: "green-home", stars: 1420, forks: 210, category: "skill", tags: ["energy", "optimization", "ml", "climate"], icon: Zap, installed: false, updated: "3d ago", downloads: 8900 },
  { id: "5", name: "Context Memory Engine", description: "Long-term memory and preference learning for personalized agent interactions.", repo: "openclaw/memory-engine", author: "openclaw", stars: 4100, forks: 720, category: "agent", tags: ["memory", "context", "personalization"], icon: Brain, installed: false, updated: "12h ago", downloads: 31200 },
  { id: "6", name: "Climate Controller", description: "Advanced HVAC scheduling with weather forecasting and occupancy detection.", repo: "smart-home-os/climate-ctrl", author: "smart-home-os", stars: 980, forks: 145, category: "skill", tags: ["climate", "hvac", "weather", "scheduling"], icon: Thermometer, installed: false, updated: "1w ago", downloads: 6300 },
  { id: "7", name: "Vision Agent", description: "Object detection and scene understanding for smart cameras and displays.", repo: "ai-vision/home-eye", author: "ai-vision", stars: 2760, forks: 430, category: "agent", tags: ["vision", "camera", "ml", "detection"], icon: Camera, installed: false, updated: "4d ago", downloads: 15700 },
  { id: "8", name: "Music & Mood", description: "Context-aware music selection based on time, activity, and mood detection.", repo: "audio-ai/mood-music", author: "audio-ai", stars: 1650, forks: 280, category: "skill", tags: ["music", "mood", "audio", "spotify"], icon: Music, installed: true, updated: "6h ago", downloads: 11800 },
  { id: "9", name: "Web Research Agent", description: "Autonomous web research with summarization and fact-checking capabilities.", repo: "openclaw/web-researcher", author: "openclaw", stars: 5200, forks: 890, category: "agent", tags: ["research", "web", "summarization", "rag"], icon: Globe, installed: false, updated: "1d ago", downloads: 42000 },
  { id: "10", name: "Code Assistant", description: "On-device code generation and review for home automation scripts.", repo: "dev-tools/code-assist", author: "dev-tools", stars: 3800, forks: 610, category: "skill", tags: ["code", "generation", "automation", "scripts"], icon: Code, installed: false, updated: "8h ago", downloads: 27600 },
  { id: "11", name: "Multi-Agent Router", description: "Intelligent routing and handoff between multiple AI agents with context preservation.", repo: "openclaw/agent-router", author: "openclaw", stars: 2100, forks: 340, category: "agent", tags: ["routing", "multi-agent", "handoff"], icon: MessageSquare, installed: false, updated: "2d ago", downloads: 16900 },
  { id: "12", name: "Presence Detection", description: "Room-level occupancy detection using BLE, WiFi, and sensor fusion.", repo: "smart-home-os/presence", author: "smart-home-os", stars: 1290, forks: 198, category: "automation", tags: ["presence", "ble", "sensors", "rooms"], icon: Eye, installed: false, updated: "5d ago", downloads: 9400 },
];

const categories = [
  { value: "all", label: "All" },
  { value: "agent", label: "Agents" },
  { value: "skill", label: "Skills" },
  { value: "integration", label: "Integrations" },
  { value: "voice", label: "Voice" },
  { value: "automation", label: "Automations" },
];

const sortOptions = [
  { value: "stars", label: "Most Stars", icon: Star },
  { value: "downloads", label: "Most Downloads", icon: Download },
  { value: "recent", label: "Recently Updated", icon: Clock },
  { value: "trending", label: "Trending", icon: TrendingUp },
];

const categoryColors: Record<string, string> = {
  agent: "bg-primary/20 text-primary border-primary/30",
  skill: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  integration: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  voice: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  automation: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function SkillCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("stars");
  const [items, setItems] = useState(catalogItems);
  const [installing, setInstalling] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = items
    .filter((i) => {
      const matchesSearch =
        !search ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase()) ||
        i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === "all" || i.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "downloads") return b.downloads - a.downloads;
      return 0;
    });

  const handleInstall = (id: string) => {
    setInstalling(id);
    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, installed: true } : i))
      );
      setInstalling(null);
      const item = items.find((i) => i.id === id);
      toast({
        title: "Installed",
        description: `${item?.name} has been installed successfully.`,
      });
    }, 1500);
  };

  const handleUninstall = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, installed: false } : i))
    );
    const item = items.find((i) => i.id === id);
    toast({
      title: "Uninstalled",
      description: `${item?.name} has been removed.`,
    });
  };

  const installedCount = items.filter((i) => i.installed).length;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Skill Catalog</h1>
            <p className="text-xs text-muted-foreground">
              Browse and install agents, skills, and integrations from GitHub
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="outline" className="border-primary/30 text-primary text-xs">
            <Github className="w-3 h-3 mr-1" />
            {items.length} packages
          </Badge>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
            <Check className="w-3 h-3 mr-1" />
            {installedCount} installed
          </Badge>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills, agents, integrations…"
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === c.value
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-border/50 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            {sortOptions.map((s) => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`p-1.5 rounded-md transition-colors ${
                  sort === s.value ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                title={s.label}
              >
                <s.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card p-4 flex flex-col gap-3 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Github className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground font-mono">{item.repo}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${categoryColors[item.category]}`}>
                  {item.category}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/60 text-[10px] text-muted-foreground font-mono">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">+{item.tags.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> {item.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" /> {item.forks}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" /> {(item.downloads / 1000).toFixed(1)}k
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">{item.updated}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.installed ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" /> Installed
                    </button>
                    <button
                      onClick={() => handleUninstall(item.id)}
                      className="px-3 py-2 rounded-lg bg-secondary/50 text-muted-foreground text-xs hover:text-destructive hover:bg-destructive/10 transition-colors border border-border/50"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleInstall(item.id)}
                    disabled={installing === item.id}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/20 text-primary text-xs font-medium border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50"
                  >
                    {installing === item.id ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Installing…
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Install
                      </>
                    )}
                  </button>
                )}
                <a
                  href={`https://github.com/${item.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors border border-border/50"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No results found for "{search}"</p>
        </div>
      )}
    </div>
  );
}
