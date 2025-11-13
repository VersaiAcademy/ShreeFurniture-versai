import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, HelpCircle, ShoppingCart, Truck, CreditCard, Package } from 'lucide-react';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('orders');

  const categories = [
    { id: 'orders', name: 'Orders & Tracking', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'shipping', name: 'Shipping', icon: <Truck className="w-5 h-5" /> },
    { id: 'payment', name: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'returns', name: 'Returns & Refunds', icon: <Package className="w-5 h-5" /> }
  ];

  const faqs = {
    orders: [
      {
        q: "How do I track my order?",
        a: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this number to track your order status on our website or the courier's website."
      },
      {
        q: "Can I modify my order after placing it?",
        a: "Orders can be modified only if they haven't been processed yet. Please contact our customer service immediately at 9413165048 or srifurniturevillage@gmail.com"
      },
      {
        q: "How long does order processing take?",
        a: "Most orders are processed within 1-2 business days. Custom furniture orders may take 5-7 business days for processing."
      }
    ],
    shipping: [
      {
        q: "What are your delivery areas?",
        a: "We deliver across India. Delivery timelines vary based on your location. Metro cities: 3-5 days, Other cities: 5-10 days."
      },
      {
        q: "Do you provide installation services?",
        a: "Yes, we provide free installation for most furniture items. Our delivery team will assemble and install your furniture at your location."
      },
      {
        q: "What if I'm not available during delivery?",
        a: "Please ensure someone is available at the delivery address. If you miss the delivery, our courier partner will contact you to reschedule."
      }
    ],
    payment: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Credit/Debit Cards, Net Banking, UPI, Wallets, and Cash on Delivery (COD) for eligible orders."
      },
      {
        q: "Is it safe to use my card on your website?",
        a: "Yes, absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your card details."
      },
      {
        q: "When will my payment be charged?",
        a: "For prepaid orders, payment is charged immediately. For COD orders, payment is collected at the time of delivery."
      }
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: "You can return products within 15 days of delivery if they are damaged, defective, or not as described. Please contact customer service to initiate a return."
      },
      {
        q: "How long does refund processing take?",
        a: "Once your return is approved, refunds are processed within 9-15 business days to your original payment method."
      },
      {
        q: "Do I need to pay for return shipping?",
        a: "No, if the product is damaged or defective, we arrange free return pickup. For other returns, return shipping charges may apply."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-300 to-orange-500 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-300 to-orange-500  text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-indigo-200 text-lg">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-100 mb-2">Mon-Sat: 9 AM - 7 PM</p>
            <a href="tel:9413165048" className="text-orange-600 font-semibold hover:text-orange-800">
              +91 9413165048
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
            <a href="mailto:srifurniturevillage@gmail.com" className="text-orange-600 font-semibold hover:text-indigo-800 break-all">
              srifurniturevillage@gmail.com
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-gray-100 mb-2">Chat with our team</p>
            <button className="text-orange-600 font-semibold hover:text-orange-800">
              Start Chat
            </button>
          </div>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-600" />
            Visit Our Store
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 mb-2">SRI FURNITURE VILLAGE</h3>
              <p className="text-gray-600 leading-relaxed">
                Plot No. 233/2, Mayuri Nagar<br />
                Nizampet Sub Post Office, Nizampet<br />
                Hyderabad, Medchal Malkajgiri<br />
                Qutubullapur, Telangana<br />
                PIN: 500090
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Store Hours
              </h3>
              <div className="text-gray-100 space-y-1">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
                <p className="text-red-600 font-semibold mt-2">Closed on Public Holidays</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs[activeCategory].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
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