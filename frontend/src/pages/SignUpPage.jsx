import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: true,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null); // 'google' or 'apple'
  const [showSuccess, setShowSuccess] = useState(false);

  // 🧮 Password strength checker
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Very Weak";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // Social Sign-Up Handlers
  const handleGoogleSignUp = async () => {
    setSocialLoading('google');
    try {
      // Simulate Google OAuth process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful Google sign-up
      const mockUserData = {
        full_name: "Google User",
        email: "user@gmail.com",
        provider: "google"
      };
      
      localStorage.setItem("access_token", "google_mock_token");
      localStorage.setItem("user_data", JSON.stringify(mockUserData));
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
      
    } catch (error) {
      console.error("Google sign-up error:", error);
      alert("Google sign-up failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleAppleSignUp = async () => {
    setSocialLoading('apple');
    try {
      // Simulate Apple OAuth process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful Apple sign-up
      const mockUserData = {
        full_name: "Apple User",
        email: "user@icloud.com",
        provider: "apple"
      };
      
      localStorage.setItem("access_token", "apple_mock_token");
      localStorage.setItem("user_data", JSON.stringify(mockUserData));
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
      
    } catch (error) {
      console.error("Apple sign-up error:", error);
      alert("Apple sign-up failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  // 🧩 Submit Signup Form (Connect to FastAPI)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: null, // optional (or add input field later)
          password: formData.password,
          confirm_password: formData.confirmPassword, // ✅ ADD THIS LINE
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Signup failed");
      }

      // Show custom success message instead of browser alert
      setShowSuccess(true);
      
      // Navigate after 1.5 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 relative overflow-hidden overflow-y-auto py-6 px-4">
      {/* Simple Success Message Modal - Positioned Middle Upper */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 p-4">
          <div className="flex justify-center pt-20">
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-check text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to TravelNudge!</h3>
              <p className="text-gray-600">Account created successfully! Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-md my-auto">
        <div className="bg-white/90 backdrop-blur-lg border-2 border-gray-300 rounded-2xl shadow-2xl overflow-hidden w-full">
          <div className="h-1 bg-gradient-to-r from-cyan-600 to-blue-600"></div>

          <div className="p-5 sm:p-6">
            {/* Header with Logo */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fa-solid fa-user-plus text-white text-xl"></i>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                Join <span className="bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">TravelNudge</span>
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">Create your account and start your journey</p>
            </div>

            {/* Enhanced Social Buttons */}
            <div className="space-y-3 mb-4">
              <button 
                onClick={handleGoogleSignUp}
                disabled={socialLoading}
                className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-xl transition-all duration-200 ${
                  socialLoading === 'google' 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
                } text-gray-700 font-medium`}
              >
                {socialLoading === 'google' ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-brands fa-google text-red-500 text-lg"></i>
                )}
                <span className="text-sm">
                  {socialLoading === 'google' ? 'Signing up with Google...' : 'Continue with Google'}
                </span>
              </button>

              <button 
                onClick={handleAppleSignUp}
                disabled={socialLoading}
                className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-xl transition-all duration-200 ${
                  socialLoading === 'apple' 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : 'bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
                } text-gray-700 font-medium`}
              >
                {socialLoading === 'apple' ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-brands fa-apple text-gray-800 text-lg"></i>
                )}
                <span className="text-sm">
                  {socialLoading === 'apple' ? 'Signing up with Apple...' : 'Continue with Apple'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="px-3 text-gray-500 text-xs">or sign up with email</div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-user text-gray-500 text-sm"></i>
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-envelope text-gray-500 text-sm"></i>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-500 text-sm"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-sm"
                    required
                  />
                </div>
                {/* Password Strength Bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Password strength:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength <= 1
                            ? "text-red-500"
                            : passwordStrength === 2
                            ? "text-orange-500"
                            : passwordStrength === 3
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                          passwordStrength
                        )}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-500 text-sm"></i>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-cyan-600 bg-white border-2 border-gray-400 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-cyan-700 hover:text-cyan-800">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-cyan-700 hover:text-cyan-800">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || socialLoading || !formData.agreeToTerms}
                className={`w-full py-2.5 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm ${
                  formData.agreeToTerms && !loading && !socialLoading
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-600/40"
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <i className="fa-solid fa-rocket"></i>
                  </>
                )}
              </button>
            </form>

            {/* Already have an account */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-xs">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-cyan-700 hover:text-cyan-800 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-4 p-2.5 bg-cyan-50/80 rounded-xl border-2 border-cyan-200">
              <div className="flex items-center space-x-2 text-xs text-cyan-800">
                <i className="fa-solid fa-shield-halved text-cyan-600 text-sm"></i>
                <span>Your data is securely encrypted and protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-xs"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}