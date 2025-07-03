import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role?email=${user.email}`)
        .then((res) => {
          setRole(res.data.role || "user"); // default to "user"
        })
        .catch((err) => {
          console.error("Failed to fetch user role", err);
          setRole("user");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setRole(null);
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  return [role, loading];
};

export default useUserRole;
