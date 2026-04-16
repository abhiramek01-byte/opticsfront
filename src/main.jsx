import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Global interceptor for Branch Isolation
axios.interceptors.request.use((config) => {
  const branchId = localStorage.getItem("branchId");
  if (branchId) {
    config.headers["branch-id"] = branchId;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);