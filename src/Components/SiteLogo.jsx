import React from "react";
import logo from "../assets/logo.png"; // Adjust the path as necessary

function SiteLogo() {
  return (
    <div>
      <a className="btn btn-ghost text-xl">
        <div className="flex items-center ">
          <img className="mb-3" src={logo} alt="" />
          <p className="-ml-3 text-gray-800 font-bold">PathoWay</p>
        </div>
      </a>
    </div>
  );
}

export default SiteLogo;
