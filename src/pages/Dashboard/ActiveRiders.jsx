import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const {
    isPending,
    refetch,
    error,
    data: riders = [],
  } = useQuery({
    queryKey: ["acctiveriders"],
    queryFn: async () => {
      const res = await axiosSecure("/acceptriders");
      return res.data;
    },
  });

  const handleView = (id) => {
    console.log(id);
    navigate(`/dashboard/riderdetails/${id}`);
    // Swal.fire({
    //   title: rider.fullName,
    //   html: `
    //     <p><strong>Email:</strong> ${rider.emailAddress}</p>
    //     <p><strong>Phone:</strong> ${rider.phone}</p>
    //     <p><strong>NID:</strong> ${rider.nid}</p>
    //     <p><strong>Bike No:</strong> ${rider.bikeNumber}</p>
    //     <p><strong>Address:</strong> ${rider.address}</p>
    //   `,
    //   icon: "info",
    // });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the rider.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/riders/${id}`);
        refetch();

        Swal.fire("Deleted!", "Rider has been removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete rider.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
        Active Riders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Bike No</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{rider.name}</td>
                <td className="py-2 px-4">{rider.email}</td>
                <td className="py-2 px-4">{rider.contact}</td>
                <td className="py-2 px-4">{rider.bikeNumber}</td>
                <td className="py-2 px-4 flex gap-3">
                  <button
                    onClick={() => handleView(rider._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
