import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitPublicOrder } from "../utils/api";

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  company: "",
  requirementType: "Hotel Furniture",
  quantity: "",
  address: "",
  message: ""
};

export default function BulkOrder() {
  const [values, setValues] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["fullName", "email", "phone", "pinCode", "city", "address"];
    const missing = requiredFields.filter((field) => !values[field].trim());
    if (missing.length) {
      toast.error(`Please fill ${missing.join(", ")}`);
      return;
    }

    try {
      setSubmitting(true);
      await submitPublicOrder({
        formType: "bulk",
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.company || "Business",
        pincode: values.pinCode,
        productName: `${values.requirementType} (${values.quantity || "qty TBD"})`,
        productId: values.requirementType,
        productPrice: 0,
        paymentStatus: "pending",
        paymentMode: "na",
        notes: values.message || "Bulk order enquiry",
        meta: { company: values.company, requirementType: values.requirementType, quantity: values.quantity }
      });
      toast.success("Bulk order enquiry submitted. Our team will contact you shortly.");
      setValues(defaultValues);
    } catch (err) {
      toast.error(err.message || "Unable to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Bulk Order / Corporate Order
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Need high-quality furniture in bulk for hotels, offices, restaurants, or projects?
          We offer special pricing, customization & fast delivery for large orders.
        </p>

        <div className="bg-white shadow-md rounded-xl p-6 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company / Business Name</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Pin Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={values.pinCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Postal code"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="City"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Complete Address *</label>
              <textarea
                rows="3"
                name="address"
                value={values.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Street, building, landmark"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Requirement Type</label>
                <select
                  name="requirementType"
                  value={values.requirementType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option>Hotel Furniture</option>
                  <option>Office Furniture</option>
                  <option>Restaurant Furniture</option>
                  <option>Home Furniture</option>
                  <option>Custom Furniture</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Approx Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Ex: 20, 50, 100..."
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Requirement Details</label>
              <textarea
                rows="5"
                name="message"
                value={values.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Describe your bulk order requirement..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg text-lg transition-all"
            >
              {submitting ? "Submitting..." : "Submit Bulk Order Request"}
            </button>
          </form>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700 text-lg">For urgent queries, contact:</p>
          <p className="text-xl font-bold text-orange-600 mt-1">
            +91 96607 88625
          </p>
          <p className="mt-1 text-gray-600">We’re available on WhatsApp too.</p>
        </div>
      </div>
    </div>
  );
}
