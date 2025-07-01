import React from "react";
import { Outlet } from "react-router";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";

function Rootlayout() {
  return (
    <div className="w-11/12  mx-auto py-5">
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default Rootlayout;
