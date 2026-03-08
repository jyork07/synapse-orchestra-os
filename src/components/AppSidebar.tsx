import {
  Home, MessageSquare, Mic, Bot, Zap, Cpu, LayoutDashboard, ScrollText, Settings, Radio
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Voice", url: "/voice", icon: Mic },
  { title: "Agents", url: "/agents", icon: Bot },
  { title: "Automations", url: "/automations", icon: Zap },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Canvas", url: "/canvas", icon: LayoutDashboard },
  { title: "Logs", url: "/logs", icon: ScrollText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar">
      <SidebarContent className="pt-4">
        <div className={`px-4 mb-6 flex items-center gap-2.5 ${collapsed ? "justify-center px-2" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Radio className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight text-foreground">Simon</span>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
