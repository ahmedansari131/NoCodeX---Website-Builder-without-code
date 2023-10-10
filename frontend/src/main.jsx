import React from "react";
import ReactDOM from "react-dom/client";
import App1 from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App1 />
  </Provider>
  // {/* </React.StrictMode> */}
);
