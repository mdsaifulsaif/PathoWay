import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import LoddingPage from "../../LoddingPage";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

function PaymentForm({ id }) {
  const { user } = use(AuthContext);
  const parcelId = id;
  const axiosSecure = UseAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["pparcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pparcel/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoddingPage></LoddingPage>;
  }

  const amount = parcelInfo?.cost;
  const amountInCents = amount * 100; // Convert to cents for Stripe

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error:", error);
      setError(error.message);
    } else {
      setError("");
      console.log("Payment method created:", paymentMethod);
    }

    //create payment
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });
    // console.log("res from instent", res);

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setError("");
        // console.log("Payment succeeded!");
        // console.log(result);
        // ceate payment history
        const paymentData = {
          parcelId,
          transactionId: result.paymentIntent.id,
          amount,
          userEmail: user.email,
        };

        // set data to backent
        const paymentRes = await axiosSecure.post(
          "/payment-success",
          paymentData
        );

        if (paymentRes) {
          Swal.fire({
            title: "Payment Successful!",
            text: "Your payment has been processed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Card Info</span>
          <CardElement className="border p-2 rounded mt-2" />
        </label>
        <button
          type="submit"
          disabled={!stripe}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay ${amount} for Parcel
        </button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </form>
    </div>
  );
}

export default PaymentForm;
