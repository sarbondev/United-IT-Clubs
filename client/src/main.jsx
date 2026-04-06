import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import App from "./App.jsx";
import { swrConfig } from "./middlewares/Fetcher.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SWRConfig value={swrConfig}>
    <App />
  </SWRConfig>
);
