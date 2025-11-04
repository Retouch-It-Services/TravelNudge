import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    date_of_birth: "",
    phone: "",
    travel_preferences: {
      seat_preference: "window",
      meal_preference: "regular",
      special_assistance: false
    }
  });

  // Check authentication and load user data
  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      const userProfile = localStorage.getItem("user_profile");
      if (userProfile) {
        setFormData(JSON.parse(userProfile));
      } else {
        setFormData(prev => ({
          ...prev,
          full_name: parsedUser.full_name,
          email: parsedUser.email
        }));
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("user_profile", JSON.stringify(formData));
    
    const updatedUser = {
      ...user,
      full_name: formData.full_name,
      email: formData.email
    };
    localStorage.setItem("user_data", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    const userProfile = localStorage.getItem("user_profile");
    if (userProfile) {
      setFormData(JSON.parse(userProfile));
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_profile");
    navigate("/");
  };

  const getTravelerType = () => {
    if (!formData.date_of_birth) return "Not specified";
    const dob = new Date(formData.date_of_birth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18) return "Child";
    if (age < 25) return "Young Adult";
    if (age < 60) return "Adult";
    return "Senior";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
        <div className="text-gray-800 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 text-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/90 backdrop-blur-lg border-b-2 border-gray-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-compass text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
                TravelNudge
              </span>
            </div>
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 rounded-lg border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-100 transition-all flex items-center space-x-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.full_name ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : "U"}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-600/40 transition-all flex items-center space-x-2"
                    >
                      <i className="fa-solid fa-pen"></i>
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-check"></i>
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center space-x-2"
                      >
                        <i className="fa-solid fa-times"></i>
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative">
                          <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-gray-800 placeholder-gray-500 disabled:bg-gray-100/50 disabled:text-gray-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative">
                          <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-gray-800 placeholder-gray-500 disabled:bg-gray-100/50 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-gray-800 placeholder-gray-500 disabled:bg-gray-100/50 disabled:text-gray-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-gray-800 placeholder-gray-500 disabled:bg-gray-100/50 disabled:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Traveler Details & Actions */}
            <div className="space-y-6">
              
            

              {/* Account Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Account Actions</h2>
                
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 text-left bg-white/80 hover:bg-white rounded-lg transition-colors flex items-center space-x-3 text-gray-700 hover:text-gray-900 border-2 border-gray-300">
                    <i className="fa-solid fa-shield-alt text-cyan-600"></i>
                    <span>Privacy Settings</span>
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left bg-white/80 hover:bg-white rounded-lg transition-colors flex items-center space-x-3 text-gray-700 hover:text-gray-900 border-2 border-gray-300">
                    <i className="fa-solid fa-bell text-cyan-600"></i>
                    <span>Notification Preferences</span>
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left bg-white/80 hover:bg-white rounded-lg transition-colors flex items-center space-x-3 text-gray-700 hover:text-gray-900 border-2 border-gray-300">
                    <i className="fa-solid fa-credit-card text-cyan-600"></i>
                    <span>Payment Methods</span>
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left bg-white/80 hover:bg-white rounded-lg transition-colors flex items-center space-x-3 text-gray-700 hover:text-gray-900 border-2 border-gray-300">
                    <i className="fa-solid fa-question-circle text-cyan-600"></i>
                    <span>Help & Support</span>
                  </button>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center space-x-3 font-semibold"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Sign Out</span>
              </button>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}