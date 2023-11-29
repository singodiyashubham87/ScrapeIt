import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

// Auth0 Environment Variables for Configuration 
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URL;

// Use ReactDOM.createRoot for Concurrent Mode rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the entire application in Auth0Provider for authentication
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      {/* Render the main App component */}
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
