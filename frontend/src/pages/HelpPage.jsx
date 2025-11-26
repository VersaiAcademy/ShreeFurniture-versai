import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, HelpCircle, ShoppingCart, Truck, CreditCard, Package } from 'lucide-react';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  const handleWhatsAppClick = () => {
    const phoneNumber = '919413165048';
    const message = 'Hello! I need help with my order.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919413165048';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:srifurniturevillage@gmail.com';
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Fixed Background Image */}
      <div 
        className="relative bg-cover bg-center py-24 px-4"
        style={{
          backgroundImage: "url('/home/Help Banner (1920x1080pxl) (1).png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <HelpCircle className="w-20 h-20 mx-auto mb-6 text-orange-400 animate-bounce drop-shadow-2xl" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            How Can We <span className="text-orange-400">Help You?</span>
          </h1>
          <p className="text-white text-xl mb-8 drop-shadow-xl font-medium">
            Find answers to common questions or get in touch with our support team
          </p>
          <button 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-10 py-4 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-2xl hover:scale-110"
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Quick Action Cards - Floating */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            onClick={handleCallClick}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-center text-2xl">Call Us</h3>
            <p className="text-gray-600 mb-4 text-center text-sm">Mon-Sat: 9 AM - 7 PM</p>
            <div className="bg-green-50 rounded-xl py-3 px-4">
              <p className="text-green-700 font-bold text-center text-xl">
                +91 9413165048
              </p>
            </div>
          </div>

          <div 
            onClick={handleWhatsAppClick}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-center text-2xl">WhatsApp Us</h3>
            <p className="text-gray-600 mb-4 text-center text-sm">Quick response guaranteed</p>
            <div className="bg-green-50 rounded-xl py-3 px-4">
              <p className="text-green-700 font-bold text-center text-xl">
                Chat Now
              </p>
            </div>
          </div>

          <div 
            onClick={handleEmailClick}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-5 mx-auto shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-center text-2xl">Email Us</h3>
            <p className="text-gray-600 mb-4 text-center text-sm">Response within 24 hours</p>
            <div className="bg-blue-50 rounded-xl py-3 px-4">
              <p className="text-blue-700 font-bold text-center text-sm break-all">
                srifurniturevillage@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Background */}
      <div 
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: "url('/home/Help Banner (1920x1080pxl) (1).png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/98"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white scale-110'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                {cat.icon}
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-5 max-w-4xl mx-auto">
            {faqs[activeCategory].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-orange-500"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-xl pr-4">{faq.q}</h3>
                    <span className={`text-orange-500 text-3xl font-bold transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 bg-orange-50/50">
                    <p className="text-gray-700 leading-relaxed text-lg">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Store Information Section */}
      {/* <div id="contact-section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <MapPin className="w-10 h-10" />
            Visit Our Store
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold text-2xl mb-4">SRI FURNITURE VILLAGE</h3>
              <p className="leading-relaxed text-lg">
                Plot No. 233/2, Mayuri Nagar<br />
                Nizampet Sub Post Office, Nizampet<br />
                Hyderabad, Medchal Malkajgiri<br />
                Qutubullapur, Telangana<br />
                PIN: 500090
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Store Hours
              </h3>
              <div className="space-y-2 text-lg">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
                <p className="text-red-200 font-semibold mt-4 text-xl">⚠ Closed on Public Holidays</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom CTA */}
      <div 
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: "url('/home/Help Banner (1920x1080pxl) (1).png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/92 to-amber-900/92"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-5xl font-bold mb-6 text-black drop-shadow-2xl">
            Still Need <span className="text-orange-600">Help?</span>
          </h3>
          <p className="text-2xl mb-10 text-black/95 drop-shadow-xl font-medium">
            Contact our Customer Service team for any queries
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-12 py-5 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:scale-110 flex items-center justify-center gap-3 text-xl"
            >
              <MessageCircle className="w-7 h-7" />
              WhatsApp Support
            </button>
            <button 
              onClick={handleCallClick}
              className="bg-white text-orange-600 font-bold px-12 py-5 rounded-full hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:scale-110 flex items-center justify-center gap-3 text-xl border-2 border-white/50"
            >
              <Phone className="w-7 h-7" />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}