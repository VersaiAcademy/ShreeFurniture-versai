// CustomFurniture.jsx - Custom Furniture Contact Form Page
import { useState } from 'react';
import { submitPublicOrder } from '../utils/api';

const CustomFurniture = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pinCode: '',
    city: '',
    address: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Update this endpoint according to your backend API
      await submitPublicOrder({
        formType: 'custom',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address || `${formData.city}, ${formData.pinCode}`,
        city: formData.city,
        pincode: formData.pinCode,
        productName: 'Custom Furniture Request',
        productPrice: 0,
        paymentStatus: 'pending',
        paymentMode: 'na',
        notes: formData.description
      });
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        pinCode: '',
        city: '',
        address: '',
        description: ''
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Ready To Start Your Project
              </h1>
              <p className="text-gray-600 mb-8">Fill Out the contact form below</p>

              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Request Submitted Successfully!
                  </h3>
                  <p className="text-green-700">
                    Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name*"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="Pin Code*"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City*"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Complete Address *"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Your Request'}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative">
              <img
                src="/custom-furniture-image.jpg"
                alt="Custom Furniture Design"
                className="w-full h-full object-cover"
              />
              {/* Overlay with text */}
              <div className="absolute bottom-0 right-0 p-6 text-right">
                <p className="text-orange-500 text-lg font-medium">on</p>
                <p className="text-gray-700">Set Bo</p>
                <p className="text-gray-600 italic">estion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Looking for your dream furniture? We make it easy to customize furniture of your Brand Real Home
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomFurniture;