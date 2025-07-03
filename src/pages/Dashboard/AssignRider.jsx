import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import LoddingPage from "../LoddingPage";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const AssignRider = () => {
  const { user } = React.useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["paidPendingParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/assign-parcels?paymentStatus=paid&delivery_status=pending"
      );
      return res.data;
    },
  });

  const openAssignModal = async (parcel) => {
    try {
      const res = await axiosSecure.get(
        `/assigned-rider?region=${parcel.senderDistrict}&warehouse=${parcel.senderCenter}`
      );
      setSelectedParcel(parcel);
      setRiders(res.data);
      setShowModal(true);
    } catch (err) {
      Swal.fire("Error", "Failed to load rider list", "error");
    }
  };

  // const handleAssignRider = async (rider) => {
  //   try {
  //     await axiosSecure.put(`/assign-parcel/${selectedParcel._id}`, {
  //       riderId: rider._id,
  //       name: rider.name,
  //       email: rider.email,
  //       delevery_status: "in_transit",
  //     });
  //     Swal.fire("Success", "Parcel assigned successfully", "success");
  //     setShowModal(false);
  //     refetch();
  //   } catch (error) {
  //     Swal.fire("Error", "Failed to assign rider", "error");
  //   }
  // };
  // const handleAssignRider = async (rider) => {
  //   try {
  //     await axiosSecure.put(`/assign-parcel/${selectedParcel._id}`, {
  //       riderId: rider._id,
  //       riderName: rider.name,
  //       delivery_status: "in_transit",
  //     });

  //     Swal.fire("Success", "Parcel assigned and status updated!", "success");
  //     setShowModal(false);
  //     refetch();
  //   } catch (error) {
  //     console.error("Assign error:", error);
  //     Swal.fire("Error", "Failed to assign rider", "error");
  //   }
  // };
  const handleAssignRider = async (rider) => {
    try {
      await axiosSecure.put(`/assign-parcel/${selectedParcel._id}`, {
        riderId: rider._id,
        riderName: rider.name,
      });

      Swal.fire(
        "Success",
        "Parcel assigned and marked as in transit",
        "success"
      );
      setShowModal(false);
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to assign rider", "error");
      console.error(error);
    }
  };

  if (isLoading) return <LoddingPage />;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Type</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover">
                <td>{index + 1}</td>
                <td>{parcel.senderName}</td>
                <td className="capitalize">{parcel.type}</td>
                <td className="capitalize text-yellow-600">{parcel.status}</td>
                <td className="text-green-600 font-semibold">
                  {parcel.paymentStatus}
                </td>
                <td>
                  <button
                    onClick={() => openAssignModal(parcel)}
                    className="btn btn-success btn-sm flex items-center gap-2"
                  >
                    <FaCheckCircle /> Assign
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-5">
                  No parcels available to assign.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-5 relative">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-3">Available Riders</h3>
            {riders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider, i) => (
                      <tr key={rider._id}>
                        <td>{i + 1}</td>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>
                          <button
                            onClick={() => handleAssignRider(rider)}
                            className="btn btn-sm btn-primary"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-red-500">No riders found in this location.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
