import React, { useEffect, useState, useContext } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure"; // your axios base URL hook
// import { AuthContext } from "../../authProvider/authProvider"; // adjust path if needed

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`) // optional if admin: `/payments`
        .then((res) => setPaymentHistory(res.data))
        .catch((err) => console.error("Error loading payment history:", err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="table w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td className="text-sm text-blue-700">
                  {payment.transactionId}
                </td>
                <td>${payment.amount}</td>
                <td>
                  <span className="text-green-600 font-medium">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {paymentHistory.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
