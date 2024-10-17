import App from "./App.jsx";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Credentials from "./components/Signup/Credentials.jsx";
import Address from "./components/Signup/Address.jsx";
import Review from "./components/Signup/Review.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import Login from "./components/login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
        children: [
          {
            path: "credentials",
            element: <Credentials />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "review",
            element: <Review />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <AuthLayout Authorization={true}>
            <Dashboard />
          </AuthLayout>
        ),
      },

      {
        path: "update",
        element: (
          <AuthLayout Authorization={true}>
            <UpdatePage />
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
