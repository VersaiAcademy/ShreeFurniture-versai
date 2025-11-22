import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contactus = () => {
  const [btnval, setBtnval] = useState("Submit Your Request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    mob: "",
    reason: "",
    img: "",
    message: "",
  });

  const handleOnChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: val };
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setBtnval("Submitting Your Request...");

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('mob', values.mob);
      formData.append('reason', values.reason);
      formData.append('img', e.target.img.files[0]);
      formData.append('message', values.message);

      const response = await axios.post("/api/contact/contactus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setValues({
        name: "",
        email: "",
        mob: "",
        reason: "",
        img: "",
        message: "",
      });

      setBtnval("Submit Your Request");
      setIsSubmitting(false);

      if (response.status === 201) {
        toast.success(response.data.message || "Request submitted successfully!");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      setBtnval("Submit Your Request");
      setIsSubmitting(false);
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(to bottom, #fef3e2, #fde5c8)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-t-2xl shadow-lg p-8 text-center border-b-4 border-orange-500">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
            Want to raise a complaint or give a feedback?
          </h1>
          <p className="text-gray-600 text-sm">
            We appreciate your thoughts and are here to assist you anytime.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleOnSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Name Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Name
              </label>
              <input
                type="text"
                className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                name="name"
                value={values.name}
                onChange={handleOnChange}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Email
              </label>
              <input
                type="email"
                className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                name="email"
                value={values.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile Number Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Mobile No
              </label>
              <input
                type="tel"
                className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                name="mob"
                value={values.mob}
                onChange={handleOnChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>

            {/* Reason Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Reason
              </label>
              <select
                name="reason"
                onChange={handleOnChange}
                value={values.reason}
                className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white cursor-pointer"
                required
              >
                <option value="">-- Select Reason --</option>
                <option value="website feedback">Website Feedback</option>
                <option value="Order Related Query">Order Related Query</option>
                <option value="Product Query">Product Query</option>
                <option value="Delivery Issue">Delivery Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Upload File Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Upload File
              </label>
              <div className="md:col-span-2">
                <label className="flex items-center justify-center w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm mr-3">
                    Choose File
                  </span>
                  <span className="text-gray-500 text-sm">
                    {values.img ? values.img.split('\\').pop() : 'No File Chosen'}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => {
                      handleOnChange(e);
                      if (e.target.files[0]) {
                        setValues(prev => ({ ...prev, img: e.target.value }));
                      }
                    }}
                    className="hidden"
                    name="img"
                  />
                </label>
              </div>
            </div>

            {/* Message Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <label className="text-gray-700 font-medium text-left md:text-right pt-3">
                Message
              </label>
              <textarea
                className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                name="message"
                onChange={handleOnChange}
                placeholder="Enter your message here..."
                value={values.message}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start md:justify-start md:ml-[33.333333%]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {btnval}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;