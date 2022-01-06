import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NotificationProvider from "./context/NotificationProvider";
import { BrowserRouter } from "react-router-dom";
import SearchProvider from "./context/SearchProvider";

ReactDOM.render(
  <BrowserRouter>
    <NotificationProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </NotificationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
