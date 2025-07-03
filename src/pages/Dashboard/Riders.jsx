import React, { use } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTrash, FaEye } from "react-icons/fa";
import LoddingPage from "./../LoddingPage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

function Riders() {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const {
    isPending,
    refetch,
    error,
    data: riders = [],
  } = useQuery({
    queryKey: ["ridersData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  //   handle actios

  const handleAccept = async (id) => {
    try {
      await axiosSecure.put(`/riders/${id}`, {
        status: "accepted",
        email: user.email,
      });

      Swal.fire("Success", "Rider has been accepted", "success");
      refetch();
    } catch (error) {
      console.error("Accept error:", error);
      Swal.fire("Error", "Failed to accept rider", "error");
    }
  };

  const handleView = (id) => {
    navigate(`/dashboard/riderdetails/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/riders/${id}`);
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Rider has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete rider.",
          icon: "error",
        });
      }
    }
  };

  if (isPending) {
    return <LoddingPage></LoddingPage>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Riders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">NID</th>
              <th className="py-2 px-4">Bike Number</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{rider.name}</td>
                <td className="py-2 px-4">{rider.email}</td>
                <td className="py-2 px-4">{rider.contact}</td>
                <td className="py-2 px-4">{rider.nid}</td>
                <td className="py-2 px-4">{rider.bikeNumber}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleAccept(rider._id)}
                    className="text-green-600 hover:text-green-800"
                    title="Accept"
                  >
                    <FaCheck />
                  </button>
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
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Riders;
