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
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Signup failed");
      }

      alert("✅ Account created successfully! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden overflow-y-auto py-6 px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-md my-auto">
        <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden w-full">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

          <div className="p-5 sm:p-6">
            {/* Header with Logo */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fa-solid fa-user-plus text-white text-xl"></i>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Join <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">TravelNudge</span>
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm">Create your account and start your journey</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  required
                />
                {/* Password Strength Bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Password strength:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength <= 1
                            ? "text-red-400"
                            : passwordStrength === 2
                            ? "text-orange-400"
                            : passwordStrength === 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
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
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className={`w-full py-2.5 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm ${
                  formData.agreeToTerms && !loading
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                    : "bg-gray-700 cursor-not-allowed opacity-50"
                }`}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
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
              <p className="text-gray-400 text-xs">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-xs"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}