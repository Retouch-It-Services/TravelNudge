import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Check authentication status - MODIFIED to allow guest users
  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");
    const isGuest = localStorage.getItem("is_guest") === "true";
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else if (isGuest) {
      // Allow guest access
      setIsLoggedIn(true);
      setUser({ full_name: "Guest User", email: "guest@example.com" });
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Sample chat data
  const chatCategories = {
    today: [
      {
        id: 1,
        title: "Paris Trip Planning",
        lastMessage: "I found some great hotels near the Eiffel Tower",
        timestamp: "10:30 AM",
        unread: 2,
        type: "travel"
      },
      {
        id: 2,
        title: "Flight Options to Tokyo",
        lastMessage: "Here are the best flight deals for your dates",
        timestamp: "9:15 AM",
        unread: 0,
        type: "flights"
      }
    ],
    recent: [
      {
        id: 3,
        title: "Bali Vacation Ideas",
        lastMessage: "Let me know your budget for the trip",
        timestamp: "Yesterday",
        unread: 0,
        type: "vacation"
      },
      {
        id: 4,
        title: "Business Trip NYC",
        lastMessage: "Your hotel is confirmed near Times Square",
        timestamp: "Dec 12",
        unread: 0,
        type: "business"
      },
      {
        id: 5,
        title: "Family Beach Vacation",
        lastMessage: "Here are some family-friendly resorts",
        timestamp: "Dec 10",
        unread: 0,
        type: "family"
      }
    ]
  };

  const chatMessages = {
    1: [
      { id: 1, type: "ai", message: "Hello! I'm excited to help you plan your Paris trip. What kind of experience are you looking for?", timestamp: "10:00 AM" },
      { id: 2, type: "user", message: "I want to visit the Eiffel Tower and Louvre Museum", timestamp: "10:15 AM" },
      { id: 3, type: "ai", message: "Great choices! I found some excellent hotels within walking distance of both attractions. Would you prefer luxury or budget options?", timestamp: "10:30 AM" }
    ],
    2: [
      { id: 1, type: "ai", message: "I've analyzed flight options to Tokyo for your dates. The best deals are with Japan Airlines and ANA.", timestamp: "9:00 AM" },
      { id: 2, type: "user", message: "Which one has better legroom?", timestamp: "9:10 AM" },
      { id: 3, type: "ai", message: "Japan Airlines generally offers more legroom in economy class. Would you like me to check specific seat configurations?", timestamp: "9:15 AM" }
    ]
  };

  const quickPrompts = [
    "Find Flights to Bangalore",
    "Find Buses to Bangalore",
    "Find Trains to Bangalore",
    "Find Cabs to Bangalore",
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("is_guest"); // Remove guest flag
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user?.full_name) return "U";
    return user.full_name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNewChat = () => {
    const newChatId = Math.max(...Object.keys(chatMessages).map(Number)) + 1;
    const newChat = {
      id: newChatId,
      title: "New Travel Planning",
      lastMessage: "Start planning your next adventure!",
      timestamp: "Just now",
      unread: 0,
      type: "new"
    };
    
    setActiveChat(newChatId);
    // In a real app, you would add this to your chat state
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    // In a real app, you would send the message to your backend
    // and update the chat state
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  const handleQuickPrompt = (prompt) => {
    setMessageInput(prompt);
  };

  // NEW FUNCTION: Handle sign up for full access
  const handleSignUpForFullAccess = () => {
    localStorage.removeItem("is_guest"); // Remove guest flag
    localStorage.setItem("came_from_home", "true"); // Set flag for landing page
    navigate("/"); // Navigate to landing page
  };

  // NEW FUNCTION: Navigate to Profile Page
  const handleMyProfile = () => {
    navigate("/profile");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex">
      {/* Left Side - Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-compass text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold">TravelNudge AI</h1>
                <p className="text-cyan-300 text-sm">
                  {localStorage.getItem("is_guest") === "true" ? "Guest Mode • Limited Features" : "Online • Ready to help with your travels"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeChat && chatMessages[activeChat] ? (
            chatMessages[activeChat].map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    msg.type === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-gray-700/80 text-gray-200 rounded-bl-none border border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {msg.type === 'ai' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-robot text-white text-sm"></i>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-cyan-200' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-user text-white text-sm"></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Welcome screen when no chat is selected
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-compass text-white text-3xl"></i>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome to TravelNudge AI</h2>
                {localStorage.getItem("is_guest") === "true" && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
                    <p className="text-yellow-300 text-sm">
                      You are in guest mode. Some features may be limited. 
                      <button 
                        onClick={handleSignUpForFullAccess}
                        className="ml-2 text-cyan-300 hover:text-cyan-200 underline"
                      >
                        Sign up for full access
                      </button>
                    </p>
                  </div>
                )}
              </div>
              
              {/* Quick Prompts */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl mt-8">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-cyan-500/50 hover:bg-gray-800/70 transition-all text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <i className="fa-solid fa-bolt text-cyan-400"></i>
                      </div>
                      <span className="text-sm">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input Area */}
        <div className="border-t border-gray-700 p-4 bg-gray-800/30">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask about travel destinations, flights, hotels..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white placeholder-gray-400"
                disabled={!activeChat}
              />
              {!activeChat && (
                <div className="absolute inset-0 bg-gray-800/50 rounded-xl flex items-center justify-center">
                  {/* <span className="text-gray-400 text-sm">Select a chat or start a new one</span> */}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!messageInput.trim() || !activeChat}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {quickPrompts.slice(0, 4).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-2 text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-colors border border-gray-600"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Chat History */}
      <div className="w-80 bg-gray-800/30 backdrop-blur-sm border-l border-gray-700 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={handleNewChat}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>New Chat</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {/* Today's Chats */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Today</h3>
            <div className="space-y-2">
              {chatCategories.today.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeChat === chat.id
                      ? 'bg-cyan-500/20 border border-cyan-500/30'
                      : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-white text-sm truncate">{chat.title}</h4>
                    {chat.unread > 0 && (
                      <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate mb-1">{chat.lastMessage}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 text-xs">{chat.timestamp}</span>
                    <span className="text-xs px-2 py-1 bg-gray-600 rounded-full capitalize">
                      {chat.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Chats */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Recent</h3>
            <div className="space-y-2">
              {chatCategories.recent.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeChat === chat.id
                      ? 'bg-cyan-500/20 border border-cyan-500/30'
                      : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-white text-sm truncate">{chat.title}</h4>
                    {chat.unread > 0 && (
                      <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs truncate mb-1">{chat.lastMessage}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{chat.timestamp}</span>
                    <span className="text-xs px-2 py-1 bg-gray-600 rounded-full capitalize">
                      {chat.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Section at Bottom */}
        <div className="border-t border-gray-700 p-4">
          <div className="relative profile-menu-container">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all border border-gray-600 w-full"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-semibold text-white">
                {getUserInitials()}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-white text-sm">{user?.full_name || "User"}</div>
                <div className="text-gray-400 text-xs">
                  {localStorage.getItem("is_guest") === "true" ? "Guest User" : user?.email || ""}
                </div>
              </div>
              <i className={`fa-solid fa-chevron-down text-sm transition-transform text-gray-400 ${showProfileMenu ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-semibold text-lg text-white">
                      {getUserInitials()}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{user?.full_name || "User"}</div>
                      <div className="text-gray-400 text-xs">
                        {localStorage.getItem("is_guest") === "true" ? "Guest Mode" : user?.email || "No email"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button 
                    onClick={handleMyProfile}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors flex items-center space-x-3 text-gray-300 text-sm"
                  >
                    <i className="fa-solid fa-user w-4"></i>
                    <span>My Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors flex items-center space-x-3 text-gray-300 text-sm">
                    <i className="fa-solid fa-suitcase w-4"></i>
                    <span>My Routes</span>
                  </button>
                   <button
        onClick={() => navigate("/support")} 
        className="w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors flex items-center space-x-3 text-gray-300 text-sm"
      >
        <i className="fa-solid fa-question w-4"></i>
        <span>Support</span>
      </button>
                </div>

                <div className="border-t border-gray-700 py-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-red-500/10 text-red-400 transition-colors flex items-center space-x-3 text-sm"
                  >
                    <i className="fa-solid fa-right-from-bracket w-4"></i>
                    <span>{localStorage.getItem("is_guest") === "true" ? "Exit Guest Mode" : "Sign Out"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}