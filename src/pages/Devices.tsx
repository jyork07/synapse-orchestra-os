import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb, Thermometer, Speaker, Lock, Camera, Gauge, Star, Tv,
  ChevronRight, Plus, Home
} from "lucide-react";

const rooms = [
  { name: "Living Room", devices: 6, active: 4 },
  { name: "Bedroom", devices: 4, active: 2 },
  { name: "Kitchen", devices: 5, active: 3 },
  { name: "Office", devices: 3, active: 2 },
  { name: "Garage", devices: 2, active: 1 },
  { name: "Porch", devices: 3, active: 1 },
];

const devices = [
  { name: "Living Room Lights", type: "light", room: "Living Room", state: "On — 80%", icon: Lightbulb, online: true, favorite: true },
  { name: "Main Thermostat", type: "climate", room: "Living Room", state: "72°F", icon: Thermometer, online: true, favorite: true },
  { name: "Sonos Speaker", type: "speaker", room: "Living Room", state: "Playing", icon: Speaker, online: true, favorite: false },
  { name: "Front Door Lock", type: "lock", room: "Porch", state: "Locked", icon: Lock, online: true, favorite: true },
  { name: "Kitchen Camera", type: "camera", room: "Kitchen", state: "Recording", icon: Camera, online: true, favorite: false },
  { name: "Bedroom Lights", type: "light", room: "Bedroom", state: "Off", icon: Lightbulb, online: true, favorite: false },
  { name: "Office Monitor", type: "display", room: "Office", state: "On", icon: Tv, online: true, favorite: false },
  { name: "Garage Sensor", type: "sensor", room: "Garage", state: "Closed", icon: Gauge, online: true, favorite: false },
  { name: "Porch Light", type: "light", room: "Porch", state: "On — 40%", icon: Lightbulb, online: true, favorite: false },
  { name: "Bedroom AC", type: "climate", room: "Bedroom", state: "69°F", icon: Thermometer, online: true, favorite: true },
  { name: "Kitchen Lights", type: "light", room: "Kitchen", state: "On — 100%", icon: Lightbulb, online: true, favorite: false },
  { name: "Office Speaker", type: "speaker", room: "Office", state: "Idle", icon: Speaker, online: false, favorite: false },
];

const scenes = [
  { name: "Movie Night", desc: "Dim lights, TV on, sound bar ready" },
  { name: "Focus Mode", desc: "Office lights bright, others off, DND on" },
  { name: "Party", desc: "All lights colorful, speakers connected" },
  { name: "Relax", desc: "Warm lights 30%, ambient music" },
];



export default function Devices() {
  const [activeRoom, setActiveRoom] = useState("All");
  const filtered = activeRoom === "All" ? devices : devices.filter((d) => d.room === activeRoom);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Devices</h1>
          <p className="page-subtitle">{devices.length} devices across {rooms.length} rooms</p>
        </div>
        <button className="cta-button"><Plus className="w-4 h-4" />Add Device</button>
      </div>

      {/* Rooms */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
        <button
          onClick={() => setActiveRoom("All")}
          className={`shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${activeRoom === "All" ? "bg-primary text-primary-foreground" : "glass-surface"}`}
        >
          All Rooms
        </button>
        {rooms.map((r) => (
          <button
            key={r.name}
            onClick={() => setActiveRoom(r.name)}
            className={`shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${activeRoom === r.name ? "bg-primary text-primary-foreground" : "glass-surface"}`}
          >
            {r.name} ({r.active}/{r.devices})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Device Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card-hover p-4 space-y-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <d.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5">
                  {d.favorite && <Star className="w-3 h-3 text-warning fill-warning" />}
                  <div className={d.online ? "neon-dot-success" : "neon-dot-error"} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{d.name}</h3>
                <p className="text-[10px] text-muted-foreground">{d.room}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">{d.state}</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scenes */}
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <h3 className="section-title">Scene Presets</h3>
            <div className="space-y-2">
              {scenes.map((s) => (
                <button key={s.name} className="w-full p-3 glass-surface text-left hover:border-primary/30 transition-colors">
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h3 className="section-title flex items-center gap-2"><Star className="w-4 h-4 text-warning" />Favorites</h3>
            <div className="space-y-2">
              {devices.filter((d) => d.favorite).map((d) => (
                <div key={d.name} className="flex items-center justify-between p-2.5 glass-surface">
                  <div className="flex items-center gap-2">
                    <d.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{d.state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
