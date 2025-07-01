import React, { use } from "react";
import SiteLogo from "./SiteLogo";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Link } from "react-router";

function Navber() {
  const { user, logoutUser } = use(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/coverage">Coverage</Link>
      </li>
      <li>
        <Link to="/addparcel">Add Percel</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
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
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <button
            onClick={handleLogout}
            className="btn mr-2 text-gray-700 bg-white border-2 border-gray-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn mr-2 text-gray-700 bg-white border-2 border-gray-600"
          >
            Sign In
          </Link>
        )}

        <Link className="bg-lime-300 btn mr-2 text-white" to="/bearider">
          Be a Rider
        </Link>
      </div>
    </div>
  );
}

export default Navber;
