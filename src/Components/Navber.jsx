import React, { use } from "react";
import SiteLogo from "./SiteLogo";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Link } from "react-router";

function Navber() {
  const { user } = use(AuthContext);

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/coverage">Coverage</Link>
      </li>
      <li>
        <a>{user?.email}</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-white text-gray-800 rounded-xl mb-5 shadow-sm">
      <div className="navbar-start">
        <SiteLogo></SiteLogo>
        {/* <div>
          <a className="btn btn-ghost text-xl">
            <div className="flex items-center ">
              <img className="mb-3" src={logo} alt="" />
              <p className="-ml-3 text-gray-800 font-bold">PathoWay</p>
            </div>
          </a>
        </div> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn mr-2 text-gray-700 bg-white border-2 border-gray-600"
        >
          Sign In
        </Link>
        <a className="btn text-gray-900 bg-[#CAEB66]">Be a rider</a>
      </div>
    </div>
  );
}

export default Navber;
