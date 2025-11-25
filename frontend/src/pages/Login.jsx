import React from "react";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCustomer } from "../slices/Customerslice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: values.name,
        password: values.password,
      });

      setSubmitting(false);

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("username", response.data.username || values.name);
        localStorage.setItem("first_name", response.data.first_name || response.data.username || values.name);
        localStorage.setItem("email", response.data.email || "");
        toast.success(response.data.message);
        dispatch(addCustomer(response.data.username));
        
        const urlParams = new URLSearchParams(window.location.search);
        const nextParam = urlParams.get('next');
        let after = nextParam || localStorage.getItem('afterLoginRedirect');
        const shouldAutoPay = localStorage.getItem('shouldAutoPayAfterLogin');
        
        if (after) {
          if (after.includes('/address/') && !after.match(/^\/checkout/)) {
            console.warn('⚠️ Blocked redirect to broken address path, using /checkout instead:', after);
            after = '/checkout';
          }
          
          if (shouldAutoPay === 'true' && after === '/userprofile' || after === '/profile') {
            console.warn('⚠️ Blocked profile redirect during checkout flow, using /checkout instead');
            after = '/checkout';
          }
          
          if (shouldAutoPay === 'true' && !after.includes('/checkout')) {
            console.log('✅ Forcing /checkout for auto-pay flow');
            after = '/checkout';
          }
        }
        
        if (after) {
          localStorage.removeItem('afterLoginRedirect');
          if (shouldAutoPay === 'true') {
            console.log('✅ User logged in, will auto-trigger payment on checkout page');
          } else {
            localStorage.removeItem('shouldAutoPayAfterLogin');
          }
          console.log('🔄 Redirecting to:', after);
          navigate(after, { replace: true });
        } else {
          console.log('✅ Login successful, redirecting to home');
          localStorage.removeItem('shouldAutoPayAfterLogin');
          navigate("/", { replace: true });
        }
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: "url('/home/Login Page Banner (1280x720Pxl.) (1).png')"
      }}
    >
      {/* Login Form Container - Responsive sizing */}
      <div className="relative z-10 bg-transparent backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[95%] sm:max-w-md md:max-w-lg">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">Login</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 px-2">Track your order, create wishlist & more</p>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Username */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="User Name"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-xs text-red-500 mt-1 ml-1"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-xs text-red-500 mt-1 ml-1"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold hover:from-orange-600 hover:to-orange-500 transform hover:scale-[1.02] transition-all shadow-xl hover:shadow-2xl uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "LOGIN"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Register Link */}
        <p className="text-center text-xs sm:text-sm text-gray-700 mt-5 sm:mt-6 font-medium px-2">
          New to SRI Furniture Village?{" "}
          <Link to="/register" className="text-orange-500 hover:text-orange-600 font-bold cursor-pointer">
            Register Here
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-5 sm:my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-white/85 text-gray-600 font-medium">OR Continue With</span>
          </div>
        </div>

        {/* Social Login Button */}
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={() => {
              const base = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
              const url = (base ? base.replace(/\/$/, '') : '') + '/api/auth/google';
              window.location.href = url;
            }}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-md hover:shadow-xl transform hover:scale-110"
            aria-label="Continue with Google"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-orange-500 text-xl sm:text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;