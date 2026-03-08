import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";

export default function SimonLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 shrink-0 bg-background/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex items-center gap-2 ml-2">
                <div className="neon-dot-success" />
                <span className="text-xs text-muted-foreground font-mono">SYSTEM ONLINE</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search…</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background/50 border border-border/50 text-[10px] font-mono">⌘K</kbd>
              </button>
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">S</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto scrollbar-thin">
            <Outlet />
          </main>
          <CommandPalette />
        </div>
      </div>
    </SidebarProvider>
  );
}
