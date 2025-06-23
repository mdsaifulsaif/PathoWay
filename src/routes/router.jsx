import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import HomeLayout from "../layout/Home/HomeLayout";
import AuthLayout from "../layout/Auth/AuthLayout";
import Login from "../layout/Auth/Login";
import Register from "../layout/Auth/Register";
import Coverage from "../pages/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout></Rootlayout>,
    children: [
      {
        index: true,
        Component: HomeLayout,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
