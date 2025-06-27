import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

function MyPercel() {
  const { user } = useContext(AuthContext); // ✅ Fixed here
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email, // ✅ Prevent query until user is loaded
    queryFn: async () => {
      const res = await axiosSecure.get(`/myparcels?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>লোড হচ্ছে...</p>;
  if (isError) return <p className="text-red-500">⚠️ Error: {error.message}</p>;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel/${id}`).then((res) => {
          if (res.data.message === "Parcel deleted successfully") {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
      refetch();
    });
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📦 আমার পার্সেল সমূহ</h2>
      {parcels.length === 0 ? (
        <p>আপনার কোনো পার্সেল পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">#</th>
                <th className="text-left py-2 px-4 border-b">Title</th>
                <th className="text-left py-2 px-4 border-b">Sender</th>
                <th className="text-left py-2 px-4 border-b">Receiver</th>
                <th className="text-left py-2 px-4 border-b">Cost</th>
                <th className="text-left py-2 px-4 border-b">
                  Pickup District
                </th>
                <th className="text-left py-2 px-4 border-b">Payment</th>
                <th className="text-left py-2 px-4 border-b">Created</th>
                <th className="text-left py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id || index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{parcel.title}</td>
                  <td className="py-2 px-4 border-b">
                    {parcel.senderName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {parcel.senderContact}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {parcel.receiverName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {parcel.receiverContact}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{parcel.cost} ৳</td>
                  <td className="py-2 px-4 border-b">
                    {parcel.senderDistrict}
                  </td>

                  {/* Payment Status */}
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        parcel.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {parcel.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  {/* Creation Date */}
                  <td className="py-2 px-4 border-b">
                    {new Date(parcel.creation_date).toLocaleDateString(
                      "bn-BD",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-2 px-4 border-b space-x-2">
                    {/* Pay Button */}
                    {parcel.paymentStatus !== "paid" && (
                      <button
                        className="px-3 py-1 text-sm rounded text-black font-semibold"
                        style={{ backgroundColor: "#CAEB66" }}
                        onClick={() => handlePay(parcel._id)}
                      >
                        Pay
                      </button>
                    )}
                    {/* View Button */}
                    <Link
                      to={`/viewparcel/${parcel._id}`}
                      className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 font-medium"
                      //   onClick={() => handleView(parcel._id)}
                    >
                      View
                    </Link>
                    {/* Delete Button */}
                    <button
                      className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 font-medium"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyPercel;
