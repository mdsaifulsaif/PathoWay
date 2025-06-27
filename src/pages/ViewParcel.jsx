// import React from "react";
// import { useParams } from "react-router"; // ✅ Make sure it's -dom not -router

// function ViewParcel() {
//   const { id } = useParams(); // ✅ Grab route param :id

//   return <div>Parcel ID: {id}</div>;
// }

// export default ViewParcel;

import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import LoddingPage from "./LoddingPage";
import ViewParcelCard from "../Components/ViewParcelCard";

function ViewParcel() {
  const { id } = useParams(); // 👈 get parcel ID from route
  const axiosSecure = UseAxiosSecure();

  const {
    data: parcel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcel", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoddingPage></LoddingPage>;
  if (isError) return <p className="text-red-500">⚠️ {error.message}</p>;

  return (
    <ViewParcelCard parcel={parcel}></ViewParcelCard>
  );
}

export default ViewParcel;
