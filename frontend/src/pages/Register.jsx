import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [datas, Setdatas] = useState({
    name: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    let names = e.target.name;
    let val = e.target.value;
    Setdatas((prev) => {
      return { ...prev, [names]: val };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposnse = await axios.post(
        "/api/auth/signup",
        {
          name: datas.name,
          email: datas.email,
          password: datas.password,
          username: datas.name,
          first_name: datas.fname,
          last_name: datas.lname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Setdatas({ name: "", fname: "", lname: "", email: "", password: "" });

      console.log(resposnse.data.message);

      if (resposnse.data.status === 201) {
        toast.success(resposnse.data.message);
        if (resposnse.data.token) {
          localStorage.setItem('token', resposnse.data.token);
          localStorage.setItem('id', resposnse.data.user?.id || '');
          window.location.href = '/';
        }
      } else {
        toast.warning(resposnse.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMsg = error.response.data.errors.map(e => e.msg).join(', ');
        toast.error(errorMsg);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/home/Login Page Banner (1280x720Pxl.) (2) (1).png')"
      }}
    >
      {/* Semi-transparent overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div> */}
      
      {/* Register Form Container */}
      <div className="relative z-10 bg-transparent backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-Black mb-2">Register</h2>
          <p className="text-sm sm:text-base text-gray-900">Get exclusive discounts, newsletters and more</p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <input
              type="text"
              name="name"
              id="username-field"
              value={datas.name}
              placeholder="User Name"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
              required
              minLength={3}
              onChange={handleOnChange}
            />
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fname"
              value={datas.fname}
              placeholder="First Name"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
              required
              minLength={3}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="lname"
              value={datas.lname}
              placeholder="Last Name"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
              required
              minLength={3}
              onChange={handleOnChange}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              id="email-field"
              value={datas.email}
              placeholder="Email"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
              required
              minLength={5}
              onChange={handleOnChange}
            />
          </div>

          {/* Password with Help Icon */}
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password-field"
              value={datas.password}
              placeholder="Password"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500 pr-14"
              required
              minLength={5}
              onChange={handleOnChange}
            />
            <button
              type="button"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-xl hover:text-orange-600 transition-colors"
              title="Password can contain alphabets, numbers and underscore. It should contain a minimum of 8 and a maximum of 12 characters."
            >
              ?
            </button>
          </div>

          {/* Terms & Conditions */}
          <p className="text-xs text-center text-gray-700 px-2 leading-relaxed">
            By continuing, I agree to the{" "}
            <span className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer">
              Terms of Use
            </span>
            {" "}&{" "}
            <span className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer">
              Privacy Policy
            </span>
          </p>

          {/* Register Button */}
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base hover:from-orange-600 hover:to-orange-500 transform hover:scale-[1.02] transition-all shadow-xl hover:shadow-2xl uppercase tracking-wide"
          >
            REGISTER
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-700 mt-6 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-600 font-bold cursor-pointer">
            Sign in
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/85 text-gray-600 font-medium">OR Continue With</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-5">
          <button 
            type="button"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-md hover:shadow-xl transform hover:scale-110"
            aria-label="Continue with Google"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-orange-500 text-2xl" />
          </button>
          
          <button 
            type="button"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-md hover:shadow-xl transform hover:scale-110"
            aria-label="Continue with Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;