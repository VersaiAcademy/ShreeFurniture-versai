import React, { useState } from 'react';
import { FileText, Shield, AlertCircle, CheckCircle2, Scale, Mail, Phone } from 'lucide-react';

export default function TermsConditions() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const terms = [
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "User Registration & Account",
      content: "To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Warranty Disclaimer",
      content: "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Use at Your Own Risk",
      content: "Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Unauthorized Use",
      content: "You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Payment Terms",
      content: "You agree to pay us the charges associated with availing the Services."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Lawful Use",
      content: "You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Third Party Links",
      content: "You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legally Binding Transaction",
      content: "You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Refund Policy",
      content: "You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Force Majeure",
      content: "Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Governing Law",
      content: "These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Jurisdiction",
      content: "All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Qutubullapur, Telangana."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Sri Furniture Village</h1>
          <p className="text-center text-amber-100 mt-2">Quality Furniture for Your Dream Home</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
          {/* <p className="text-gray-600 text-lg">Last updated on 13-11-2025 14:49:07</p> */}
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Binding Agreement</h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between <span className="font-semibold">SRI FURNITURE VILLAGE</span> ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4 mb-8">
          {terms.map((term, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-3 rounded-lg">
                    {term.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{term.title}</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${expandedSection === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed pl-16">
                    {term.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-amber-800 to-orange-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Questions About These Terms?</h3>
          </div>
          <p className="mb-6 text-amber-100">
            All concerns or communications relating to these Terms must be communicated to us using the contact information provided below.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-amber-100 text-sm">Phone</p>
                  <a href="tel:9413165048" className="font-semibold hover:text-amber-200 transition">
                    +91 94131 65048
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <div>
                  <p className="text-amber-100 text-sm">Email</p>
                  <a href="mailto:srifurniturevillage@gmail.com" className="font-semibold hover:text-amber-200 transition break-all">
                    srifurniturevillage@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Important Notice</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                By continuing to use our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. We recommend that you save or print a copy of these terms for your records.
              </p>
            </div>
          </div>
        </div>
      </div>

      
  
    </div>
  );
}