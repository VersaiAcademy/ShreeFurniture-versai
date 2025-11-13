import React, { useState } from 'react';
import { Truck, Package, MapPin, Clock, CheckCircle, AlertCircle, Box, Home, Phone, Mail } from 'lucide-react';

export default function DeliveryShippingPage() {
  const [activeTab, setActiveTab] = useState('delivery');

  const deliveryTimelines = [
    {
      location: "Hyderabad & Surrounding Areas",
      timeline: "2-4 Business Days",
      icon: "🏙️"
    },
    {
      location: "Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Kolkata)",
      timeline: "3-5 Business Days",
      icon: "🌆"
    },
    {
      location: "Tier 2 Cities",
      timeline: "5-7 Business Days",
      icon: "🏘️"
    },
    {
      location: "Remote Areas",
      timeline: "7-10 Business Days",
      icon: "🏞️"
    }
  ];

  const shippingProcess = [
    {
      step: 1,
      title: "Order Confirmation",
      description: "You'll receive an email and SMS confirmation immediately after placing your order with all order details.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Order Processing",
      description: "Our team processes your order and prepares it for dispatch. This usually takes 1-2 business days.",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Quality Check & Packaging",
      description: "Each item is carefully inspected and securely packaged to prevent any damage during transit.",
      icon: <Box className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Shipped",
      description: "Your order is dispatched and you'll receive tracking details via email and SMS.",
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 5,
      title: "Out for Delivery",
      description: "Our delivery partner will contact you to schedule a convenient delivery time.",
      icon: <Home className="w-6 h-6" />
    },
    {
      step: 6,
      title: "Delivered",
      description: "Your furniture is delivered and installed (if applicable). Sign the delivery receipt after inspection.",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const shippingCharges = [
    {
      category: "Small Items (Cushions, Lamps, Decor)",
      charge: "₹99 - ₹299",
      freeAbove: "₹2,999"
    },
    {
      category: "Medium Furniture (Chairs, Side Tables)",
      charge: "₹499 - ₹999",
      freeAbove: "₹9,999"
    },
    {
      category: "Large Furniture (Sofas, Beds, Wardrobes)",
      charge: "₹999 - ₹2,999",
      freeAbove: "₹24,999"
    }
  ];

  const importantNotes = [
    "Please ensure someone is available at the delivery address to receive the order",
    "Carry valid ID proof for verification during delivery",
    "Inspect the product carefully before signing the delivery receipt",
    "Report any damage or defects immediately to our customer service",
    "Installation services are complimentary for most furniture items",
    "Assembly time varies from 30 minutes to 3 hours depending on the product",
    "Keep the original packaging for 7 days in case you need to initiate a return",
    "We deliver to your doorstep but do not provide room-of-choice placement for heavy items"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-300 to-orange-500 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-300 to-orange-500  text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Truck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Delivery & Shipping Policy
          </h1>
          <p className="text-emerald-100 text-lg">
            Fast, secure, and reliable delivery across India
          </p>
          {/* <p className="text-emerald-200 text-sm mt-2">
            Last updated: 13-11-2025
          </p> */}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'delivery'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Delivery Timeline
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'process'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Shipping Process
          </button>
          <button
            onClick={() => setActiveTab('charges')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'charges'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Shipping Charges
          </button>
        </div>

        {/* Delivery Timeline */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="w-7 h-7 text-orange-600" />
                Estimated Delivery Timelines
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Delivery times may vary based on your location and product availability. All timelines are calculated from the order dispatch date, not the order placement date.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {deliveryTimelines.map((item, index) => (
                  <div key={index} className="border-2 border-orange-100 rounded-xl p-6 hover:border-emerald-300 transition-colors">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {item.location}
                    </h3>
                    <div className="flex items-center gap-2 text-orange-600 font-semibold">
                      <Clock className="w-5 h-5" />
                      {item.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Important Information</h4>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Custom-made furniture may require additional 5-10 business days</li>
                    <li>• Delivery timelines are estimates and may vary due to unforeseen circumstances</li>
                    <li>• Public holidays and adverse weather conditions may cause delays</li>
                    <li>• We'll keep you informed via SMS and email throughout the delivery process</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Process */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package className="w-7 h-7 text-emerald-600" />
              How Shipping Works
            </h2>
            <div className="space-y-6">
              {shippingProcess.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    {index < shippingProcess.length - 1 && (
                      <div className="w-1 h-16 bg-emerald-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-emerald-600">{item.icon}</div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Charges */}
        {activeTab === 'charges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shipping Charges
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our shipping charges are calculated based on product size, weight, and delivery location. Enjoy free shipping on orders above specified amounts!
              </p>
              <div className="space-y-4">
                {shippingCharges.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.category}
                        </h3>
                        <p className="text-emerald-700 font-semibold">
                          Standard Shipping: {item.charge}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg px-6 py-3 border-2 border-emerald-500">
                        <p className="text-sm text-gray-600 mb-1">FREE Shipping on orders</p>
                        <p className="text-emerald-600 font-bold text-lg">Above {item.freeAbove}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">🎉 Special Offer!</h3>
              <p className="text-lg">
                Get FREE shipping on all orders above <span className="font-bold text-2xl">₹9,999</span>
              </p>
              <p className="text-emerald-100 mt-2">Limited time offer. Terms and conditions apply.</p>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertCircle className="w-7 h-7 text-amber-600" />
            Important Delivery Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-3 bg-amber-50 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-orange-600" />
            Track Your Order
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order status in real-time using this tracking number on our website or the courier's tracking portal.
          </p>
          <div className="bg-orange-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Track Order Status:</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your tracking number"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-orange-200 focus:border-orange-500 focus:outline-none"
              />
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Contact for Delivery Issues */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-100 text-black rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Phone className="w-7 h-7" />
            Delivery Support
          </h2>
          <p className="text-orange-800 mb-6">
            Have questions about your delivery? Our support team is here to help!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="font-bold mb-3">SRI FURNITURE VILLAGE</h3>
              <p className="text-orange-800 text-sm mb-4">
                Plot No. 233/2, Mayuri Nagar, Nizampet Sub Post Office<br />
                Nizampet, Hyderabad, Medchal Malkajgiri<br />
                Qutubullapur, Telangana - 500090
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:9413165048" className="hover:text-orange-200">+91 9413165048</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:srifurniturevillage@gmail.com" className="hover:text-orange-200 break-all">
                    srifurniturevillage@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="font-bold mb-3">Support Hours</h3>
              <div className="space-y-2 text-orange-800">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
                <p className="text-orange-800 font-semibold mt-4">
                  Average Response Time: Within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Undeliverable Orders */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Undeliverable Orders Policy
          </h3>
          <p className="text-red-800 mb-3">
            If an order cannot be delivered due to incorrect address, recipient unavailability, or refused delivery:
          </p>
          <ul className="text-red-800 space-y-1 ml-4">
            <li>• The order will be returned to our warehouse</li>
            <li>• Re-delivery charges will be applicable</li>
            <li>• You can request a refund (after deducting forward and reverse shipping charges)</li>
            <li>• Please ensure accurate delivery information to avoid such situations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}