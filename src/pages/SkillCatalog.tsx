import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Download, Star, GitFork, Search, Filter, Check, ExternalLink,
  Package, TrendingUp, Clock, Grid, List, ChevronLeft, ChevronRight, Award,
  X, Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { catalogItems as allCatalogItems, type CatalogItem } from "@/data/catalogData";

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
  skill: "bg-success/20 text-success border-success/30",
  integration: "bg-warning/20 text-warning border-warning/30",
  voice: "bg-accent/20 text-accent border-accent/30",
  automation: "bg-destructive/20 text-destructive border-destructive/30",
};

const ITEMS_PER_PAGE = 24;

export default function SkillCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("stars");
  const [items, setItems] = useState(allCatalogItems);
  const [installing, setInstalling] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showInstalled, setShowInstalled] = useState(false);
  const [detailItem, setDetailItem] = useState<CatalogItem | null>(null);
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return items
      .filter((i) => {
        const matchesSearch = !search ||
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          i.author.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || i.category === category;
        const matchesInstalled = !showInstalled || i.installed;
        return matchesSearch && matchesCategory && matchesInstalled;
      })
      .sort((a, b) => {
        if (sort === "stars") return b.stars - a.stars;
        if (sort === "downloads") return b.downloads - a.downloads;
        return 0;
      });
  }, [items, search, category, sort, showInstalled]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const featured = items.filter((i) => i.featured);
  const installedCount = items.filter((i) => i.installed).length;
  const totalStars = items.reduce((s, i) => s + i.stars, 0);
  const totalDownloads = items.reduce((s, i) => s + i.downloads, 0);

  const handleInstall = (id: string) => {
    setInstalling(id);
    setTimeout(() => {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, installed: true } : i)));
      setInstalling(null);
      const item = items.find((i) => i.id === id);
      toast({ title: "Installed", description: `${item?.name} has been installed successfully.` });
    }, 1500);
  };

  const handleUninstall = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, installed: false } : i)));
    const item = items.find((i) => i.id === id);
    toast({ title: "Uninstalled", description: `${item?.name} has been removed.` });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="page-title">Skill Catalog</h1>
              <p className="page-subtitle">Browse and install agents, skills, and integrations from GitHub</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Packages", value: items.length.toString(), icon: Package },
          { label: "Installed", value: installedCount.toString(), icon: Check },
          { label: "Total Stars", value: `${(totalStars / 1000).toFixed(0)}k`, icon: Star },
          { label: "Total Downloads", value: `${(totalDownloads / 1000).toFixed(0)}k`, icon: Download },
        ].map((s) => (
          <div key={s.label} className="glass-card p-3 flex items-center gap-3">
            <s.icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div className="glass-card p-5 space-y-3">
        <h2 className="section-title flex items-center gap-2"><Award className="w-4 h-4 text-warning" />Featured</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
          {featured.map((item) => (
            <button
              key={item.id}
              onClick={() => setDetailItem(item)}
              className="shrink-0 w-56 glass-surface p-4 text-left hover:border-primary/30 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold truncate">{item.name}</span>
                {item.verified && <Shield className="w-3 h-3 text-primary shrink-0" />}
              </div>
              <p className="text-[10px] text-muted-foreground line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3" />{item.stars.toLocaleString()}</span>
                <span className="flex items-center gap-0.5"><Download className="w-3 h-3" />{(item.downloads / 1000).toFixed(1)}k</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search skills, agents, integrations, authors…"
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => { setCategory(c.value); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === c.value
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-border/50 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
          <button
            onClick={() => { setShowInstalled(!showInstalled); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showInstalled
                ? "bg-success/20 text-success border border-success/30"
                : "bg-secondary/50 text-muted-foreground border border-border/50 hover:text-foreground"
            }`}
          >
            <Check className="w-3 h-3 inline mr-1" />Installed
          </button>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
              <List className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            {sortOptions.map((s) => (
              <button key={s.value} onClick={() => setSort(s.value)} className={`p-1.5 rounded-md transition-colors ${sort === s.value ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`} title={s.label}>
                <s.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground">
          Showing {paginated.length} of {filtered.length} results
        </div>
      </div>

      {/* Catalog Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {paginated.map((item, i) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.02 }}
                className="glass-card p-4 flex flex-col gap-3 group cursor-pointer" onClick={() => setDetailItem(item)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold text-foreground leading-tight truncate">{item.name}</h3>
                        {item.verified && <Shield className="w-3 h-3 text-primary shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Github className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="text-[10px] text-muted-foreground font-mono truncate">{item.repo}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${categoryColors[item.category]}`}>{item.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/60 text-[10px] text-muted-foreground font-mono">{tag}</span>
                  ))}
                  {item.tags.length > 3 && <span className="text-[10px] text-muted-foreground">+{item.tags.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{item.stars.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{item.forks}</span>
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{(item.downloads / 1000).toFixed(1)}k</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{item.updated}</span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {item.installed ? (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-success/15 text-success text-xs font-medium border border-success/20">
                        <Check className="w-3.5 h-3.5" /> Installed
                      </button>
                      <button onClick={() => handleUninstall(item.id)} className="px-3 py-2 rounded-lg bg-secondary/50 text-muted-foreground text-xs hover:text-destructive hover:bg-destructive/10 transition-colors border border-border/50">Remove</button>
                    </>
                  ) : (
                    <button onClick={() => handleInstall(item.id)} disabled={installing === item.id}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/20 text-primary text-xs font-medium border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50">
                      {installing === item.id ? (
                        <><div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />Installing…</>
                      ) : (
                        <><Download className="w-3.5 h-3.5" /> Install</>
                      )}
                    </button>
                  )}
                  <a href={`https://github.com/${item.repo}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors border border-border/50">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="glass-card divide-y divide-border/30">
          {paginated.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setDetailItem(item)}>
              <div className="w-9 h-9 rounded-lg bg-secondary/80 border border-border/50 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                  {item.verified && <Shield className="w-3 h-3 text-primary" />}
                  <Badge variant="outline" className={`text-[9px] ${categoryColors[item.category]}`}>{item.category}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground shrink-0">
                <span className="flex items-center gap-1"><Star className="w-3 h-3" />{item.stars.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" />{(item.downloads / 1000).toFixed(1)}k</span>
              </div>
              <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                {item.installed ? (
                  <span className="status-badge-success text-[10px]"><Check className="w-3 h-3" />Installed</span>
                ) : (
                  <button onClick={() => handleInstall(item.id)} disabled={installing === item.id}
                    className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50">
                    {installing === item.id ? "Installing…" : "Install"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg glass-surface disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-medium ${p === page ? "bg-primary text-primary-foreground" : "glass-surface text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg glass-surface disabled:opacity-30">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No results found</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {detailItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setDetailItem(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 max-w-lg w-full space-y-4 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border/50 flex items-center justify-center">
                    <detailItem.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold">{detailItem.name}</h2>
                      {detailItem.verified && <Shield className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Github className="w-3 h-3" /><span className="font-mono">{detailItem.repo}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setDetailItem(null)} className="p-1 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
              </div>
              <Badge variant="outline" className={`${categoryColors[detailItem.category]}`}>{detailItem.category}</Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">{detailItem.description}</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Stars", value: detailItem.stars.toLocaleString(), icon: Star },
                  { label: "Forks", value: detailItem.forks.toString(), icon: GitFork },
                  { label: "Downloads", value: `${(detailItem.downloads / 1000).toFixed(1)}k`, icon: Download },
                  { label: "Updated", value: detailItem.updated, icon: Clock },
                ].map((s) => (
                  <div key={s.label} className="glass-surface p-2 text-center">
                    <s.icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                    <div className="text-sm font-bold">{s.value}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {detailItem.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/60 text-[10px] text-muted-foreground font-mono">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                {detailItem.installed ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-success/15 text-success text-sm font-medium border border-success/20">
                      <Check className="w-4 h-4" /> Installed
                    </button>
                    <button onClick={() => { handleUninstall(detailItem.id); setDetailItem(null); }}
                      className="px-4 py-2.5 rounded-lg bg-secondary/50 text-muted-foreground text-sm hover:text-destructive hover:bg-destructive/10 transition-colors border border-border/50">Remove</button>
                  </>
                ) : (
                  <button onClick={() => { handleInstall(detailItem.id); }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
                    <Download className="w-4 h-4" /> Install Package
                  </button>
                )}
                <a href={`https://github.com/${detailItem.repo}`} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors border border-border/50 text-sm flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" /> GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
