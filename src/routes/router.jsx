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
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import BeaRider from "../layout/Home/BeaRider";
import Riders from "../pages/Dashboard/Riders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders";
import Rider from "../pages/Dashboard/Rider";
import AdminUserPanel from "../pages/Dashboard/AdminUserPanel";
import Forbidden from "../Components/Forbidden";
import PrivetAdminRoute from "../PrivetRoute/PrivetAdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider";
import RiderPendingParcels from "../pages/Dashboard/RiderPendingParcels";

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
      {
        path: "/bearider",
        element: (
          <PrivetRoute>
            <BeaRider></BeaRider>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "forbidden",
    Component: Forbidden,
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
        index: true,
        Component: AllData,
      },
      {
        path: "myparcels",
        Component: MyPercel,
      },

      {
        path: "payment/:id",
        Component: Payments,
      },
      {
        path: "paymenthistory",
        Component: PaymentHistory,
      },
      {
        path: "riders",
        element: <Riders></Riders>,
      },
      {
        path: "activeriders",
        Component: ActiveRiders,
      },
      {
        path: "riderdetails/:id",
        Component: Rider,
      },
      {
        path: "admin",
        element: <AdminUserPanel></AdminUserPanel>,
      },
      {
        path: "assignriders",
        element: <AssignRider></AssignRider>,
      },
      {
        path: "rider-pending-parcels",
        element: <RiderPendingParcels></RiderPendingParcels>,
      },
    ],
  },
]);
