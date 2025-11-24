import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Invalid email or password");
      }

      const data = await response.json();
      console.log("API Response:", data);

      localStorage.setItem("access_token", data.access_token);
      
      let userData;
      
      if (data.user) {
        userData = {
          full_name: data.user.full_name,
          email: data.user.email
        };
      } else {
        userData = {
          full_name: formData.email.split('@')[0],
          email: formData.email
        };
      }
      
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Show custom success message instead of browser alert
      setShowSuccess(true);
      
      // Navigate after 1.5 seconds
      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 relative overflow-hidden overflow-y-auto py-8 px-4">
      {/* Simple Success Message Modal - Positioned Middle Upper */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 p-4">
          <div className="flex justify-center pt-20"> {/* Changed from items-center to pt-20 for upper positioning */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-center max-w-sm">
              <h3 className="text-xl font-bold text-gray-800">You're successfully signed in</h3>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md my-auto">
        <div className="bg-white/90 backdrop-blur-lg border-2 border-gray-300 rounded-2xl shadow-2xl overflow-hidden">
          {/* Gradient Top Bar */}
          <div className="h-1 bg-gradient-to-r from-cyan-600 to-blue-600"></div>

          <div className="p-5 sm:p-6">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <i className="fa-solid fa-compass text-white text-lg"></i>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">Sign in to your TravelNudge account</p>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button className="flex items-center justify-center space-x-2 px-3 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700">
                <i className="fa-brands fa-google text-red-500 text-sm"></i>
                <span className="text-xs font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-3 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-700">
                <i className="fa-brands fa-apple text-gray-700 text-sm"></i>
                <span className="text-xs font-medium">Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="px-3 text-gray-500 text-xs">or continue with email</div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-gray-700">
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
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs text-cyan-700 hover:text-cyan-800 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-500 text-sm"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-white/80 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded ${
                      formData.rememberMe
                        ? "bg-cyan-600 border-cyan-600"
                        : "border-gray-400"
                    } transition-all duration-200 flex items-center justify-center`}
                  >
                    {formData.rememberMe && (
                      <i className="fa-solid fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-xs text-gray-700">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-xl hover:shadow-cyan-600/40 hover:scale-[1.02]"
                } flex items-center justify-center space-x-2 text-sm`}
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-xs">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-700 hover:text-cyan-800 font-semibold transition-colors duration-200"
                >
                  Create account
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
            to="/home"
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