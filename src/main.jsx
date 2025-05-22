import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { RoomProvider } from "./context/context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <RoomProvider>
      <Router>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLECLIENTID}>
          <App />
        </GoogleOAuthProvider>
        ;
      </Router>
    </RoomProvider>
  </AuthProvider>
  // </StrictMode>
);
