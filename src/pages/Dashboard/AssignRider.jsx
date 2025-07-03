import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import LoddingPage from "../LoddingPage";

const AssignRider = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paidPendingParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?paymentStatus=paid&status=pending`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoddingPage></LoddingPage>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Sender</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{parcel.senderName}</td>
                <td className="p-3 capitalize">{parcel.type}</td>
                <td className="p-3 capitalize text-yellow-600">
                  {parcel.status}
                </td>
                <td className="p-3 text-green-600 font-semibold">
                  {parcel.paymentStatus}
                </td>
                <td className="p-3">
                  <button className="bg-lime-500 hover:bg-lime-600 text-white px-3 py-1 rounded flex items-center gap-2">
                    <FaCheckCircle /> Assign
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="p-5 text-center text-gray-500">
                  No parcels available to assign.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRider;
