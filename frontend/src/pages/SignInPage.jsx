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
      console.log("API Response:", data); // Debug: see what your backend returns

      // Store JWT token and user data with the correct keys
      localStorage.setItem("access_token", data.access_token); // Changed from "token" to "access_token"
      
      // Also store user data - you need to get this from your API response
      // If your API returns user data, use it. Otherwise create from email.
      let userData;
      
      if (data.user) {
        // If your API returns user data
        userData = {
          full_name: data.user.full_name,
          email: data.user.email
        };
      } else {
        // Fallback: create user data from email
        userData = {
          full_name: formData.email.split('@')[0], // Use email prefix as name
          email: formData.email
        };
      }
      
      localStorage.setItem("user_data", JSON.stringify(userData));

      alert("✅ Login successful!");
      navigate("/home"); // redirect to landing page (changed from "/home")
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Gradient Top Bar */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <i className="fa-solid fa-compass text-white text-2xl"></i>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-400 mt-2">Sign in to your TravelNudge account</p>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-600 rounded-xl hover:bg-gray-800/50 transition-all duration-200">
                <i className="fa-brands fa-google text-red-400"></i>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-600 rounded-xl hover:bg-gray-800/50 transition-all duration-200">
                <i className="fa-brands fa-apple text-gray-300"></i>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-600"></div>
              <div className="px-3 text-gray-400 text-sm">or continue with email</div>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-lock text-gray-400"></i>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${
                      formData.rememberMe
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-gray-500"
                    } transition-all duration-200 flex items-center justify-center`}
                  >
                    {formData.rememberMe && (
                      <i className="fa-solid fa-check text-white text-xs"></i>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105"
                } flex items-center justify-center space-x-2`}
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
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <i className="fa-solid fa-shield-alt text-cyan-400"></i>
                <span>Your data is securely encrypted and protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}