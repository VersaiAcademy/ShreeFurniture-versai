import React from 'react';
import { AlertCircle, Package, RefreshCw, Shield, Clock } from 'lucide-react';

export default function CancellationRefundPolicy() {
  const policies = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Immediate Cancellation",
      description: "Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Perishable Items",
      description: "SRI FURNITURE VILLAGE does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Damaged or Defective Items",
      description: "In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 15 days of receipt of the products."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Product Expectations",
      description: "In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 15 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty Products",
      description: "In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any Refunds approved by SRI FURNITURE VILLAGE, it'll take 9-15 days for the refund to be processed to the end customer."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-300 to-orange-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cancellation & Refund Policy
          </h1>
          {/* <p className="text-amber-100 text-lg">
            Last updated on 13-11-2025 14:49:28
          </p> */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-bold text-amber-800">SRI FURNITURE VILLAGE</span> believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
          </p>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center text-white">
                  {policy.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-amber-100 border-l-4 border-amber-600 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Important Notice</h4>
              <p className="text-amber-800">
                All refund requests are subject to verification and approval. Please ensure you report any issues within the specified timeframes for prompt resolution.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-amber-800 to-orange-700 text-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="mb-6">
            Contact our Customer Service team for any queries regarding cancellations or refunds.
          </p>
          <button className="bg-white text-amber-800 font-semibold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-300">
            Contact Customer Service
          </button>
        </div>
      </div>

      
    </div>
  );
}