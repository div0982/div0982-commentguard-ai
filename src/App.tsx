import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import { initSentry } from './lib/sentry';
import reportWebVitals from './lib/vitals';
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InstagramCallback from "./pages/auth/instagram/callback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
import { PolicyButton } from "./components/PolicyButton";

// Initialize Sentry
initSentry();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Report web vitals
reportWebVitals(console.log);

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/analyzer" element={<Index />} />
                <Route path="/index" element={<Navigate to="/analyzer" replace />} />
                <Route path="/auth/instagram/callback" element={<InstagramCallback />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/data-deletion" element={<DataDeletion />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <PolicyButton />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
