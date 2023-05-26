import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "next-themes";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider attribute="class" forcedTheme={'dark'}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
