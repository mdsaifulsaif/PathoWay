import React, { use } from "react";
import useUserRole from "../../Hooks/useUserRole";
import { FaUser, FaBox, FaMoneyBillWave, FaUsersCog } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import LoddingPage from "../LoddingPage";

function AllData() {
  const [role, loading] = useUserRole();
  const { user } = use(AuthContext);

  if (loading) return <LoddingPage></LoddingPage>;
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
      {/* user info  */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Hello!, {user?.displayName || "User"}
        </h1>
        <p className="text-gray-600 text-sm">
          Role:{" "}
          <span className="capitalize font-medium text-lime-600">{role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users */}
        <div className="bg-white shadow-md rounded-xl p-5 text-center border">
          <FaUser className="text-3xl text-blue-500 mx-auto mb-2" />
          <p className="text-xl font-semibold">Total Users</p>
          <p className="text-gray-600">123</p>
        </div>

        {/* Parcels */}
        <div className="bg-white shadow-md rounded-xl p-5 text-center border">
          <FaBox className="text-3xl text-green-500 mx-auto mb-2" />
          <p className="text-xl font-semibold">Parcels</p>
          <p className="text-gray-600">87</p>
        </div>

        {/* Payments */}
        <div className="bg-white shadow-md rounded-xl p-5 text-center border">
          <FaMoneyBillWave className="text-3xl text-yellow-500 mx-auto mb-2" />
          <p className="text-xl font-semibold">Payments</p>
          <p className="text-gray-600">$3,250</p>
        </div>

        {/* Admin Panel Access */}
        <div className="bg-white shadow-md rounded-xl p-5 text-center border">
          <FaUsersCog className="text-3xl text-red-500 mx-auto mb-2" />
          <p className="text-xl font-semibold">Admin Access</p>
          <p className="text-gray-600">3 Admins</p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-600">
          Use the sidebar to manage users, parcels, riders, and more.
        </p>
      </div>

      {/* <div>
        <h1 className="text-3xl">Your Dashboard</h1>

        <div>
          <h1>Dashboard</h1>
          {role === "admin" && <p>You are an Admin</p>}
          {role === "rider" && <p>You are a Rider</p>}
          {role === "user" && <p>Standard User Access</p>}
        </div>
      </div> */}
    </div>
  );
}

export default AllData;
