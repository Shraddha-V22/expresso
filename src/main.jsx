import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { makeServer } from "./server.js";
import AuthProvider from "./contexts/AuthProvider.jsx";
import UsersProvider from "./contexts/UsersProvider.jsx";
import PostsProvider from "./contexts/PostsProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <PostsProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PostsProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
