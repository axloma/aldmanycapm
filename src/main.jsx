import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { RoomProvider } from "./context/context";
import { BookContextprovider } from "./context/bookcontext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RoomProvider>
    <Router>
      <App />
    </Router>
  </RoomProvider>
  // </StrictMode>,
);
