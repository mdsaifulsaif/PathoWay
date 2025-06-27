import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
const stripePromise = loadStripe(import.meta.env.VITE_STIPE_PK);

function Payments() {
  const { id } = useParams();
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm id={id}></PaymentForm>
    </Elements>
  );
}

export default Payments;
