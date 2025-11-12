// src/pages/SignInPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // ✅ Email/Password Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/Home");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Sign In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google!");
      navigate("/Home");
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Forgot Password Logic
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setShowForgot(false);
      setShowSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 px-4 py-8 relative">
      {/* Main Sign-In Box */}
      <div className="w-full max-w-md bg-white/90 border border-gray-300 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to{" "}
          <span className="bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
            TravelNudge
          </span>
        </h1>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-xs text-cyan-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-xl border-gray-400 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-700 hover:text-cyan-800 font-semibold"
          >
            Sign up
          </Link>
        </p>

        <div className="text-center mt-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-xs"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
            <span>Back to home</span>
          </Link>
        </div>
      </div>

      {/* Forgot Password Popup */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Forgot password?
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter your email address to receive reset instructions.
            </p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
              >
                Send Reset Instructions
              </button>
            </form>
            <button
              onClick={() => setShowForgot(false)}
              className="block mt-3 text-sm text-gray-600 hover:underline mx-auto"
            >
              ← Go back
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Password reset instructions have been sent successfully via email.
              <br />
              Please check your inbox or spam folder.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
