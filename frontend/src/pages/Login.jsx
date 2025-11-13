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
        // Redirect to profile page after successful login
        navigate("/profile");
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
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="border shadow-lg hover:shadow-2xl bg-white rounded-lg w-full max-w-4xl">
        <div className="flex items-center gap-5 flex-col md:flex-row md:p-0">
          <div className="w-full md:w-1/3">
            <img
              src="/images/login-bg.jpg"
              alt=""
              className="object-cover w-full h-40 md:h-[35rem] md:w-full rounded-t-lg md:rounded-none"
            />
          </div>
          <div className="font-mono w-full md:w-2/3 p-6">
            <h2 className="text-xl md:text-2xl">Login</h2>
            <small>Track your order, create wishlist & more</small>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="pt-3 flex flex-col justify-between items-center pr-2 w-full">
                  <Field
                    type="text"
                    name="name"
                    placeholder="User Name"
                    className="w-full md:w-80 rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="error text-xs text-red-500"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full md:w-80 rounded-md mt-5 mr-1 px-3 py-2"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="error text-xs text-red-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-2 rounded-lg text-white bg-gradient-to-r mt-5 from-orange-500 to-orange-300 w-full md:w-60 h-10 hover:bg-gradient-to-r hover:from-orange-300 hover:to-orange-500"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            <p className="pt-3 pb-3 text-base text-center">
              New to SRI Furniture Village?{" "}
              <Link to="/register" className="text-orange-400 cursor-pointer">
                Register Here
              </Link>{" "}
            </p>
            <hr />
            <p className="text-center pt-3 text-gray-500 items-center">
              OR Continue With{" "}
              <span className="text-orange-300 hover:text-orange-700 text-xl cursor-pointer">
                <FontAwesomeIcon icon={faGoogle} />
              </span>{" "}
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-400 cursor-pointer text-xl hover:text-blue-600"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
