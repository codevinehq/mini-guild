import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import Loader from "./components/Loader";
import Notifications from "./components/Notifications";
import GlobalLoader from "./components/GlobalLoader";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <GlobalLoader />
        <App />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
