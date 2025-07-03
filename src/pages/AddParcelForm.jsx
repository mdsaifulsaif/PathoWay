import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
// import warehouses from "../../data/warehouses.json";
import { AuthContext } from "./../contexts/AuthContext/AuthContext";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const AddParcelForm = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const warehouses = useLoaderData();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);

  const type = watch("type");
  const senderDivision = "Dhaka";
  const senderDistrict = watch("senderDistrict");
  const receiverDivision = "Dhaka";
  const receiverDistrict = watch("receiverDistrict");

  useEffect(() => {
    const filtered = warehouses
      .filter((w) => w.region === senderDivision)
      .map((w) => w.district);
    setSenderDistricts(filtered);
    setValue("senderDistrict", "");
    setSenderCenters([]);
  }, []);

  useEffect(() => {
    const match = warehouses.find(
      (w) => w.region === senderDivision && w.district === senderDistrict
    );
    setSenderCenters(match ? match.covered_area : []);
    setValue("senderCenter", "");
  }, [senderDistrict]);

  useEffect(() => {
    const filtered = warehouses
      .filter((w) => w.region === receiverDivision)
      .map((w) => w.district);
    setReceiverDistricts(filtered);
    setValue("receiverDistrict", "");
    setReceiverCenters([]);
  }, []);

  useEffect(() => {
    const match = warehouses.find(
      (w) => w.region === receiverDivision && w.district === receiverDistrict
    );
    setReceiverCenters(match ? match.covered_area : []);
    setValue("receiverCenter", "");
  }, [receiverDistrict]);

  const onSubmit = (data) => {
    const baseCost = data.type === "document" ? 50 : 100;
    const centerCost = data.senderCenter === data.receiverCenter ? 0 : 20;
    const weightCost = data.weight ? parseFloat(data.weight) * 10 : 0;
    const totalCost = baseCost + centerCost + weightCost;

    Swal.fire({
      title: `Delivery Cost: ৳${totalCost}`,
      text: "Do you want to confirm booking?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          userEmail: user?.email || "Guest",
          paymentStatus: "unpaid",
          status: "pending",
          creation_date: new Date().toISOString(),
          delivery_status: "pending",
        };
        axiosSecure
          .post("/parcels", parcelData)
          .then((res) => {})
          .catch((error) => {
            console.error("Error saving parcel:", error);
            Swal.fire(
              "Error!",
              "Failed to book parcel. Please try again.",
              "error"
            );
          });

        // reset();
        Swal.fire("Success!", "Parcel has been booked.", "success");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-[#CAEB66]">Add Parcel</h1>
      <p className="mb-6 text-gray-600">Enter your parcel details below</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded">
          <legend className="font-semibold">Parcel Info</legend>
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                value="document"
                {...register("type", { required: true })}
              />
              Document
            </label>
            <label>
              <input
                type="radio"
                value="non-document"
                {...register("type", { required: true })}
              />
              Non-Document
            </label>
          </div>
          <input
            type="text"
            placeholder="Parcel Title"
            {...register("title", { required: true })}
            className="input input-bordered w-full mb-2"
          />
          {type === "non-document" && (
            <input
              type="number"
              step="0.1"
              placeholder="Parcel Weight (KG)"
              {...register("weight")}
              className="input input-bordered w-full"
            />
          )}
        </fieldset>

        {/* Sender and Receiver Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold">Sender Info</legend>
            <input
              placeholder="Sender Name"
              defaultValue="Logged In User"
              {...register("senderName", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <input
              placeholder="Sender Contact"
              {...register("senderContact", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <select
              {...register("senderDistrict", { required: true })}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select District</option>
              {senderDistricts.map((dist) => (
                <option key={dist}>{dist}</option>
              ))}
            </select>
            <select
              {...register("senderCenter", { required: true })}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select Center</option>
              {senderCenters.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              placeholder="Sender Address"
              {...register("senderAddress", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <textarea
              placeholder="Pickup Instruction"
              {...register("pickupInstruction", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </fieldset>

          <fieldset className="border p-4 rounded">
            <legend className="font-semibold">Receiver Info</legend>
            <input
              placeholder="Receiver Name"
              {...register("receiverName", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <input
              placeholder="Receiver Contact"
              {...register("receiverContact", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <select
              {...register("receiverDistrict", { required: true })}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select District</option>
              {receiverDistricts.map((dist) => (
                <option key={dist}>{dist}</option>
              ))}
            </select>
            <select
              {...register("receiverCenter", { required: true })}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select Center</option>
              {receiverCenters.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              placeholder="Receiver Address"
              {...register("receiverAddress", { required: true })}
              className="input input-bordered w-full mb-2"
            />
            <textarea
              placeholder="Delivery Instruction"
              {...register("deliveryInstruction", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </fieldset>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          * Pickup Time: 4pm–7pm Approx.
        </p>

        <button
          type="submit"
          className="btn bg-[#CAEB66] text-gray-800 font-semibold w-full"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcelForm;
