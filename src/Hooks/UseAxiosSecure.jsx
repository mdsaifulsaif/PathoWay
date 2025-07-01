import axios from "axios";
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
});

function UseAxiosSecure() {
  const { user } = use(AuthContext);

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axiosSecure;
}

export default UseAxiosSecure;
