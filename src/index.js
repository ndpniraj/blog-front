import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorProvider from "./context/ErrorProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
