import React from "react";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import { Link } from "react-router";

function SiteLogo() {
  return (
    <div>
      <Link to="/" className="btn btn-ghost text-xl">
        <div className="flex items-center ">
          <img className="mb-3" src={logo} alt="" />
          <p className="-ml-3 text-gray-800 font-bold">PathoWay</p>
        </div>
      </Link>
    </div>
  );
}

export default SiteLogo;
