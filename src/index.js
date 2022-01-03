import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NotificationProvider from "./context/NotificationProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
