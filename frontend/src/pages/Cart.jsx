import { faBuyNLarge } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faPlus,
  faShoppingBag,
  faSubtract,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { API_CONFIG } from "../utils/constants";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = ""; // images are full URLs
  const id = localStorage.getItem("id");
  const [cartItems, setCartItems] = useState([]);
  const [cartleng, setCartleng] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !id) {
      navigate("/login");
      toast.warning("Login To Continue");
      return;
    }

    const getCartItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/cart/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log('📦 /api/cart response:', response.data);

        // Normalize response to an array of cart items
        let items = [];
        if (Array.isArray(response.data)) items = response.data;
        else if (Array.isArray(response.data.cart)) items = response.data.cart;
        else if (Array.isArray(response.data.items)) items = response.data.items;
        else if (Array.isArray(response.data.data)) items = response.data.data;
        else if (Array.isArray(response.data.cartItems)) items = response.data.cartItems;
        else if (response.data && typeof response.data === 'object') {
          items = response.data.items || response.data.cart || response.data.data || [];
        }

        items = (items || []).filter(Boolean);

        // REMOVED THE SINGLE ITEM LIMITATION - Now allows multiple items
        setCartItems(items);
        console.log(`✅ Loaded ${items.length} items in cart`);

      } catch (error) {
        console.error("Error fetching cart item:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    getCartItem();
  }, [token, id, navigate]);

  useEffect(() => {
    const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;
    setCartleng(cartCount);
    localStorage.setItem("cart", cartCount);
  }, [cartItems]);

  const totalOffers = cartItems.reduce(
    (totalOffer, item) => totalOffer + (item?.product?.offer || 0),
    0
  );

  const averageOfferPercent =
    cartItems.length > 0 ? Math.floor(totalOffers / cartItems.length) : 0;

  const totalPrice = cartItems.reduce((tprice, item) => {
    const price = Number(item?.price ?? item?.product?.price ?? 0);
    const qty = Number(item?.qty ?? 1);
    return tprice + price * qty;
  }, 0);

  // const todaysDeal = 000;

  // const states = {
  //   totaloffer: totalOffers,
  //   totalprice: totalPrice,
  //   todaydeal: todaysDeal,
  // };

  const removeCartItems = async (id) => {
    try {
      const response = await axios.delete(`/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.data.status === 200) {
        toast.success(response.data.message || "Item removed from cart");
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error Occurred! Try Again");
    }
  };

  const handleQuantity = async (itemId, action) => {
    try {
      const itemIndex = cartItems.findIndex((item) => item._id === itemId);
      if (itemIndex === -1) {
        console.log("Item not found in cart");
        return;
      }

      const updatedCartItems = [...cartItems];
      const itemToUpdate = updatedCartItems[itemIndex];

      if (action === "desc" && itemToUpdate.qty > 1) {
        itemToUpdate.qty -= 1;
      } else if (
        action === "inc" &&
        itemToUpdate.qty < (itemToUpdate.product?.stock_count || 999)
      ) {
        itemToUpdate.qty += 1;
      } else {
        toast.warning("Maximum/minimum quantity reached");
        return;
      }

      updatedCartItems[itemIndex] = itemToUpdate;
      setCartItems(updatedCartItems);

      const response = await axios.put(
        `/api/cart/${itemId}`,
        {
          qty: itemToUpdate.qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.status === 200) {
        toast.success("Quantity updated");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {cartleng > 0 ? (
            <>
              <div className="pt-3 pb-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-blue-50">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:items-start">
                    <div className="flex-1 mt-5 border-2 bg-white shadow-lg rounded-md mb-3 pb-3">
                      <div className="flex flex-col sm:flex-row pt-3 sm:pt-4 px-3 sm:px-4 md:px-6 justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <span className="font-semibold text-base sm:text-lg">
                          My Cart ({cartleng})
                        </span>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                          <span className="text-sm sm:text-base text-gray-600 sm:text-gray-400 flex items-center">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="pr-2"
                            />
                            Deliver to
                          </span>
                          <div className="relative w-full sm:w-60">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>
                            <input
                              type="search"
                              id="default-search"
                              className="block w-full p-2 sm:p-3 ps-8 sm:ps-10 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-9 sm:h-10"
                              placeholder="Enter location"
                              required
                            />
                            <button
                              type="submit"
                              className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                            >
                              <span className="hidden sm:inline">Search</span>
                              <span className="sm:hidden">Go</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-3" />
                    {/* Cart Items List */}

                    {cartItems.map((item) => (
                      <div key={item._id}>
                        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-start items-start sm:items-center px-3 sm:px-4 md:px-6 pb-2 gap-3 sm:gap-4">
                          <div className="w-full sm:w-32 h-48 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden">
                            {(() => {
                              // Helper to pick best image from product or item
                              const prod = item.product || {};
                              const candidates = [
                                prod.natural_finish_image,
                                prod.natural_finish_img,
                                prod.natural_finish_img2,
                                prod.stone_finish_image,
                                prod.stone_finish_img,
                                prod.stone_finish_img2,
                                prod.img1,
                                prod.img2,
                                prod.img3,
                                prod.img4,
                                prod.img5,
                                prod.image,
                                prod.images && prod.images[0],
                                item.image,
                                item.product_image,
                              ];

                              let displayImage = candidates.find(Boolean) || '';

                              // If image is relative (starts with /) or missing protocol, prefix API base URL
                              if (displayImage && !/^https?:\/\//i.test(displayImage)) {
                                const API_BASE = API_CONFIG.BASE_URL;
                                displayImage = `${API_BASE.replace(/\/$/, '')}/${displayImage.replace(/^\//, '')}`;
                              }

                              return (
                                <img
                                  src={displayImage || 'https://via.placeholder.com/400x300?text=No+Image'}
                                  alt={item.product_name || ''}
                                  className="w-full h-full object-cover"
                                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
                                />
                              );
                            })()}
                          </div>
                          <div className="flex-1 w-full sm:w-auto">
                            <h2 className="text-sm sm:text-base font-semibold cursor-pointer hover:text-orange-500 transition-colors mb-1">
                              {item.product_name}
                            </h2>
                            <small className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                              {item?.product?.pdesc || ''}
                            </small>
                            <div className="pt-3 flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 sm:gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm text-gray-600">Quantity:</span>
                                <div className="border border-gray-300 rounded flex items-center">
                                  <button
                                    className="cursor-pointer border-r px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors"
                                    onClick={() => {
                                      handleQuantity(item._id, "desc");
                                    }}
                                    aria-label="Decrease quantity"
                                  >
                                    <FontAwesomeIcon icon={faSubtract} className="text-xs sm:text-sm" />
                                  </button>
                                  <div className="px-3 sm:px-4 text-sm sm:text-base font-medium">{item.qty}</div>
                                  <button
                                    className="cursor-pointer border-l px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors"
                                    onClick={() => {
                                      handleQuantity(item._id, "inc");
                                    }}
                                    aria-label="Increase quantity"
                                  >
                                    <FontAwesomeIcon icon={faPlus} className="text-xs sm:text-sm" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <h2 className="font-semibold text-lg sm:text-xl">
                                  <span className="pr-1">₹</span>
                                  {(item.price * item.qty).toLocaleString('en-IN')}
                                </h2>
                                {item?.product?.offer > 0 && (
                                  <p className="text-green-600 text-xs sm:text-sm font-medium">
                                    {item?.product?.offer || 0}% Off
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 sm:px-4 md:px-6 lg:px-20 text-gray-600 flex flex-wrap gap-3 sm:gap-5 text-sm sm:text-base">
                          <p>
                            <FontAwesomeIcon icon={faHeart} className="pr-3" />
                            <span className="hover:text-orange-400 cursor-pointer">
                              {" "}
                              Save For Later
                            </span>
                          </p>
                          <p
                            onClick={() => {
                              removeCartItems(item._id);
                            }}
                            className=" hover:text-red-500 cursor-pointer"
                          >
                            <FontAwesomeIcon icon={faTrash} className="pr-3" />
                            <span className="hover:text-orange-400 ">
                              Remove
                            </span>
                          </p>
                        </div>
                        <hr className="mt-3" />
                      </div>
                    ))}
                    {/* End Cart Items List */}
                  </div>

                  {/* Price Details Sidebar */}
                  <div className="w-full lg:w-96 bg-white shadow-sm mt-5 p-4 sm:p-5 md:p-6 border border-orange-400 rounded-lg sticky top-4">
                    <p className="text-base sm:text-lg font-semibold mb-3">Price Detail</p>
                    <hr className="border-gray-200" />
                    <div className="space-y-3 pt-3">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">MRP ({cartleng} {cartleng === 1 ? 'item' : 'items'})</span>
                        <span className="font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">OFFER</span>
                        <span className="text-green-600 font-medium">{averageOfferPercent || 0}%</span>
                      </div>
                      {/* <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Today Deal</span>
                          <span className="text-green-600 font-medium">₹{todaysDeal.toLocaleString('en-IN')}</span>
                        </div> */}
                      <div className="flex justify-between text-base sm:text-lg font-semibold pt-3 border-t border-gray-200">
                        <span>Total Payable</span>
                        <span className="text-orange-500">
                          ₹{((totalPrice || 0)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <Link
                      className="flex justify-center items-center mt-5 sm:mt-6"
                      to="/checkout"
                    >
                      <button className="p-3 rounded-lg text-white bg-gradient-to-r from-orange-400 to-orange-600 w-full h-12 sm:h-14 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base font-semibold">
                        <FontAwesomeIcon icon={faBuyNLarge} className="pr-2 sm:pr-3" />
                        Continue to Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-[60vh] px-4">
              <img
                src="https://expresshub.com.bd/img/404.png"
                alt="Empty Cart"
                className="max-w-xs sm:max-w-md w-full h-auto"
              />
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-4 sm:mt-6 text-center max-w-md w-full">
                <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">
                  No Products in Cart
                </p>
                <Link
                  to={"/"}
                  className="inline-block mt-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                >
                  Shop Now <FontAwesomeIcon icon={faShoppingBag} className="ml-2" />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;