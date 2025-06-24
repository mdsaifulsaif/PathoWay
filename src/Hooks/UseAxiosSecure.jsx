import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
function UseAxiosSecure() {
  return axiosSecure;
}

export default UseAxiosSecure;
