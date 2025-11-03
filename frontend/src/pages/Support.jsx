import React from "react";
import { Mail, MessageCircle, HelpCircle, Globe2, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SupportPage() {
  const faqs = [
    {
      q: "How does TravelNudge AI find travel offers?",
      a: "TravelNudge AI compares offers from trusted third-party websites and displays the best deals for you — we don't handle bookings directly.",
    },
    {
      q: "Can I book directly through TravelNudge?",
      a: "No, bookings are made on partner websites. TravelNudge only helps you discover and compare offers.",
    },
    {
      q: "The chatbot isn't responding — what should I do?",
      a: "Try refreshing your page or checking your internet connection. If the issue continues, contact us using the form below.",
    },
    {
      q: "Are the prices shown up to date?",
      a: "Yes, prices are pulled in real-time from our partner platforms, but they may vary slightly when redirected to the booking site.",
    },
  ];

  const categories = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Account & Profile",
      desc: "Learn how to update your profile, manage preferences, and secure your account.",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Using the Chatbot",
      desc: "Get tips on chatting with TravelNudge AI and exploring travel offers easily.",
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Offers & Deals",
      desc: "Understand how offers are sourced and how to view partner deals safely.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Technical Support",
      desc: "Having trouble? Get help fixing chat or display issues.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden overflow-y-auto py-6 px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl my-auto">
        {/* Header Section */}
        <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              TravelNudge <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Support</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Need help using our chatbot or understanding how travel offers work?
              You're in the right place.
            </p>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{item.icon}</div>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden mb-12">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300">
                Quick answers to common questions about TravelNudge
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="group bg-gray-800/50 border border-gray-600 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {f.q}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Still need help?
            </h2>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Our support team is available Monday–Friday, 9 AM – 6 PM (local time).
              We'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="mailto:support@travelnudge.ai"
                className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-semibold"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
              <button className="flex items-center gap-3 border-2 border-cyan-500 text-cyan-400 px-6 py-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 font-semibold">
                <MessageCircle className="w-5 h-5" />
                Chat with AI
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 mb-4">
          <p className="text-gray-400 text-sm">
            💡 Pro tip: Check our FAQ section first - 80% of questions are answered there!
          </p>
        </div>

        {/* Back to Home - Added this section */}
        <div className="text-center mt-4">
          <Link
            to="/home"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}