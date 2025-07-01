import React, { use } from "react";
import { useForm } from "react-hook-form";
import { FaMotorcycle } from "react-icons/fa";
import warehouseData from "../../assets/warehouses.json"; // adjust path
import riderImg from "../../assets/agent-pending.png";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const BeaRider = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("riderdata", data);
    try {
      const response = await axiosSecure.post("/riders", data);
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Rider Request Successfully Send !",
          text: "Your request to become a rider has been submitted.",
          confirmButtonColor: "#22c55e", // Tailwind green-500
        });
      }

      // Optional: toast or alert here
      //   reset();
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong!";

      //  Rider already exists
      if (status === 409) {
        Swal.fire({
          icon: "error",
          title: "Already Submitted!",
          text: message, // "Rider already exists"
          confirmButtonColor: "#ef4444", // Tailwind red-500
        });
      } else {
        //  Generic error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  const selectedRegion = watch("region");
  const filteredWarehouses =
    warehouseData.find((item) => item.region === selectedRegion)
      ?.covered_area || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Be a Rider</h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments – we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 shadow-md rounded-xl border"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Tell us about yourself
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={user?.displayName || ""}
                readOnly
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <input
                type="number"
                placeholder="Your Age"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Minimum age is 18" },
                })}
                className="input input-bordered w-full"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                value={user?.email}
                readOnly
                placeholder="Your Email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Bike Number */}
            <div>
              <input
                type="number"
                placeholder="Your bike number"
                {...register("bikeNumber", {
                  required: "Bike Number is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bike.message}
                </p>
              )}
            </div>

            {/* Region */}
            <div>
              <select
                {...register("region", { required: "Region is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {warehouseData.map((item, idx) => (
                  <option key={idx} value={item.region}>
                    {item.region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            {/* NID */}
            <div>
              <input
                type="text"
                placeholder="NID No"
                {...register("nid", {
                  required: "NID is required",
                  minLength: {
                    value: 10,
                    message: "NID must be at least 10 digits",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nid.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <input
                type="text"
                placeholder="Contact"
                {...register("contact", {
                  required: "Contact number is required",
                  minLength: {
                    value: 10,
                    message: "Enter a valid phone number",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Warehouse */}
            <div className="md:col-span-2">
              <select
                {...register("warehouse", {
                  required: "Warehouse is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select warehouse</option>
                {filteredWarehouses.map((wh, idx) => (
                  <option key={idx} value={wh}>
                    {wh}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.warehouse.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 bg-lime-400 text-white font-semibold py-2 px-4 rounded hover:bg-lime-500 transition-all w-full"
          >
            Submit
          </button>
        </form>

        {/* Image / Illustration */}
        <div className="flex justify-center">
          <img src={riderImg} alt="Rider" className="max-w-xs md:max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default BeaRider;
