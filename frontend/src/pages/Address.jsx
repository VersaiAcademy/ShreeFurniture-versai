import { faBuyNLarge } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import API from '../utils/api';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "../components/Notification";
import useRazorpay from "react-razorpay";
import { validatePhone, validatePincode, validateName, validateAddress, validateRequired } from "../utils/validation";

const Address = () => {
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const { totaloffer, totalprice, todaydeal } = useParams();
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(null);
  const [paymentmethod, setPaymentmethod] = useState("cod");
  const [data, Setdata] = useState({
    id: "",
    mob1: "",
    mob2: "",
    postalcode: "",
    society: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Check if should auto-trigger payment after login
  useEffect(() => {
    const shouldAutoPay = localStorage.getItem('shouldAutoPayAfterLogin');
    if (shouldAutoPay === 'true') {
      const token = localStorage.getItem("token");
      if (token) {
        console.log('🔄 Auto-pay flag detected after login, setting up payment flow...');
        
        // Set online payment method immediately
        setPaymentmethod('online');
        
        // Use a more reliable approach: check multiple times with increasing delays
        let attempts = 0;
        const maxAttempts = 5;
        
        const checkAndPay = () => {
          attempts++;
          console.log(`🔍 Auto-pay check attempt ${attempts}/${maxAttempts}`);
          
          // Check if address is complete and has ID
          const addressComplete = data.mob1 && data.postalcode && data.society && 
              data.state && data.city && data.area && data.landmark && data.id;
          
          if (addressComplete) {
            console.log('✅ Address complete! Auto-triggering payment now...');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            
            // Ensure payment method is set before proceeding
            setPaymentmethod('online');
            
            // Small delay to ensure state is updated, then trigger payment
            setTimeout(() => {
              console.log('🚀 Triggering handleOrder for auto-payment...');
              handleOrder();
            }, 1000);
          } else if (attempts < maxAttempts) {
            // If address not complete yet, log status and wait
            console.log(`⚠️ Address not complete yet (attempt ${attempts}):`, {
              mob1: !!data.mob1,
              postalcode: !!data.postalcode,
              society: !!data.society,
              state: !!data.state,
              city: !!data.city,
              area: !!data.area,
              landmark: !!data.landmark,
              id: !!data.id
            });
            
            // Wait a bit longer before next check
            if (attempts < maxAttempts) {
              setTimeout(checkAndPay, 2000);
            }
          } else {
            // Max attempts reached, clear flag and show message
            console.log('⚠️ Max attempts reached. Address may be incomplete. User should click Buy Now manually.');
            localStorage.removeItem('shouldAutoPayAfterLogin');
            toast.info('Please fill your address completely and click Buy Now to continue payment');
          }
        };
        
        // Start checking after a short delay to allow component to mount
        setTimeout(checkAndPay, 1000);
      } else {
        // If no token but flag exists, clear flag
        console.log('⚠️ No token found, clearing auto-pay flag');
        localStorage.removeItem('shouldAutoPayAfterLogin');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id, data.mob1, data.postalcode, data.society, data.state, data.city, data.area, data.landmark]);

  useEffect(() => {
    // REMOVED broken session restore logic - it was causing redirect loops
    // State is preserved via URL params only (totaloffer, totalprice, todaydeal)
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const getMethod = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/address/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setMethod("put");
        Setdata({
          id: response.data._id,
          mob1: response.data.mob1,
          mob2: response.data.mob2,
          postalcode: response.data.postalcode,
          society: response.data.address,
          area: response.data.area,
          landmark: response.data.landmark,
          city: response.data.city,
          state: response.data.state,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setMethod("post");
      }
    };
    
    if (token && id) {
      getMethod();
    }
  }, []);
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    Setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Validate all address fields
  const validateAddressForm = () => {
    const newErrors = {};
    
    // Validate mobile 1 (required, 10 digits)
    const mob1Validation = validatePhone(data.mob1);
    if (!mob1Validation.valid) {
      newErrors.mob1 = mob1Validation.message;
    }
    
    // Validate mobile 2 (required, 10 digits)
    const mob2Validation = validatePhone(data.mob2);
    if (!mob2Validation.valid) {
      newErrors.mob2 = mob2Validation.message;
    }
    
    // Validate pincode (required, 6 digits)
    const pincodeValidation = validatePincode(data.postalcode);
    if (!pincodeValidation.valid) {
      newErrors.postalcode = pincodeValidation.message;
    }
    
    // Validate society/address (required, min 10 chars)
    const societyValidation = validateAddress(data.society);
    if (!societyValidation.valid) {
      newErrors.society = societyValidation.message;
    }
    
    // Validate area (required)
    const areaValidation = validateRequired(data.area, 'Area');
    if (!areaValidation.valid) {
      newErrors.area = areaValidation.message;
    }
    
    // Validate landmark (required)
    const landmarkValidation = validateRequired(data.landmark, 'Landmark');
    if (!landmarkValidation.valid) {
      newErrors.landmark = landmarkValidation.message;
    }
    
    // Validate city (required, min 2 chars)
    const cityValidation = validateRequired(data.city, 'City');
    if (!cityValidation.valid || cityValidation.value.length < 2) {
      newErrors.city = 'City must be at least 2 characters long';
    }
    
    // Validate state (required)
    const stateValidation = validateRequired(data.state, 'State');
    if (!stateValidation.valid) {
      newErrors.state = stateValidation.message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateAddressForm()) {
      toast.error("Please fix all validation errors before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setLoading(true);
    
    try {
      // Clean and format data
      const phone1Validation = validatePhone(data.mob1);
      const phone2Validation = validatePhone(data.mob2);
      const pincodeValidation = validatePincode(data.postalcode);
      
      const payload = {
        mob1: phone1Validation.value,
        mob2: phone2Validation.value,
        postalcode: pincodeValidation.value,
        address: data.society.trim(),
        area: data.area.trim(),
        landmark: data.landmark.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
      };
      
      let response;
      if (method === "post") {
        response = await axios.post(
          "/api/address/",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Address added successfully");
      } else if (method === "put") {
        response = await axios.put(
          `/api/address/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        toast.success("Address updated successfully");
      } else {
        toast.warning("Something went wrong. Please refresh and try again.");
        setIsSubmitting(false);
        setLoading(false);
        return;
      }
      
      // Update state with response data
      if (response.data?.address) {
        Setdata({
          id: response.data.address._id,
          mob1: response.data.address.mob1,
          mob2: response.data.address.mob2,
          postalcode: response.data.address.postalcode,
          society: response.data.address.address,
          area: response.data.address.area,
          landmark: response.data.address.landmark,
          city: response.data.address.city,
          state: response.data.address.state,
        });
        setMethod("put"); // Update method for future edits
      }
      
      setErrors({}); // Clear all errors on success
    } catch (error) {
      console.error("Address submission error:", error);
      
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
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to save address. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handlePayment = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) => {
    setLoading(true);
    const response = await axios.post(
      "/api/orders/",
      {
        address: data.id,
        total: Number(totalprice) - Number(todaydeal),
        mode: "online",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );
    const payment_response = await axios.post("/api/razorpay/complete", {
      amount: Number(totalprice) - Number(todaydeal),
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
    });
    toast.success(payment_response.data.message);
    setLoading(false);
    navigate("/cart");
    return payment_response;
  };

  const handleOrder = async () => {
    try {
      if (
        !data.mob1 ||
        !data.mob2 ||
        !data.postalcode ||
        !data.society ||
        !data.state ||
        !data.city ||
        !data.area ||
        !data.landmark
      ) {
        toast.warning("Fill You Address !");
      } else {
        if (paymentmethod === "cod") {
          setLoading(true);
          const response = await axios.post(
            "/api/orders/",
            {
              address: data.id,
              total: Number(totalprice) - Number(todaydeal),
              mode: "cod",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              withCredentials: true,
            }
          );
          setLoading(false);
          toast.success(response.data.message);
          // After COD order, stay on address page or go to orders, NOT profile
          // Don't redirect to profile - let user continue shopping
          console.log('✅ COD order placed successfully');
          // Optionally navigate to orders page or stay on current page
          // navigate("/userprofile"); // REMOVED - don't force profile redirect
          // Stay on page and show success, user can navigate manually
        } else {
          // Cashfree flow: ensure user is logged in, then create order on server and redirect to payment link
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              // For online payment, redirect to login with checkout path (NOT address path)
              // This prevents the redirect loop
              const checkoutPath = '/checkout';
              localStorage.setItem('afterLoginRedirect', checkoutPath);
              localStorage.setItem('shouldAutoPayAfterLogin', 'true');
              
              // Save payment preference for after login
              sessionStorage.setItem('paymentMode', 'online');
              
              toast.info('Please login to continue to payment');
              navigate(`/login?next=${encodeURIComponent(checkoutPath)}`);
              return;
            }
            
            // User is authenticated - proceed directly with payment
            // Verify token is valid (not just exists)
            console.log('✅ User authenticated, proceeding with Cashfree payment...');
            console.log('📋 Payment details:', {
              amount: Number(totalprice) - Number(todaydeal),
              addressId: data.id,
              paymentMethod: paymentmethod
            });
            
            // Ensure address is saved and has ID
            if (!data.id) {
              toast.error('Please save your address first by clicking Submit button');
              setLoading(false);
              return;
            }
            
            setLoading(true);
            const rawAmount = Number(totalprice) - Number(todaydeal);
            // Basic client-side validation
            if (!Number.isFinite(rawAmount) || rawAmount <= 0) {
              toast.error('Invalid total amount, cannot initiate payment');
              setLoading(false);
              return;
            }
            
            console.log('🚀 Starting payment flow...', {
              amount: rawAmount,
              addressId: data.id,
              paymentMethod: 'online'
            });

            // Cashfree express-validator expects numeric string in many examples; send as string
            const amount = String(Math.round(rawAmount));
            const returnUrl = `${window.location.origin}/cashfree-callback`;

            // Build payload and omit empty email to avoid express-validator isEmail() failure
            const payload = {
              amount,
              currency: 'INR',
              customer_name: localStorage.getItem('first_name') || localStorage.getItem('username') || 'Guest',
              customer_phone: data.mob1 || '',
              returnUrl
            };
            const email = localStorage.getItem('email');
            if (email) payload.customer_email = email;

            console.log('🔄 Creating Cashfree payment order...', payload);
            const res = await API.post('/api/cashfree/create', payload);

            // Determine payment URL/orderId from response
            // Backend returns: { message, data: <cashfree_response>, orderId, txId, payment_link, payment_session_id }
            const respPayload = res.data || {};
            const cfData = respPayload.data || {}; // Cashfree's actual response
            const backendOrderId = respPayload.orderId; // Server-generated order ID
            
            console.log('📦 Cashfree API response received:', {
              orderId: backendOrderId,
              payment_link: respPayload.payment_link,
              payment_session_id: respPayload.payment_session_id,
              cfDataKeys: Object.keys(cfData),
              fullResponse: respPayload
            });
            
            // Extract payment_session_id from backend response (PG Orders API)
            const paymentSessionId = respPayload.payment_session_id || 
                                    cfData.payment_session_id || 
                                    cfData.paymentSessionId ||
                                    cfData.paymentSessionID;
            
            // Use backend orderId (server-generated)
            const orderId = backendOrderId || cfData.order_id || cfData.orderId || 
                           cfData.order?.id || cfData.id;

            if (!orderId) {
              console.error('❌ No orderId in Cashfree response:', respPayload);
              toast.error('Payment initialization failed: missing order ID');
              setLoading(false);
              return;
            }

            if (!paymentSessionId) {
              console.error('❌ No payment_session_id returned from Cashfree:', {
                response: respPayload,
                cfData: cfData,
                availableKeys: Object.keys(cfData),
                fullResponse: JSON.stringify(respPayload, null, 2)
              });
              toast.error('Payment initialization failed: no payment session ID received. Please check console for details.');
              setLoading(false);
              return;
            }

            // Save order info BEFORE opening checkout
            localStorage.setItem('cf_orderId', orderId);
            localStorage.setItem('cf_addressId', data.id);
            localStorage.setItem('cf_total', amount);
            console.log('💾 Saved payment info:', { orderId, addressId: data.id, total: amount });

            // Use Cashfree JS SDK v3 to open checkout (PG Orders Checkout)
            try {
              console.log('🔄 Loading Cashfree SDK v3...');
              toast.info('Opening secure Cashfree checkout...');
              
              // Load Cashfree JS SDK v3 (correct SDK for PG Orders API)
              const loadCashfreeSDK = () => {
                return new Promise((resolve, reject) => {
                  // Check if SDK is already loaded
                  if (window?.Cashfree && typeof window.Cashfree === 'function') {
                    console.log('✅ Cashfree SDK already loaded');
                    return resolve(window.Cashfree);
                  }

                  // Check if script is already being loaded
                  const existingScript = document.getElementById('cashfree-sdk-v3');
                  if (existingScript) {
                    existingScript.onload = () => {
                      if (window?.Cashfree) {
                        resolve(window.Cashfree);
                      } else {
                        reject(new Error('Cashfree SDK loaded but window.Cashfree not available'));
                      }
                    };
                    existingScript.onerror = () => reject(new Error('Failed to load Cashfree SDK script'));
                    return;
                  }

                  // Load Cashfree JS SDK v3
                  const script = document.createElement('script');
                  script.id = 'cashfree-sdk-v3';
                  script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                  script.async = true;
                  
                  script.onload = () => {
                    console.log('✅ Cashfree SDK v3 loaded successfully');
                    if (window?.Cashfree && typeof window.Cashfree === 'function') {
                      resolve(window.Cashfree);
                    } else {
                      reject(new Error('Cashfree SDK loaded but initialization function not found'));
                    }
                  };
                  
                  script.onerror = (err) => {
                    console.error('❌ Failed to load Cashfree SDK:', err);
                    reject(new Error('Failed to load Cashfree SDK script'));
                  };
                  
                  document.body.appendChild(script);
                });
              };

              const Cashfree = await loadCashfreeSDK();
              
              console.log('🔄 Initializing Cashfree with production mode...');
              const cashfree = await Cashfree({ mode: 'production' });
              
              if (!cashfree || typeof cashfree.checkout !== 'function') {
                throw new Error('Cashfree checkout method not available after initialization');
              }

              console.log('✅ Opening Cashfree checkout with paymentSessionId:', paymentSessionId.substring(0, 20) + '...');
              
              // Open checkout using payment_session_id
              await cashfree.checkout({
                paymentSessionId: paymentSessionId,
                redirectTarget: '_self'
              });
              
              console.log('✅ Cashfree checkout opened successfully');
              setLoading(false);
              return;
            } catch (sdkError) {
              console.error('❌ Cashfree SDK checkout error:', {
                error: sdkError,
                message: sdkError?.message,
                stack: sdkError?.stack,
                paymentSessionId: paymentSessionId?.substring(0, 20)
              });
              toast.error(sdkError?.message || 'Failed to open Cashfree checkout. Please try again.');
              setLoading(false);
              return;
            }
          } catch (err) {
              // Show detailed server response when available
              console.error('❌ Cashfree create error:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
                fullError: err
              });

              // If validation errors provided, format them for the user
              const resp = err.response?.data;
              if (resp) {
                // Handle validation errors
                if (Array.isArray(resp.errors) && resp.errors.length > 0) {
                  const messages = resp.errors.map(e => e.msg ? `${e.param}: ${e.msg}` : JSON.stringify(e)).join(' | ');
                  toast.error(`Validation error: ${messages}`);
                } 
                // Handle Cashfree API errors
                else if (resp.message) {
                  let errorMsg = resp.message;
                  
                  // If the server forwarded Cashfree API error, try to extract meaningful error
                  if (resp.data) {
                    if (typeof resp.data === 'object') {
                      const cfError = resp.data.message || resp.data.error || JSON.stringify(resp.data);
                      errorMsg = `${errorMsg}: ${cfError}`;
                    } else {
                      errorMsg = `${errorMsg}: ${resp.data}`;
                    }
                  } else if (resp.raw) {
                    // Try to parse raw error if it's JSON
                    try {
                      const rawData = JSON.parse(resp.raw);
                      errorMsg = `${errorMsg}: ${rawData.message || rawData.error || resp.raw.substring(0, 100)}`;
                    } catch {
                      errorMsg = `${errorMsg}: ${resp.raw.substring(0, 100)}`;
                    }
                  }
                  
                  toast.error(errorMsg);
                } 
                // Generic error response
                else {
                  toast.error('Payment initialization failed. Please try again.');
                }
              } 
              // Network or other errors
              else if (err.request) {
                toast.error('Cannot connect to payment server. Please check your internet connection.');
              } 
              else {
                toast.error(err.message || 'Failed to initiate payment. Please try again later.');
              }
            } finally {
            setLoading(false);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Sorry unexpected error occured .please try again");
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className=" p-10 flex justify-center flex-col items-center ">
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled
              type="button"
              className="py-2.5  mt-5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          </div>
        </>
      ) : (
        <>
          <div className=" x-10 md:px-20 pt-5 pb-5  flex flex-col lg:flex-row justify-center items-start gap-6 md:gap-10 ">
            <form
              className="bg-white border p-4 border-orange-400 shadow-sm w-full md:w-[35rem] rounded-md"
              onSubmit={handleOnSubmit}
            >
              <p className="text-lg font-medium">Delivery & Billing Address</p>
              <hr className="pt-3 pb-3" />
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Mobile No 1*</label>
                  <div className="w-full md:w-72">
                    <input
                      type="tel"
                      name="mob1"
                      id="mob1"
                      className={`w-full border rounded px-3 py-2 ${errors.mob1 ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="95XXXXXX09"
                      onChange={handleOnChange}
                      value={data.mob1}
                      maxLength={10}
                      required
                    />
                    {errors.mob1 && <p className="text-red-500 text-xs mt-1">{errors.mob1}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Mobile No 2*</label>
                  <div className="w-full md:w-72">
                    <input
                      type="tel"
                      name="mob2"
                      id="mob2"
                      value={data.mob2}
                      onChange={handleOnChange}
                      className={`w-full border rounded px-3 py-2 ${errors.mob2 ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="95XXXXXX09"
                      maxLength={10}
                      required
                    />
                    {errors.mob2 && <p className="text-red-500 text-xs mt-1">{errors.mob2}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Postal Code *</label>
                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      name="postalcode"
                      id="postalcode"
                      onChange={handleOnChange}
                      value={data.postalcode}
                      className={`w-full border rounded px-3 py-2 ${errors.postalcode ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter PinCode"
                      maxLength={6}
                      required
                    />
                    {errors.postalcode && <p className="text-red-500 text-xs mt-1">{errors.postalcode}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Society *</label>
                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      name="society"
                      id="society"
                      value={data.society}
                      onChange={handleOnChange}
                      className={`w-full border rounded px-3 py-2 ${errors.society ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Flat,House no,Building,Company,Appartment"
                      required
                    />
                    {errors.society && <p className="text-red-500 text-xs mt-1">{errors.society}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Area *</label>
                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      name="area"
                      id="area"
                      onChange={handleOnChange}
                      value={data.area}
                      className={`w-full border rounded px-3 py-2 ${errors.area ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Area,Street,Sector,Village"
                      required
                    />
                    {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">Landmark *</label>
                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      name="landmark"
                      id="landmark"
                      onChange={handleOnChange}
                      value={data.landmark}
                      className={`w-full border rounded px-3 py-2 ${errors.landmark ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Landmark"
                      required
                    />
                    {errors.landmark && <p className="text-red-500 text-xs mt-1">{errors.landmark}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">City *</label>
                  <div className="w-full md:w-72">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      onChange={handleOnChange}
                      value={data.city}
                      className={`w-full border rounded px-3 py-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="City"
                      required
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <label className="w-full md:w-36 text-gray-700">State *</label>
                  <div className="w-full md:w-72">
                    <select
                      name="state"
                      id="state"
                      onChange={handleOnChange}
                      value={data.state}
                      className={`w-full h-10 text-center border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    >
                  <option value="">Select state</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">
                    Kerala
                  </option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center mt-5">
                <button
                  className="p-2 rounded-lg text-white bg-gradient-to-r from-orange-300 to-orange-500 w-full md:w-60 h-10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
            <div className="w-full md:w-96 bg-white shadow-sm mt-5 p-4 border border-orange-400">
              <p className="text-lg font-medium">Price Detail</p>
              <hr />
              <p className="text-sm font-medium pt-3 pb-3 flex justify-start gap-40">
                <span className="">MRP</span>
                <span>Rs {totalprice}</span>
              </p>
              <hr />
              <p className="text-sm font-medium pt-3 flex justify-start gap-40">
                <span className="">OFFER</span>
                <span className="text-green-400">{totaloffer}%</span>
              </p>
              <hr />
              <p className="text-sm font-medium pt-3 flex justify-start gap-32">
                <span className="">Today Deal</span>
                <span className="text-green-400">Rs {todaydeal}</span>
              </p>
              <hr />
              <p className="text-xl font-medium pt-3 flex justify-start gap-32 mt-3">
                <span className="">Total Payable</span>
                <span className="text-orange-400">
                  Rs {Number(totalprice) - Number(todaydeal)}
                  <br />
                  <small className="text-gray-400 text-xs">
                    (Inclusive of all taxes)
                  </small>
                </span>
              </p>
              <div className=" pb-3">
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        value="COD"
                        name="payment"
                        onChange={() => setPaymentmethod('cod')}
                        checked={paymentmethod === 'cod'}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        COD
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value="online"
                        name="payment"
                        onChange={() => setPaymentmethod('online')}
                        checked={paymentmethod === 'online'}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Online Payment
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center mt-5">
                <button
                  className="p-2 rounded-lg text-white bg-gradient-to-r from-orange-300 to-orange-500 w-full md:w-60 h-12 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-300 "
                  onClick={handleOrder}
                >
                  <FontAwesomeIcon icon={faBuyNLarge} className="pr-3" /> Buy
                  Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Address;
