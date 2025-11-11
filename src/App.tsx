import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ChangeRequest from "./pages/ChangeRequest";
import InspectionResults from "./pages/InspectionResults";
import ApprovalList from "./pages/ApprovalList";
import ImplementationSchedule from "./pages/ImplementationSchedule";
import CMDB from "./pages/CMDB";
import WorkHistory from "./pages/WorkHistory";
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
            <Route path="/inspection-results" element={<InspectionResults />} />
            <Route path="/approval-list" element={<ApprovalList />} />
            <Route path="/implementation-schedule" element={<ImplementationSchedule />} />
            <Route path="/cmdb" element={<CMDB />} />
            <Route path="/work-history" element={<WorkHistory />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
