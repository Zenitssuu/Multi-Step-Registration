import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./AppRoutes.jsx";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./store/Store.js";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import {Toaster} from "sonner"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster visibleToasts={1} position="top-right" richColors/>
      </PersistGate>
    </Provider>
  </StrictMode>
);
