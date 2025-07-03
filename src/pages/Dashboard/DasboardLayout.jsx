import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SiteLogo from "../../Components/SiteLogo";
// import useUserRole from "../../Hooks/useUserRole";
import {
  FaThList,
  FaBox,
  FaMoneyCheckAlt,
  FaMotorcycle,
  FaUserCheck,
  FaUserShield,
} from "react-icons/fa";
import LoddingPage from "../LoddingPage";
import useUserRole from "../../Hooks/useUserRole";

const DasboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [role, loading] = useUserRole();

  if (loading) {
    return <LoddingPage></LoddingPage>;
  }
  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}

      <div className="hidden md:block bg-gray-800 text-white w-64 p-4 space-y-4 min-h-screen">
        <div className="mb-6">
          <SiteLogo />
        </div>

        <NavLink
          to="/dashboard/myparcels"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaBox /> <span>Parcel</span>
        </NavLink>

        <NavLink
          to="/dashboard/paymenthistory"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaMoneyCheckAlt /> <span>Payment History</span>
        </NavLink>

        {role == "admin" && (
          <>
            {" "}
            <NavLink
              to="/dashboard/riders"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <FaMotorcycle /> <span>Riders</span>
            </NavLink>
            <NavLink
              to="/dashboard/assignriders"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <FaMotorcycle /> <span>AssignRiders</span>
            </NavLink>
            <NavLink
              to="/dashboard/activeriders"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <FaUserCheck /> <span>Active Riders</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin"
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
            >
              <FaUserShield /> <span>Admin</span>
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-20">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-gray-800"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-3/4 h-full p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/page1"
              onClick={() => setOpen(false)}
              className="block hover:bg-gray-200 p-2 rounded"
            >
              Page One
            </Link>
            <Link
              to="/myparcels"
              onClick={() => setOpen(false)}
              className="block hover:bg-gray-200 p-2 rounded"
            >
              Page Two
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 mt-12 md:mt-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DasboardLayout;
