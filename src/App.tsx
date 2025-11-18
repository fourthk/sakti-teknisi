import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ChangeRequest from "./pages/ChangeRequest";
import ChangeRequestDetail from "./pages/ChangeRequestDetail";
import CreateSchedule from "./pages/CreateSchedule";
import ImplementationSchedule from "./pages/ImplementationSchedule";
import ScheduleDetail from "./pages/ScheduleDetail";
import ImplementationResults from "./pages/ImplementationResults";
import ImplementationDetail from "./pages/ImplementationDetail";
import CMDB from "./pages/CMDB";
import CMDBCategory from "./pages/CMDBCategory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/change-request" element={<ChangeRequest />} />
            <Route path="/change-request/:id" element={<ChangeRequestDetail />} />
            <Route path="/create-schedule" element={<CreateSchedule />} />
            <Route path="/implementation-schedule" element={<ImplementationSchedule />} />
            <Route path="/implementation-schedule/:id" element={<ScheduleDetail />} />
            <Route path="/implementation-results" element={<ImplementationResults />} />
            <Route path="/implementation-results/:id" element={<ImplementationDetail />} />
            <Route path="/cmdb" element={<CMDB />} />
            <Route path="/cmdb/:category" element={<CMDBCategory />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
