import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store/store";

import "../node_modules/primeflex/primeflex.css"; //flexbox
import '../node_modules/react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);
