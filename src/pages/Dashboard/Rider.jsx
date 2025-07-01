import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UseAxiosSecure from "./../../Hooks/UseAxiosSecure";
import LoddingPage from "../LoddingPage";

const Rider = () => {
  const { id } = useParams(); // Get ID from URL

  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const axisSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchRider = async () => {
      try {
        const res = await axisSecure.get(`/riders/${id}`);
        setRider(res.data);
      } catch (error) {
        console.error("Failed to fetch rider", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRider();
  }, [id]);

  if (loading) return <LoddingPage></LoddingPage>;

  if (!rider)
    return <p className="text-center text-red-500 mt-10">Rider not found.</p>;

  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Rider Details
        </h2>
        <p>
          <span className="font-semibold">Full Name:</span> {rider.fullName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {rider.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {rider.contact}
        </p>
        <p>
          <span className="font-semibold">NID:</span> {rider.nid}
        </p>
        <p>
          <span className="font-semibold">Bike Number:</span> {rider.bikeNumber}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {rider.address}
        </p>
        <p>
          <span className="font-semibold">Registered At:</span>{" "}
          {new Date(rider.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Rider;
