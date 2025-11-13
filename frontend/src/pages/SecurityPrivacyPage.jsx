import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Database, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityPrivacyPage() {
  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "SSL Encryption",
      description: "All data transmitted between your browser and our servers is encrypted using 256-bit SSL technology."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment Gateway",
      description: "We use PCI-DSS compliant payment gateways. Your card details are never stored on our servers."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Protection",
      description: "Your personal information is stored in secure, encrypted databases with restricted access."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Privacy Compliance",
      description: "We comply with all applicable data protection laws and regulations in India."
    }
  ];

  const privacySections = [
    {
      title: "Information We Collect",
      icon: <FileText className="w-6 h-6" />,
      content: [
        "Personal information: Name, email address, phone number, and delivery address",
        "Payment information: Processed securely through third-party payment gateways",
        "Order history and preferences to improve your shopping experience",
        "Device information: Browser type, IP address, and browsing behavior on our website",
        "Communication records: Customer service interactions and feedback"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        "Process and fulfill your furniture orders efficiently",
        "Send order confirmations, shipping updates, and delivery notifications",
        "Provide customer support and respond to your inquiries",
        "Improve our products, services, and website functionality",
        "Send promotional offers and updates (with your consent)",
        "Prevent fraud and ensure security of our platform"
      ]
    },
    {
      title: "Information Sharing",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        "We do NOT sell or rent your personal information to third parties",
        "Delivery partners: Share necessary details for order fulfillment",
        "Payment processors: For secure transaction processing",
        "Legal compliance: When required by law or to protect our rights",
        "Service providers: Only those essential for business operations under strict confidentiality"
      ]
    },
    {
      title: "Your Rights & Choices",
      icon: <CheckCircle className="w-6 h-6" />,
      content: [
        "Access and review your personal information at any time",
        "Request correction of inaccurate or incomplete data",
        "Delete your account and associated data (subject to legal obligations)",
        "Opt-out of marketing communications anytime",
        "Object to certain data processing activities",
        "Request a copy of your data in portable format"
      ]
    }
  ];

  const bestPractices = [
    "Never share your password with anyone",
    "Use strong, unique passwords for your account",
    "Log out after completing your session, especially on shared devices",
    "Be cautious of phishing emails claiming to be from SRI FURNITURE VILLAGE",
    "Review your order history regularly for any unauthorized activity",
    "Keep your contact information updated for security notifications"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-300 to-orange-500 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-300 to-orange-500  text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Security & Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Your trust and security are our top priorities
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Last updated: 13-11-2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At <span className="font-bold text-slate-800">SRI FURNITURE VILLAGE</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, protect, and share your information when you use our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our website and services, you agree to the collection and use of information in accordance with this policy. We encourage you to read this policy carefully to understand our practices.
          </p>
        </div>

        {/* Security Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Security Measures
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-800 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 mb-12">
          {privacySections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-slate-700" />
            Data Retention
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When your data is no longer needed, we securely delete or anonymize it.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Order and transaction records are retained for accounting and legal compliance purposes as required by Indian law (typically 7-10 years).
          </p>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-br from-yellow-700 to-orange-800 rounded-xl shadow-lg p-8 text-white mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Security Best Practices
          </h3>
          <p className="text-gray-200 mb-4">
            Help us keep your account secure by following these guidelines:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {bestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-100">{practice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Cookies & Tracking Technologies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. Cookies are small text files stored on your device.
          </p>
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-800 mb-3">Types of Cookies We Use:</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and choices</li>
              <li><strong>Marketing Cookies:</strong> Track your browsing to show relevant ads</li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">
              You can control cookies through your browser settings, though disabling them may affect website functionality.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Contact Us About Privacy
          </h3>
          <p className="text-gray-700 mb-4">
            If you have questions about our privacy practices or want to exercise your rights, please contact us:
          </p>
          <div className="bg-slate-50 rounded-lg p-6 space-y-3">
            <p className="text-gray-800">
              <strong>SRI FURNITURE VILLAGE</strong>
            </p>
            <p className="text-gray-700">
              Plot No. 233/2, Mayuri Nagar, Nizampet Sub Post Office<br />
              Nizampet, Hyderabad, Medchal Malkajgiri<br />
              Qutubullapur, Telangana - 500090
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:srifurniturevillage@gmail.com" className="text-slate-700 hover:text-slate-900">srifurniturevillage@gmail.com</a>
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> <a href="tel:9413165048" className="text-slate-700 hover:text-slate-900">+91 9413165048</a>
            </p>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
          <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Policy Updates
          </h3>
          <p className="text-amber-800">
            We may update this Security & Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </div>
      </div>
    </div>
  );
}