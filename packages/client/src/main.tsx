import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "components/app/App.tsx";
import "./index.scss";
import "@elumixor/frontils";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
