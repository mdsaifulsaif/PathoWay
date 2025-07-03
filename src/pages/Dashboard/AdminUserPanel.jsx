import React, { useEffect, useState } from "react";
// your axios baseURL instance
import Swal from "sweetalert2";
import UseAxiosSecure from "./../../Hooks/UseAxiosSecure";

const AdminUserPanel = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  // Toggle role
  //   const toggleRole = async (id, currentRole) => {
  //     const newRole = currentRole === "admin" ? "user" : "admin";

  //     try {
  //       const res = await axiosSecure.patch(`/users/${id}/role`, {
  //         role: newRole,
  //       });

  //       if (res.data.modifiedCount > 0) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Role Updated",
  //           text: `User role changed to ${newRole}`,
  //         });

  //         // update UI
  //         setUsers((prev) =>
  //           prev.map((user) =>
  //             user._id === id ? { ...user, role: newRole } : user
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error updating role", error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to update role.",
  //       });
  //     }
  //   };

  const toggleRole = async (id, currentRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/role`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${res.data.newRole}`,
        });

        // update UI
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: res.data.newRole } : user
          )
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update role.",
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">👤 User Management</h2>

      <input
        type="text"
        placeholder="Search by email..."
        className="input input-bordered mb-4 w-full md:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.create_at).toLocaleString()}</td>
                  <td>{new Date(user.last_login).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => toggleRole(user._id, user.role)}
                      className={`px-3 py-1 rounded text-white ${
                        user.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Make {user.role === "admin" ? "User" : "Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUserPanel;
