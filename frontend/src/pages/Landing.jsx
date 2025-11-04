import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cameFromHome = localStorage.getItem("came_from_home") === "true";
    
    if (cameFromHome) {
      navigate("/signup");
      localStorage.removeItem("came_from_home");
    }
  }, [navigate]);
  

  const features = [
    {
      icon: "fa-solid fa-rocket",
      title: "AI-Powered Assistance",
      description: "Get instant, intelligent travel recommendations"
    },
    {
      icon: "fa-solid fa-globe",
      title: "Global Coverage",
      description: "Access travel insights from around the world"
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Real-time Updates",
      description: "Stay informed with live travel information"
    },
    {
      icon: "fa-solid fa-shield-alt",
      title: "Secure & Private",
      description: "Your data and travels are protected"
    }
  ];

  const travelCategories = [
    { icon: "fa-solid fa-plane", name: "Flights", color: "from-blue-500 to-cyan-500" },
    { icon: "fa-solid fa-bus-simple", name: "Buses", color: "from-purple-500 to-pink-500" },
    { icon: "fa-solid fa-car", name: "Cabs", color: "from-orange-500 to-red-500" },
    { icon: "fa-solid fa-train", name: "Trains", color: "from-green-500 to-teal-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowOptionsModal(true);
    } else {
      alert("Your assistance request has been submitted!");
    }
  };

  const handleGetStarted = () => {
    setShowOptionsModal(true);
  };

  const handleLogin = () => {
    setShowOptionsModal(false);
    navigate("/signin");
  };

  const handleSignUp = () => {
    setShowOptionsModal(false);
    navigate("/signup");
  };

  const handleStayLoggedOut = () => {
    setShowOptionsModal(false);
    localStorage.setItem("is_guest", "true");
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg py-2 shadow-md' : 'py-4'} w-full`}>
        <div className="w-full px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-compass text-white text-sm sm:text-base"></i>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
              TravelNudge
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={handleLogin}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-100 transition-all flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base font-medium"
            >
              <i className="fa-solid fa-users text-xs sm:text-sm"></i>
              <span className="hidden sm:inline">Sign In</span>
            </button>
            <button 
              onClick={handleGetStarted}
              className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-cyan-600/40 transition-all flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <span>Get Started</span>
              <i className="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 pt-24 pb-16 sm:pt-28 sm:pb-32">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-cyan-300 mb-6 sm:mb-8 shadow-lg">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-600 rounded-full animate-ping mr-1 sm:mr-2"></div>
            <i className="fa-solid fa-bolt text-cyan-700 mr-1 sm:mr-2 text-xs sm:text-sm"></i>
            <span className="text-xs sm:text-sm text-cyan-800 font-semibold">AI-Powered Travel Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-800">
            Travel Smarter with
            <span className="bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 bg-clip-text text-transparent block sm:inline">
              {" "}NudgeAI
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Your intelligent travel companion that anticipates your needs and enhances every journey with real-time insights and personalized recommendations.
          </p>

          {/* Travel Categories */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
            {travelCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center shadow-md`}>
                  <i className={`${category.icon} text-white text-xs sm:text-sm`}></i>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Search Form */}
          <div className="w-full max-w-2xl mx-auto mb-12 sm:mb-16 px-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-xl border-2 border-gray-300 shadow-2xl overflow-hidden">
                <div className="w-full flex items-center">
                  <div className="pl-4 pr-2 sm:pl-6 sm:pr-3 text-gray-600">
                    <i className="fa-solid fa-search text-sm sm:text-base"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Ask me anything about your travel plans..."
                    className="flex-1 px-2 sm:px-4 py-3 sm:py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-lg w-full"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-600/40 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Get Assistance</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 max-w-2xl mx-auto px-2">
            {[
              { number: "50K+", label: "Travelers", icon: "fa-solid fa-users" },
              { number: "120+", label: "Countries", icon: "fa-solid fa-globe" },
              { number: "24/7", label: "Support", icon: "fa-solid fa-clock" },
              { number: "98%", label: "Satisfaction", icon: "fa-solid fa-star" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200">
                <i className={`${stat.icon} text-cyan-700 text-lg sm:text-xl mb-1 sm:mb-2`}></i>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-700">{stat.number}</div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-12 sm:py-20 bg-white/60 backdrop-blur-sm w-full">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-800">Why Choose TravelNudge?</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Experience the future of travel with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 sm:p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-white border-cyan-500 shadow-2xl shadow-cyan-600/30 transform -translate-y-1 sm:-translate-y-2' 
                    : 'bg-white/80 border-gray-300 hover:border-cyan-400 hover:bg-white hover:shadow-xl'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <i className={`${feature.icon} text-white text-base sm:text-lg`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-12 sm:py-20 w-full">
        <div className="w-full px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-800">How It Works</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Three simple steps to transform your travel experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Describe Your Trip", description: "Tell us about your travel preferences and destination", icon: "fa-solid fa-compass" },
              { step: "02", title: "Get AI Recommendations", description: "Receive personalized travel suggestions and insights", icon: "fa-solid fa-bolt" },
              { step: "03", title: "Get Best Offers", description: "Make informed decisions and enjoy your journey", icon: "fa-solid fa-check" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <i className={`${item.icon} text-white text-lg sm:text-xl`}></i>
                </div>
                <div className="text-cyan-700 font-bold text-base sm:text-lg mb-1 sm:mb-2">{item.step}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-20 w-full">
        <div className="w-full px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-2 border-gray-300 shadow-2xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Ready to Transform Your Travel Experience?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
              Join thousands of smart travelers who trust TravelNudge for their journeys.
            </p>
            <button 
              onClick={handleGetStarted}
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-600/40 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto text-white"
            >
              <span>Start Your Journey Free</span>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <p className="text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm font-medium">Features Limited . SignUp for free access</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 sm:py-12 bg-white/90 backdrop-blur-sm border-t-2 border-gray-300 w-full">
        <div className="w-full px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-compass text-white text-xs sm:text-sm"></i>
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
                TravelNudge
              </span>
            </div>
            
            <div className="flex space-x-4 sm:space-x-6 mb-4 md:mb-0">
              {[
                {
                  icon: "fa-brands fa-twitter",
                  url: "https://x.com/retouchin_it?t=hqRtnorbkNZVOczmgjEt3A&s=08",
                  name: "Twitter"
                },
                {
                  icon: "fa-brands fa-facebook",
                  url: "https://www.facebook.com/share/1CWxD9nySu/", 
                  name: "Facebook"
                },
                {
                  icon: "fa-brands fa-instagram",
                  url: "https://instagram.com/travelnudge",
                  name: "Instagram"
                },
                {
                  icon: "fa-brands fa-linkedin",
                  url: "https://www.linkedin.com/company/retouch-it-services-private-limited/",
                  name: "LinkedIn"
                }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-cyan-700 transition-colors"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <i className={`${social.icon} text-lg sm:text-xl`}></i>
                </a>
              ))}
            </div>
            
            <div className="text-gray-600 text-xs sm:text-sm font-medium">
              © 2025 TravelNudge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Options Modal */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowOptionsModal(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white border-2 border-gray-300 rounded-2xl shadow-2xl overflow-hidden mx-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-blue-600"></div>
            <div className="p-6 sm:p-8">
              <button
                onClick={() => setShowOptionsModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <i className="fa-solid fa-times text-base sm:text-lg"></i>
              </button>
              
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <i className="fa-solid fa-compass text-white text-xl sm:text-2xl"></i>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Welcome to TravelNudge</h2>
                <p className="text-gray-600 text-sm sm:text-base">Choose how you'd like to continue</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-600/40 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>Sign In to Your Account</span>
                </button>
        
                <button
                  onClick={handleSignUp}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-600/40 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Sign Up </span>
                </button>

                <button
                  onClick={handleStayLoggedOut}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl border-2 border-gray-400 hover:bg-gray-300 hover:border-gray-500 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <i className="fa-solid fa-eye"></i>
                  <span>Continue as Guest</span>
                </button>
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-600 text-xs sm:text-sm">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-cyan-700 hover:text-cyan-800 font-medium">Terms</a> and{" "}
                  <a href="#" className="text-cyan-700 hover:text-cyan-800 font-medium">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}