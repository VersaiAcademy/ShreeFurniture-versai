import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { validateName, validateEmail, validatePhone, validateRequired } from "../utils/validation";

const Contactus = () => {
  const [btnval, setBtnval] = useState("Submit Your Request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setValues((prev) => {
      return { ...prev, [name]: val };
    });
  };

  // Validate contact form
  const validateContactForm = () => {
    const newErrors = {};
    
    // Validate name
    const nameValidation = validateName(values.name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    }
    
    // Validate email
    const emailValidation = validateEmail(values.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.message;
    }
    
    // Validate mobile
    const phoneValidation = validatePhone(values.mob);
    if (!phoneValidation.valid) {
      newErrors.mob = phoneValidation.message;
    }
    
    // Validate reason
    const reasonValidation = validateRequired(values.reason, 'Reason');
    if (!reasonValidation.valid) {
      newErrors.reason = reasonValidation.message;
    }
    
    // Validate message
    const messageValidation = validateRequired(values.message, 'Message');
    if (!messageValidation.valid) {
      newErrors.message = messageValidation.message;
    } else if (messageValidation.value.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateContactForm()) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setBtnval("Submitting Your Request...");

    try {
      // Clean and format data
      const nameValidation = validateName(values.name);
      const emailValidation = validateEmail(values.email);
      const phoneValidation = validatePhone(values.mob);
      
      const formData = new FormData();
      formData.append('name', nameValidation.value);
      formData.append('email', emailValidation.value);
      formData.append('mob', phoneValidation.value);
      formData.append('reason', values.reason.trim());
      formData.append('message', values.message.trim());
      
      // Only append image if file is selected
      const imgFile = e.target.img?.files?.[0];
      if (imgFile) {
        formData.append('img', imgFile);
      }

      const response = await API.post("/api/contact/contactus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form on success
      setValues({
        name: "",
        email: "",
        mob: "",
        reason: "",
        img: "",
        message: "",
      });
      setErrors({});
      
      // Reset file input
      if (e.target.img) {
        e.target.img.value = '';
      }

      if (response.status === 201) {
        toast.success(response.data.message || "Request submitted successfully! We will contact you soon.");
      } else {
        toast.warning(response.data.message || "Request submitted, but there was an issue.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      
      // Handle validation errors from backend
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          if (err.param) {
            backendErrors[err.param] = err.msg || err.message;
          }
        });
        setErrors(backendErrors);
        toast.error("Please fix the validation errors");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setBtnval("Submit Your Request");
      setIsSubmitting(false);
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
                Name *
              </label>
              <div className="md:col-span-2">
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  name="name"
                  value={values.name}
                  onChange={handleOnChange}
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Email *
              </label>
              <div className="md:col-span-2">
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  name="email"
                  value={values.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Mobile No *
              </label>
              <div className="md:col-span-2">
                <input
                  type="tel"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.mob ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  name="mob"
                  value={values.mob}
                  onChange={handleOnChange}
                  placeholder="Enter your mobile number (10 digits)"
                  maxLength={10}
                  required
                />
                {errors.mob && <p className="text-red-500 text-xs mt-1">{errors.mob}</p>}
              </div>
            </div>

            {/* Reason Field */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <label className="text-gray-700 font-medium text-left md:text-right">
                Reason *
              </label>
              <div className="md:col-span-2">
                <select
                  name="reason"
                  onChange={handleOnChange}
                  value={values.reason}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.reason ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white cursor-pointer`}
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
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>
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
                Message *
              </label>
              <div className="md:col-span-2">
                <textarea
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none`}
                  name="message"
                  onChange={handleOnChange}
                  placeholder="Enter your message here... (minimum 10 characters)"
                  value={values.message}
                  rows="4"
                  required
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start md:justify-start md:ml-[33.333333%]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
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