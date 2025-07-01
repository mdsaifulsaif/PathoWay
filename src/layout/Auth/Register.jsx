import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import loginimg from "../../assets/authImage.png";
import SiteLogo from "../../Components/SiteLogo";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

function Register() {
  const navetage = useNavigate();
  const { createUser, updateUser, user, googleLogin } = use(AuthContext);
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;
  const handlePhoto = async (e) => {
    // console.log(e.target.photo);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );
      const url = res.data.data.display_url;
      setImageURL(url);
      console.log("Uploaded image:", url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
    // console.log("chandd", image);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   const email = data.email;
  //   const password = data.password;

  //   createUser(email, password)
  //     .then(async (res) => {
  //       console.log(res.user);
  //       //  update profile
  //       const userProfileData = {
  //         displayName: data.name,
  //         photoURL: imageURL,
  //       };

  //       updateUser(userProfileData)
  //         .then(() => {})
  //         .catch((error) => {
  //           console.log("userupdate ", error);
  //         });

  //       //send user data to server

  //       const userInfo = {
  //         email: user.email,
  //         crate_at: new Date().toISOString(),
  //         role: "user",
  //         last_login: new Date().toISOString(),
  //       };
  //       const userRes = await axios.post(
  //         "http://localhost:3000/users",
  //         userInfo
  //       );

  //       if (res.user) {
  //         Swal.fire({
  //           title: "User Create Successfully!",
  //           icon: "success",
  //           draggable: true,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         title: "Somthis is missing!",
  //         text: "Welcome back!",
  //         icon: "error",
  //         confirmButtonText: "Continue",
  //       });
  //     });
  // };
  const onSubmit = async (data) => {
    try {
      const email = data.email;
      const password = data.password;

      const res = await createUser(email, password);
      const newUser = res.user;

      // Update profile
      const userProfileData = {
        displayName: data.name,
        photoURL: imageURL,
      };
      await updateUser(userProfileData);

      // Send user data to server
      const userInfo = {
        email: newUser.email, // ✅ fixed
        created_at: new Date().toISOString(),
        role: "user",
        last_login: new Date().toISOString(),
      };

      const userRes = await axios.post("http://localhost:3000/users", userInfo);

      if (userRes.data.insertedId || userRes.data.acknowledged) {
        Swal.fire({
          title: "User Created Successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Something went wrong!",
        text: error.message || "Please try again.",
        icon: "error",
      });
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (res) => {
        const userInfo = {
          email: res.user.email,
          crate_at: new Date().toISOString(),
          role: "user",
          last_login: new Date().toISOString(),
        };
        const userRes = await axios.post(
          "http://localhost:3000/users",
          userInfo
        );

        console.log(userRes);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("click gool icon");
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
              {/* Photo */}
              <div>
                <label className="label">Upload Photo</label>
                <input
                  onChange={handlePhoto}
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="file-input file-input-bordered w-full mb-3"
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
            </fieldset>
          </form>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white text-black border border-[#e5e5e5] hover:bg-gray-100"
          >
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
