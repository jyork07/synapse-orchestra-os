import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimonLayout from "./components/SimonLayout";
import Home from "./pages/Index";
import Chat from "./pages/Chat";
import Voice from "./pages/Voice";
import Agents from "./pages/Agents";
import Automations from "./pages/Automations";
import Devices from "./pages/Devices";
import Canvas from "./pages/Canvas";
import Logs from "./pages/Logs";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SimonLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/voice" element={<Voice />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/canvas" element={<Canvas />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
