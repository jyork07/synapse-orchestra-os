import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home, MessageSquare, Mic, Bot, Zap, Cpu, LayoutDashboard, ScrollText, Settings, User,
  Lightbulb, Thermometer, Speaker, Lock, Camera, Shield, Sunrise, Moon, LogOut, Radio,
} from "lucide-react";

const pages = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Chat", icon: MessageSquare, path: "/chat" },
  { name: "Voice Studio", icon: Mic, path: "/voice" },
  { name: "Agents", icon: Bot, path: "/agents" },
  { name: "Automations", icon: Zap, path: "/automations" },
  { name: "Devices", icon: Cpu, path: "/devices" },
  { name: "Canvas", icon: LayoutDashboard, path: "/canvas" },
  { name: "Simon Agent", icon: User, path: "/simon" },
  { name: "Logs", icon: ScrollText, path: "/logs" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const devices = [
  { name: "Living Room Lights", icon: Lightbulb, path: "/devices" },
  { name: "Bedroom Thermostat", icon: Thermometer, path: "/devices" },
  { name: "Kitchen Speaker", icon: Speaker, path: "/devices" },
  { name: "Front Door Lock", icon: Lock, path: "/devices" },
  { name: "Garage Camera", icon: Camera, path: "/devices" },
  { name: "Motion Sensor", icon: Shield, path: "/devices" },
];

const automations = [
  { name: "Morning Routine", icon: Sunrise, path: "/automations" },
  { name: "Away Mode", icon: LogOut, path: "/automations" },
  { name: "Night Mode", icon: Moon, path: "/automations" },
  { name: "Guest Mode", icon: User, path: "/automations" },
  { name: "Security Alert", icon: Shield, path: "/automations" },
];

const agents = [
  { name: "Simon — Personal Agent", icon: Radio, path: "/simon" },
  { name: "Home Agent", icon: Home, path: "/agents" },
  { name: "Security Agent", icon: Shield, path: "/agents" },
  { name: "Voice Agent", icon: Mic, path: "/agents" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, devices, automations, agents…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.name} onSelect={() => go(p.path)}>
              <p.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Devices">
          {devices.map((d) => (
            <CommandItem key={d.name} onSelect={() => go(d.path)}>
              <d.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {d.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Automations">
          {automations.map((a) => (
            <CommandItem key={a.name} onSelect={() => go(a.path)}>
              <a.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {a.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Agents">
          {agents.map((a) => (
            <CommandItem key={a.name} onSelect={() => go(a.path)}>
              <a.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {a.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
