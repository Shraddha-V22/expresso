import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { makeServer } from "./server.js";
import AuthProvider from "./contexts/AuthProvider.jsx";
import UsersProvider from "./contexts/UsersProvider.jsx";
import PostsProvider from "./contexts/PostsProvider.jsx";

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UsersProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>
);
