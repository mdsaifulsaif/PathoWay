import React from "react";
import logo from "../assets/logo.png"; // Assuming you have a logo image

function Navber() {
  const menuItems = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Parent</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div className="navbar bg-white rounded-xl mb-5 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {/* mobile menu  */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          ></ul>
        </div>
        <div>
          <a className="btn btn-ghost text-xl">
            <div className="flex items-center ">
              <img className="mb-3" src={logo} alt="" />
              <p className="-ml-3 text-gray-800 font-bold">PathoWay</p>
            </div>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn mr-2 text-gray-700 bg-white border-2 border-gray-600">
          Sign In
        </a>
        <a className="btn text-gray-900 bg-[#CAEB66]">Be a rider</a>
      </div>
    </div>
  );
}

export default Navber;
