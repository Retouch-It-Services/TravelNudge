import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // ✅ Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");
    const isGuest = localStorage.getItem("is_guest") === "true";
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else if (isGuest) {
      setIsLoggedIn(true);
      setUser({ full_name: "Guest User", email: "guest@example.com" });
    } else {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user?.full_name) return "U";
    return user.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    // Simulated AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: "I'm here to help you find the best travel offer options! Where would you like to go?",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessageInput("");
  };

  const handleMyProfile = () => navigate("/profile");
  const handleFileUpload = () => fileInputRef.current?.click();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-compass text-white text-2xl"></i>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading TravelNudge AI</h2>
          <p className="text-gray-600">Preparing your travel companion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200 flex flex-col z-30
          transition-all duration-500 ease-out shadow-xl
          ${isSidebarOpen ? "w-80" : "w-20"}`}
      >

        {/* Sidebar Header with Logo */}
        <div className="p-6  border-gray-200 flex items-center justify-between">
          <div className={`flex items-center space-x-3 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-compass text-white text-lg"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">TravelNudge</h2>
              <p className="text-xs text-gray-500">AI Assistant</p>
            </div>
          </div>
          
          {/* Logo when collapsed */}
          {!isSidebarOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-compass text-white text-lg"></i>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 ml-auto"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <i className={`fa-solid ${isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"} text-gray-600 text-sm`}></i>
          </button>
        </div>

        {/* New Chat */}
        <div className="p-4  border-gray-200">
          {isSidebarOpen ? (
            <button
              onClick={handleNewChat}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>New Chat</span>
            </button>
          ) : (
            <button
              onClick={handleNewChat}
              title="New Chat"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fa-solid fa-plus text-sm"></i>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="p-4  border-gray-200">
          {isSidebarOpen ? (
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                placeholder="Search chats..."
              />
            </div>
          ) : (
            <button 
              title="Search"
              className="w-full flex justify-center p-3 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fa-solid fa-search text-sm"></i>
            </button>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {isSidebarOpen ? (
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Chats</h3>
              <div className="space-y-2">
                {messages.length > 0 ? (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 hover:bg-indigo-100 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-gray-800 truncate">Current Conversation</p>
                    <p className="text-xs text-gray-500 mt-1">{messages.length} messages</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-comments text-indigo-600 text-xl"></i>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">No conversations yet</p>
                    <p className="text-gray-400 text-xs">Start a new chat to begin</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 space-y-4">
              <button 
                title="Chats"
                className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all w-12 h-12 flex items-center justify-center"
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="fa-solid fa-comment-dots text-lg"></i>
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className=" border-gray-200 p-4">
          <button
            title="Profile"
            onClick={() => {
              if (isSidebarOpen) {
                setShowProfileMenu(!showProfileMenu);
              } else {
                setIsSidebarOpen(true);
              }
            }}
            className={`flex items-center w-full p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 ${
              isSidebarOpen ? "justify-start space-x-3" : "justify-center"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
              {getUserInitials()}
            </div>

            {isSidebarOpen && (
              <div className="text-left flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">{user?.full_name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && isSidebarOpen && (
            <div className="mt-2 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in duration-200">
              <button 
                onClick={handleMyProfile} 
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700 text-sm border-b border-gray-100"
              >
                <i className="fa-solid fa-user w-4 text-indigo-600"></i>
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => navigate("/support")} 
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700 text-sm border-b border-gray-100"
              >
                <i className="fa-solid fa-headset w-4 text-indigo-600"></i>
                <span>Support</span>
              </button>
              <button 
                onClick={handleLogout} 
                className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-600 text-sm"
              >
                <i className="fa-solid fa-right-from-bracket w-4"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-500 ease-out ${isSidebarOpen ? "ml-80" : "ml-20"}`}>
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 p-4 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-compass text-white text-2xl"></i>
              </div> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">TravelNudge AI</h1>
                <p className="text-indigo-600 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Online • Ready to help
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-2xl mx-auto">
                
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Welcome to TravelNudge AI
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Stop the search headache. TravelNudge finds all your transport deals in one spot.
                </p>
                
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === "user" ? "text-indigo-100" : "text-gray-400"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </main>

        {/* Message Input */}
        <div className="bg-white/80 border-t border-gray-200 p-4 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSendMessage}
              className="flex items-end space-x-3 bg-white border border-gray-300 rounded-2xl p-2 shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500"
            >
              <div className="flex-1">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Say Hi.... Where would you like to go?"
                  className="w-full px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500 text-sm resize-none min-h-[40px] max-h-[120px]"
                  rows="1"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
                <div className="flex items-center space-x-3 px-2 pb-1">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
                    title="Attach file"
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" />
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
                    title="Add image"
                  >
                    <i className="fa-solid fa-image"></i>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 flex items-center justify-center min-w-[56px]"
                title="Send message"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}