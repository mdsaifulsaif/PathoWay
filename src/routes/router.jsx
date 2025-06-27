import { createBrowserRouter, RouterProvider } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import HomeLayout from "../layout/Home/HomeLayout";
import AuthLayout from "../layout/Auth/AuthLayout";
import Login from "../layout/Auth/Login";
import Register from "../layout/Auth/Register";
import Coverage from "../pages/Coverage";
import AddParcelForm from "../pages/AddParcelForm";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import DasboardLayout from "../pages/Dashboard/DasboardLayout";
import MyPercel from "../pages/Dashboard/MyPercel";
import AllData from "../pages/Dashboard/AllData";
import ViewParcel from "../pages/ViewParcel";
import Payments from "../pages/Dashboard/Payments/Payments";

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
      {
        path: "/addparcel",
        element: (
          <PrivetRoute>
            <AddParcelForm></AddParcelForm>
          </PrivetRoute>
        ),
        loader: () => fetch("../../data/warehouses.json"),
      },
      {
        path: "/viewparcel/:id",
        element: (
          <PrivetRoute>
            <ViewParcel></ViewParcel>
          </PrivetRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DasboardLayout></DasboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "myparcels",
        Component: MyPercel,
      },
      {
        path: "alldata",
        Component: AllData,
      },
      {
        path: "payment/:id",
        Component: Payments,
      },
    ],
  },
]);
