import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import LoddingPage from "../LoddingPage";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const RiderPendingParcels = () => {
  const { user } = use(AuthContext);

  const axiosSecure = UseAxiosSecure();

  const {
    data: riderParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider-pending-parcel?email=${user.email}`
      );
      return res.data;
    },
  });

  const handlePickup = async (id) => {
    try {
      await axiosSecure.put(`/pickup/${id}`, {
        delivery_status: "picked_up", // Or whatever status you want
      });
      Swal.fire("Picked up!", "You picked up the parcel", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to pick up", "error");
    }
  };

  const handleDeliver = async (id) => {
    try {
      await axiosSecure.put(`/deliver/${id}`);
      Swal.fire("Delivered!", "Parcel has been delivered", "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to mark delivered", "error");
    }
  };

  if (isLoading) return <LoddingPage />;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Type</th>
              <th>Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riderParcels.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.senderName}</td>
                <td>{item.type}</td>
                <td>{item.senderDistrict}</td>
                <td className="text-yellow-600 capitalize">
                  {item.delivery_status}
                </td>
                {/* <td>
                  <button
                    onClick={() => handlePickup(item._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Pickup
                  </button>
                </td> */}
                <td>
                  {item.delivery_status === "rider_assign" ? (
                    <button
                      onClick={() => handlePickup(item._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Pickup
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeliver(item._id)}
                      className="btn btn-sm btn-success"
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {riderParcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No deliveries to pick up.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderPendingParcels;
