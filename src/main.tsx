import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./context/index.tsx";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 2000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ec1d26",
            },
          }}
        >
          <App />
          <Toaster position="top-right" richColors duration={2000} />
        </ConfigProvider>
      </SidebarProvider>
    </QueryClientProvider>
  </StrictMode>
);
