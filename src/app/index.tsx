import { HashRouter } from "react-router-dom";
import { ToastContainer } from "@/lib/ToastContainer";
import { Routes } from "./routes";
import { initFontAwesome } from "@/lib/FontAwesome";

import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeProvider } from "@/providers/Theme/ThemeProvider";
import { Layout } from "@/layout/";

initFontAwesome();

export const App: React.FC = () => {
  return (
    <HashRouter>
      <ToastContainer />
      <ThemeProvider>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </HashRouter>
  );
};
