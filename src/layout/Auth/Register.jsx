import React, { use } from "react";
import { useForm } from "react-hook-form";
import loginimg from "../../assets/authImage.png";
import SiteLogo from "../../Components/SiteLogo";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

function Register() {
  const { createUser } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Logo & Register Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <SiteLogo />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
            Create Account
          </h1>
          <p className="text-lg font-semibold text-gray-600 mb-6">
            Register to Profast
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Full Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
              </div>

              {/* Submit */}
              <button className="btn bg-[#CAEB66] w-full">Register</button>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-hover font-semibold text-[#CAEB66]"
                >
                  Login
                </Link>
              </p>

              <div className="divider">Or</div>

              {/* Google Button */}
              <button className="btn w-full bg-white text-black border border-[#e5e5e5] hover:bg-gray-100">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mr-2"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Register with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 bg-[#FAFDF0] flex items-center justify-center h-64 md:h-auto">
        <img
          src={loginimg}
          alt="Register Visual"
          className="object-contain w-4/5 h-auto max-h-full"
        />
      </div>
    </div>
  );
}

export default Register;
