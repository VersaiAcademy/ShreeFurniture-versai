import { faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    landmark: '',
  });
  const navigate = useNavigate();
  const customername = useSelector((state) => state.customer);
  const [value, setvalue] = useState("confirmed");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Check auth only once on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    
    if (!token || !id) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  // Load address form with existing data
  useEffect(() => {
    if (address) {
      setAddressForm({
        address_line1: address.address || '',
        address_line2: address.area || '',
        city: address.city || '',
        state: address.state || '',
        zip: address.postalcode || '',
        phone: address.mob1 || '',
        landmark: address.landmark || '',
      });
    }
  }, [address]);

  // Fetch user data whenever value changes or component mounts
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // Fetch user info
        const userResp = await axios.get(`/api/auth/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserInfo(userResp.data.user || null);

        // Fetch address (if any)
        try {
          const addrResp = await axios.get(`/api/address/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setAddress(addrResp.data || null);
        } catch (err) {
          // address may not exist yet
          setAddress(null);
        }

        // Fetch orders and filter by status value
        const ordersResp = await axios.get(`/api/orders/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const newdata = (ordersResp.data || []).filter((item) => item.status === value);
        setData(newdata);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [value, isAuthenticated]);

  const handleOnclick = (val) => {
    try {
      setvalue(val);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/orders/${id}/cancel`,
        { reason: "User requested cancellation" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      toast.warning(response.data.message || "Order cancelled");
      setvalue("confirmed");
    } catch (error) {
      console.log(error);
      toast.error("Unable to cancel order");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("id");
      const response = await axios.put(
        `/api/users/${userId}`,
        addressForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAddress(response.data.address || addressForm);
      setEditingAddress(false);
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-5 pb-5 px-4 md:px-14">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-72 bg-white shadow-lg rounded-lg p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-400">
                  {userInfo?.first_name ? userInfo.first_name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold">{userInfo?.first_name} {userInfo?.last_name}</h2>
                  <p className="text-sm text-gray-500">{userInfo?.email}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-3 py-2 rounded-md ${activeTab === "orders" ? "bg-orange-100 text-orange-500" : "text-gray-700 hover:bg-gray-50"}`}>
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("address")}
                  className={`w-full text-left px-3 py-2 rounded-md mt-2 ${activeTab === "address" ? "bg-orange-100 text-orange-500" : "text-gray-700 hover:bg-gray-50"}`}>
                  Address
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-3 py-2 rounded-md mt-2 ${activeTab === "profile" ? "bg-orange-100 text-orange-500" : "text-gray-700 hover:bg-gray-50"}`}>
                  Account
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "orders" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
                  <div className="flex flex-col gap-4">
                    {loading ? (
                      <div className="text-gray-500">Loading orders...</div>
                    ) : data.length === 0 ? (
                      <div className="text-gray-500">No orders found for selected filter.</div>
                    ) : (
                      data.map((d) => (
                        <div key={d._id} className="border rounded-md p-4 flex flex-col md:flex-row justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-400">Order #{d._id}</div>
                            <div className="font-semibold">{d.products?.length || 0} items</div>
                            <div className="text-gray-600">Status: <span className="capitalize">{d.status}</span></div>
                          </div>
                          <div className="mt-3 md:mt-0">
                            <Link to={`/detailorder/${d._id}`} className="px-3 py-1 bg-orange-500 text-white rounded-md mr-2">View</Link>
                            {d.status !== "cancel" && d.status !== "delivered" && (
                              <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md" onClick={() => deleteItem(d._id)}>Cancel</button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "address" && (
                <div className="bg-white shadow-md rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Saved Address</h3>
                    <button
                      onClick={() => setEditingAddress(!editingAddress)}
                      className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    >
                      {editingAddress ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {editingAddress ? (
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="address_line1"
                          placeholder="Address Line 1 *"
                          value={addressForm.address_line1}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="text"
                          name="address_line2"
                          placeholder="Area / Locality"
                          value={addressForm.address_line2}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="text"
                          name="city"
                          placeholder="City *"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State *"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="text"
                          name="zip"
                          placeholder="Zip Code (5-6 digits) *"
                          value={addressForm.zip}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number (10 digits) *"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                          required
                        />
                        <input
                          type="text"
                          name="landmark"
                          placeholder="Landmark (Optional)"
                          value={addressForm.landmark}
                          onChange={handleAddressChange}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 md:col-span-1"
                        />
                        <input
                          type="tel"
                          name="phone2"
                          placeholder="Alternate Phone (Optional)"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 md:col-span-1"
                          disabled
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {loading ? "Saving..." : "Save Address"}
                      </button>
                    </form>
                  ) : (
                    <>
                      {address ? (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                          <div className="text-gray-700">
                            <strong>Address:</strong> {address.address || 'N/A'}
                          </div>
                          <div className="text-gray-700">
                            <strong>Locality:</strong> {address.area || 'N/A'}
                          </div>
                          <div className="text-gray-700">
                            <strong>Landmark:</strong> {address.landmark || 'Not provided'}
                          </div>
                          <div className="text-gray-700">
                            <strong>City:</strong> {address.city || 'N/A'}
                          </div>
                          <div className="text-gray-700">
                            <strong>State:</strong> {address.state || 'N/A'}
                          </div>
                          <div className="text-gray-700">
                            <strong>Pin Code:</strong> {address.postalcode || 'N/A'}
                          </div>
                          <div className="text-gray-700">
                            <strong>Phone:</strong> {address.mob1 || 'N/A'}
                          </div>
                          {address.mob2 && (
                            <div className="text-gray-700">
                              <strong>Alternate Phone:</strong> {address.mob2}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-500">No address saved yet. Click Edit to add one.</div>
                      )}
                    </>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div className="bg-white shadow-md rounded-md p-4">
                  <h3 className="font-semibold mb-2">Account</h3>
                  <div className="text-gray-600">Name: {userInfo?.first_name} {userInfo?.last_name}</div>
                  <div className="text-gray-600">Email: {userInfo?.email}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
