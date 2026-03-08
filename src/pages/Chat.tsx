import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Mic, Paperclip, Bot, User, Sparkles, ArrowRight, RotateCcw, Copy, ThumbsUp
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  agent?: string;
  streaming?: boolean;
}

const quickPrompts = [
  "What's the status of all devices?",
  "Run the morning routine",
  "Dim the living room lights to 30%",
  "Show me today's energy usage",
  "What automations ran today?",
];

const suggestedActions = [
  { label: "Check device status", icon: ArrowRight },
  { label: "Run night mode", icon: Sparkles },
  { label: "Show recent logs", icon: ArrowRight },
];

const initialMessages: Message[] = [
  { id: "1", role: "system", content: "Simon AI is online. Connected to 4 agents, 18 devices.", timestamp: "10:00 AM" },
  { id: "2", role: "assistant", content: "Good morning! I've checked all systems — everything is running smoothly. Your morning routine ran at 6:30 AM, lights are at 80%, thermostat is set to 72°F. What would you like to do?", timestamp: "10:01 AM", agent: "Simon" },
  { id: "3", role: "user", content: "What's the energy usage today?", timestamp: "10:02 AM" },
  { id: "4", role: "assistant", content: "Today's energy consumption so far is **4.2 kWh**, which is 12% lower than yesterday at this time. The biggest consumers are:\n\n• HVAC System — 1.8 kWh\n• Kitchen appliances — 0.9 kWh\n• Lighting — 0.6 kWh\n\nWould you like me to optimize any of these?", timestamp: "10:02 AM", agent: "Simon" },
  { id: "5", role: "assistant", content: "I've also noticed the guest bedroom AC has been running for 3 hours with no motion detected. Want me to turn it off?", timestamp: "10:03 AM", agent: "Home Agent" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate streaming response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing your request. Let me check the relevant systems and get back to you with the details...",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        agent: "Simon",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Live Chat</h1>
            <p className="text-xs text-muted-foreground">Simon + 3 agents connected</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isVoiceMode ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {isVoiceMode ? "Voice Mode" : "Text Mode"}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "system" ? (
              <div className="w-full text-center">
                <span className="text-xs text-muted-foreground glass-surface px-3 py-1.5 inline-block">
                  {msg.content}
                </span>
              </div>
            ) : (
              <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "order-1" : ""}`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "glass-card rounded-bl-md"
                }`}>
                  {msg.agent && (
                    <div className="text-xs font-medium text-primary mb-1 flex items-center gap-1">
                      <Bot className="w-3 h-3" />{msg.agent}
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.role === "user" ? "justify-end" : ""}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1">
                      <button className="p-0.5 hover:text-primary text-muted-foreground transition-colors"><Copy className="w-3 h-3" /></button>
                      <button className="p-0.5 hover:text-primary text-muted-foreground transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="p-0.5 hover:text-primary text-muted-foreground transition-colors"><RotateCcw className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Actions */}
      <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {suggestedActions.map((a) => (
          <button key={a.label} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 glass-surface text-xs font-medium hover:border-primary/30 transition-colors">
            <a.icon className="w-3 h-3 text-primary" />{a.label}
          </button>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {quickPrompts.map((p) => (
          <button key={p} onClick={() => setInput(p)}
            className="shrink-0 px-3 py-1.5 glass-surface text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 shrink-0">
        <div className="flex items-center gap-2 glass-card p-2">
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Paperclip className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message Simon..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Mic className={`w-4 h-4 ${isVoiceMode ? "text-primary" : "text-muted-foreground"}`} />
          </button>
          <button onClick={sendMessage} className="p-2 rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
