import { Link, Outlet } from "react-router";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SiteLogo from "../../Components/SiteLogo";

const DasboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-gray-600 text-white w-64 p-4 space-y-4">
        <div className="text-white">
          <SiteLogo></SiteLogo>
        </div>
        <Link
          to="/dashboard/alldata"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          All Data
        </Link>
        <Link
          to="/dashboard/myparcels"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          Parcel
        </Link>
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
