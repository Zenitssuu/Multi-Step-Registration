import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./AppRoutes.jsx";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./store/Store.js";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
