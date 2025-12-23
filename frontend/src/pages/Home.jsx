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
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerModalData, setOfferModalData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Check authentication status
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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // City database with transportation availability
  const cityDatabase = {
    // Major Metro Cities
    "bangalore": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "bengaluru": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "mumbai": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "delhi": { hasAirport: true, hasRailway: true, state: "Delhi" },
    "new delhi": { hasAirport: true, hasRailway: true, state: "Delhi" },
    "hyderabad": { hasAirport: true, hasRailway: true, state: "Telangana" },
    "chennai": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "kolkata": { hasAirport: true, hasRailway: true, state: "West Bengal" },
    "pune": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "ahmedabad": { hasAirport: true, hasRailway: true, state: "Gujarat" },

    // Tier 1 Cities
    "jaipur": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "lucknow": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "chandigarh": { hasAirport: true, hasRailway: true, state: "Chandigarh" },
    "kochi": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "cochin": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "goa": { hasAirport: true, hasRailway: true, state: "Goa" },
    "panaji": { hasAirport: true, hasRailway: true, state: "Goa" },
    "thiruvananthapuram": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "trivandrum": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "bhubaneswar": { hasAirport: true, hasRailway: true, state: "Odisha" },
    "indore": { hasAirport: true, hasRailway: true, state: "Madhya Pradesh" },
    "coimbatore": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "visakhapatnam": { hasAirport: true, hasRailway: true, state: "Andhra Pradesh" },
    "vizag": { hasAirport: true, hasRailway: true, state: "Andhra Pradesh" },
    "nagpur": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "surat": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "vadodara": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "baroda": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "patna": { hasAirport: true, hasRailway: true, state: "Bihar" },
    "bhopal": { hasAirport: true, hasRailway: true, state: "Madhya Pradesh" },
    "ludhiana": { hasAirport: true, hasRailway: true, state: "Punjab" },
    "agra": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "varanasi": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "banaras": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "amritsar": { hasAirport: true, hasRailway: true, state: "Punjab" },
    "guwahati": { hasAirport: true, hasRailway: true, state: "Assam" },
    "ranchi": { hasAirport: true, hasRailway: true, state: "Jharkhand" },

    // Karnataka Cities
    "mysore": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "mysuru": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "mangalore": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "mangaluru": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "hubli": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "hubballi": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "bellary": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "ballari": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "belgaum": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "belagavi": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "shimoga": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "shivamogga": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "davangere": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "davanagere": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "tumkur": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "tumakuru": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "hassan": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "gulbarga": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "kalaburagi": { hasAirport: true, hasRailway: true, state: "Karnataka" },
    "bijapur": { hasAirport: false, hasRailway: true, state: "Karnataka" },
    "vijayapura": { hasAirport: false, hasRailway: true, state: "Karnataka" },

    // Tamil Nadu Cities
    "madurai": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "tiruchirappalli": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "trichy": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "salem": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "tiruppur": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "erode": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "vellore": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "tirunelveli": { hasAirport: true, hasRailway: true, state: "Tamil Nadu" },
    "thanjavur": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "tanjore": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "nagercoil": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "kanyakumari": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "ooty": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "udhagamandalam": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },
    "kodaikanal": { hasAirport: false, hasRailway: false, state: "Tamil Nadu" },
    "pondicherry": { hasAirport: true, hasRailway: true, state: "Puducherry" },
    "puducherry": { hasAirport: true, hasRailway: true, state: "Puducherry" },
    "hosur": { hasAirport: false, hasRailway: true, state: "Tamil Nadu" },

    // Andhra Pradesh & Telangana
    "tirupati": { hasAirport: true, hasRailway: true, state: "Andhra Pradesh" },
    "vijayawada": { hasAirport: true, hasRailway: true, state: "Andhra Pradesh" },
    "guntur": { hasAirport: false, hasRailway: true, state: "Andhra Pradesh" },
    "nellore": { hasAirport: false, hasRailway: true, state: "Andhra Pradesh" },
    "kakinada": { hasAirport: false, hasRailway: true, state: "Andhra Pradesh" },
    "rajahmundry": { hasAirport: true, hasRailway: true, state: "Andhra Pradesh" },
    "warangal": { hasAirport: false, hasRailway: true, state: "Telangana" },
    "nizamabad": { hasAirport: false, hasRailway: true, state: "Telangana" },
    "karimnagar": { hasAirport: false, hasRailway: true, state: "Telangana" },

    // Maharashtra Cities
    "nashik": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "aurangabad": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "solapur": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "kolhapur": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "thane": { hasAirport: false, hasRailway: true, state: "Maharashtra" },
    "navi mumbai": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "amravati": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "akola": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "latur": { hasAirport: true, hasRailway: true, state: "Maharashtra" },
    "sangli": { hasAirport: false, hasRailway: true, state: "Maharashtra" },

    // Gujarat Cities
    "rajkot": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "bhavnagar": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "jamnagar": { hasAirport: true, hasRailway: true, state: "Gujarat" },
    "gandhinagar": { hasAirport: false, hasRailway: true, state: "Gujarat" },
    "anand": { hasAirport: false, hasRailway: true, state: "Gujarat" },
    "mehsana": { hasAirport: false, hasRailway: true, state: "Gujarat" },
    "navsari": { hasAirport: false, hasRailway: true, state: "Gujarat" },

    // Rajasthan Cities
    "udaipur": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "jodhpur": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "kota": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "bikaner": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "ajmer": { hasAirport: true, hasRailway: true, state: "Rajasthan" },
    "alwar": { hasAirport: false, hasRailway: true, state: "Rajasthan" },
    "bharatpur": { hasAirport: false, hasRailway: true, state: "Rajasthan" },
    "mount abu": { hasAirport: false, hasRailway: false, state: "Rajasthan" },

    // Uttar Pradesh Cities
    "kanpur": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "ghaziabad": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },
    "noida": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },
    "greater noida": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "meerut": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },
    "allahabad": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "prayagraj": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "gorakhpur": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "bareilly": { hasAirport: true, hasRailway: true, state: "Uttar Pradesh" },
    "aligarh": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },
    "mathura": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },
    "vrindavan": { hasAirport: false, hasRailway: true, state: "Uttar Pradesh" },

    // Kerala Cities
    "kozhikode": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "calicut": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "thrissur": { hasAirport: false, hasRailway: true, state: "Kerala" },
    "kollam": { hasAirport: false, hasRailway: true, state: "Kerala" },
    "alappuzha": { hasAirport: false, hasRailway: true, state: "Kerala" },
    "alleppey": { hasAirport: false, hasRailway: true, state: "Kerala" },
    "palakkad": { hasAirport: false, hasRailway: true, state: "Kerala" },
    "kannur": { hasAirport: true, hasRailway: true, state: "Kerala" },
    "munnar": { hasAirport: false, hasRailway: false, state: "Kerala" },
    "wayanad": { hasAirport: false, hasRailway: false, state: "Kerala" },

    // Punjab & Haryana
    "jalandhar": { hasAirport: true, hasRailway: true, state: "Punjab" },
    "patiala": { hasAirport: false, hasRailway: true, state: "Punjab" },
    "bathinda": { hasAirport: true, hasRailway: true, state: "Punjab" },
    "mohali": { hasAirport: false, hasRailway: true, state: "Punjab" },
    "faridabad": { hasAirport: false, hasRailway: true, state: "Haryana" },
    "gurgaon": { hasAirport: false, hasRailway: true, state: "Haryana" },
    "gurugram": { hasAirport: false, hasRailway: true, state: "Haryana" },
    "panipat": { hasAirport: false, hasRailway: true, state: "Haryana" },
    "rohtak": { hasAirport: false, hasRailway: true, state: "Haryana" },
    "ambala": { hasAirport: false, hasRailway: true, state: "Haryana" },

    // Hill Stations & Tourist Places
    "jammu": { hasAirport: true, hasRailway: true, state: "Jammu and Kashmir" },
    "srinagar": { hasAirport: true, hasRailway: true, state: "Jammu and Kashmir" },
    "leh": { hasAirport: true, hasRailway: false, state: "Ladakh" },
    "ladakh": { hasAirport: true, hasRailway: false, state: "Ladakh" },
    "dehradun": { hasAirport: true, hasRailway: true, state: "Uttarakhand" },
    "haridwar": { hasAirport: false, hasRailway: true, state: "Uttarakhand" },
    "rishikesh": { hasAirport: false, hasRailway: false, state: "Uttarakhand" },
    "nainital": { hasAirport: false, hasRailway: false, state: "Uttarakhand" },
    "mussoorie": { hasAirport: false, hasRailway: false, state: "Uttarakhand" },
    "shimla": { hasAirport: true, hasRailway: true, state: "Himachal Pradesh" },
    "manali": { hasAirport: true, hasRailway: false, state: "Himachal Pradesh" },
    "dharamshala": { hasAirport: true, hasRailway: false, state: "Himachal Pradesh" },
    "kullu": { hasAirport: true, hasRailway: false, state: "Himachal Pradesh" },
    "dalhousie": { hasAirport: false, hasRailway: false, state: "Himachal Pradesh" },

    // Northeast India
    "shillong": { hasAirport: true, hasRailway: false, state: "Meghalaya" },
    "imphal": { hasAirport: true, hasRailway: false, state: "Manipur" },
    "agartala": { hasAirport: true, hasRailway: true, state: "Tripura" },
    "aizawl": { hasAirport: true, hasRailway: false, state: "Mizoram" },
    "kohima": { hasAirport: true, hasRailway: false, state: "Nagaland" },
    "dibrugarh": { hasAirport: true, hasRailway: true, state: "Assam" },
    "silchar": { hasAirport: true, hasRailway: true, state: "Assam" },

    // Other Important Cities
    "raipur": { hasAirport: true, hasRailway: true, state: "Chhattisgarh" },
    "bilaspur": { hasAirport: false, hasRailway: true, state: "Chhattisgarh" },
    "jamshedpur": { hasAirport: true, hasRailway: true, state: "Jharkhand" },
    "dhanbad": { hasAirport: false, hasRailway: true, state: "Jharkhand" },
    "bokaro": { hasAirport: false, hasRailway: true, state: "Jharkhand" },
    "cuttack": { hasAirport: false, hasRailway: true, state: "Odisha" },
    "puri": { hasAirport: false, hasRailway: true, state: "Odisha" },
    "siliguri": { hasAirport: true, hasRailway: true, state: "West Bengal" },
    "darjeeling": { hasAirport: false, hasRailway: true, state: "West Bengal" },
    "durgapur": { hasAirport: false, hasRailway: true, state: "West Bengal" },
    "asansol": { hasAirport: false, hasRailway: true, state: "West Bengal" },
  };

  // Function to normalize city names (handle variations and common misspellings)
  const normalizeCityName = (cityName) => {
    const normalized = cityName.toLowerCase().trim();

    // Common city name variations
    const cityAliases = {
      'bengaluru': 'bangalore',
      'bombay': 'mumbai',
      'calcutta': 'kolkata',
      'madras': 'chennai',
      'trivandrum': 'thiruvananthapuram',
      'pondy': 'pondicherry',
      'vizag': 'visakhapatnam',
      'hyd': 'hyderabad',
      'blr': 'bangalore',
      'del': 'delhi',
      'mum': 'mumbai',
      'chn': 'chennai',
      'kol': 'kolkata',
    };

    return cityAliases[normalized] || normalized;
  };

  // Function to calculate approximate distance (simplified)
  const estimateDistance = (origin, destination) => {
    // This is a simplified estimation - in production, use actual distance calculation
    const sameCity = origin === destination;
    if (sameCity) return 0;

    const originData = cityDatabase[origin];
    const destData = cityDatabase[destination];

    // Same state = shorter distance
    if (originData?.state === destData?.state) {
      return Math.random() * 300 + 100; // 100-400 km
    }

    // Different states = longer distance
    return Math.random() * 1500 + 400; // 400-1900 km
  };

  // Function to determine available transportation modes
  const getAvailableTransportation = (origin, destination) => {
    // Normalize city names to handle variations
    const normalizedOrigin = normalizeCityName(origin);
    const normalizedDest = normalizeCityName(destination);

    const originCity = cityDatabase[normalizedOrigin];
    const destCity = cityDatabase[normalizedDest];
    const distance = estimateDistance(normalizedOrigin, normalizedDest);

    const transportData = {};

    // Flights - if both cities have airports
    if (originCity?.hasAirport && destCity?.hasAirport) {
      transportData.flights = [
        { name: "MakeMyTrip", color: "bg-red-50 text-red-600" },
        { name: "Skyscanner", color: "bg-sky-50 text-sky-600" },
        { name: "Goibibo", color: "bg-orange-50 text-orange-600" },
        { name: "AirAsia", color: "bg-red-50 text-red-600" },
        { name: "Indigo", color: "bg-blue-50 text-blue-600" }
      ];
    }

    // Trains - if both cities have railway connectivity
    if (originCity?.hasRailway && destCity?.hasRailway) {
      transportData.trains = [
        { name: "IRCTC", color: "bg-blue-50 text-blue-600" },
        { name: "Ixigo", color: "bg-indigo-50 text-indigo-600" },
        { name: "Goibibo", color: "bg-orange-50 text-orange-600" },
        { name: "MakeMyTrip", color: "bg-red-50 text-red-600" }
      ];
    }

    // Buses - available for all known city pairs
    if (originCity && destCity) {
      transportData.buses = [
        { name: "RedBus", color: "bg-red-50 text-red-600" },
        { name: "AbhiBus", color: "bg-red-50 text-red-600" },
        { name: "Goibibo", color: "bg-orange-50 text-orange-600" },
        { name: "MakeMyTrip", color: "bg-red-50 text-red-600" }
      ];
    }

    // Cabs - for shorter distances (same state or nearby cities)
    if (originCity && destCity) {
      // Show cabs for same state routes or if distance is reasonable
      const isSameState = originCity.state === destCity.state;
      const isShortDistance = distance < 500;

      if (isSameState || isShortDistance) {
        transportData.cabs = [
          { name: "Uber", color: "bg-gray-50 text-gray-800" },
          { name: "Ola", color: "bg-yellow-50 text-yellow-600" },
          { name: "MakeMyTrip", color: "bg-red-50 text-red-600" },
          { name: "Goibibo", color: "bg-orange-50 text-orange-600" }
        ];
      }
    }

    // If cities not in database, show limited options with a note
    if (!originCity || !destCity) {
      console.log(`Cities not found - Origin: "${origin}" (normalized: "${normalizedOrigin}"), Destination: "${destination}" (normalized: "${normalizedDest}")`);
      return {
        buses: [
          { name: "RedBus", color: "bg-red-50 text-red-600" },
          { name: "AbhiBus", color: "bg-red-50 text-red-600" },
          { name: "Goibibo", color: "bg-orange-50 text-orange-600" }
        ]
      };
    }

    return transportData;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageInput("");
    setIsTyping(true);

    // Check for greetings and show language selector if not selected
    const greetings = ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'vanakkam', 'namaskara', 'hola', 'bonjour'];
    const isGreeting = greetings.some(greeting => messageInput.toLowerCase().trim() === greeting);

    if (isGreeting && !selectedLanguage) {
      setTimeout(() => {
        setIsTyping(false);
        setShowLanguageSelector(true);
      }, 500);
      return;
    }

    // Content Moderation - Check for harmful/inappropriate content
    const inappropriateKeywords = [
      // Violence & Harm
      'kill', 'murder', 'death', 'suicide', 'harm', 'hurt', 'attack', 'weapon', 'gun', 'knife', 'bomb', 'terror',
      'violence', 'abuse', 'assault', 'fight', 'beat', 'shoot', 'stab', 'rage', 'angry', 'hate',
      // Explicit Content
      'nude', 'naked', 'sex', 'porn', 'xxx', 'adult', 'explicit', 'nsfw', 'erotic',
      // Drugs & Illegal
      'drug', 'cocaine', 'heroin', 'weed', 'marijuana', 'meth', 'illegal', 'smuggle', 'trafficking',
      // Hate Speech
      'racist', 'discrimination', 'slur', 'offensive',
      // Scams & Fraud
      'scam', 'fraud', 'cheat', 'steal', 'hack', 'phishing'
    ];

    const lowerMessage = messageInput.toLowerCase();
    const containsInappropriate = inappropriateKeywords.some(keyword =>
      lowerMessage.includes(keyword)
    );

    if (containsInappropriate) {
      setTimeout(() => {
        const warningMessages = {
          english: "I'm sorry, but I'm not designed to provide such content. I'm here to help you with travel-related queries only. Please ask me about travel destinations, routes, bookings, or transportation options.",
          hindi: "क्षमा करें, लेकिन मैं ऐसी सामग्री प्रदान करने के लिए डिज़ाइन नहीं किया गया हूं। मैं केवल यात्रा से संबंधित प्रश्नों में आपकी सहायता के लिए यहां हूं। कृपया मुझसे यात्रा गंतव्यों, मार्गों, बुकिंग या परिवहन विकल्पों के बारे में पूछें।",
          kannada: "ಕ್ಷಮಿಸಿ, ಆದರೆ ನಾನು ಅಂತಹ ವಿಷಯವನ್ನು ಒದಗಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿಲ್ಲ. ನಾನು ಪ್ರಯಾಣ-ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಮಾತ್ರ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಪ್ರಯಾಣ ತಾಣಗಳು, ಮಾರ್ಗಗಳು, ಬುಕಿಂಗ್‌ಗಳು ಅಥವಾ ಸಾರಿಗೆ ಆಯ್ಕೆಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ."
        };

        const warningMessage = warningMessages[selectedLanguage] || warningMessages.english;

        const aiResponse = {
          id: Date.now() + 1,
          text: warningMessage,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "warning"
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // Travel Route Search Logic
    if (messageInput.toLowerCase().includes(" to ")) {
      setTimeout(() => {
        // Extract origin and destination from the message
        const lowerInput = messageInput.toLowerCase();

        // Find the last occurrence of " to " to split origin and destination
        const lastToIndex = lowerInput.lastIndexOf(" to ");

        if (lastToIndex === -1) {
          return; // Safety check
        }

        const beforeTo = lowerInput.substring(0, lastToIndex);
        const afterTo = lowerInput.substring(lastToIndex + 4); // +4 to skip " to "

        // Clean up the origin and destination by removing common words
        const cleanCityName = (text) => {
          // Remove common travel-related words
          const wordsToRemove = ['i', 'want', 'travel', 'from', 'go', 'going', 'trip', 'journey', 'visit', 'visiting', 'the', 'to'];
          const words = text.trim().split(' ');
          const cleanedWords = words.filter(word => !wordsToRemove.includes(word.toLowerCase()) && word.length > 0);

          // Join remaining words (handles multi-word cities like "New Delhi", "Greater Noida")
          return cleanedWords.join(' ').trim();
        };

        const origin = cleanCityName(beforeTo);
        const destination = cleanCityName(afterTo);

        console.log("=== Route Parsing Debug ===");
        console.log("Original input:", messageInput);
        console.log("Last 'to' index:", lastToIndex);
        console.log("Before 'to':", beforeTo);
        console.log("After 'to':", afterTo);
        console.log("Cleaned origin:", origin);
        console.log("Cleaned destination:", destination);

        // Store the route and show date picker
        setPendingRoute({
          origin,
          destination,
          userText: userMessage.text
        });

        setIsTyping(false);
        setShowDatePicker(true);
      }, 800);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ message: userMessage.text })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();

      const aiResponse = {
        id: Date.now() + 1,
        text: data.response || "Sorry, I didn't understand that.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 2,
        text: "⚠️ Connection error. Please check your backend server.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCheckOffers = (provider, category, text) => {
    setIsTyping(true);
    // Extract route roughly from the previous message text
    const route = text.split("trip: ")[1] || "your destination";

    setTimeout(() => {
      // Generate realistic offers with detailed information
      const generateOffers = () => {
        const offers = [];

        // Flight-specific data
        const flightNames = ["IndiGo 6E-2156", "Air India AI-503", "SpiceJet SG-8156", "Vistara UK-851", "AirAsia I5-1421"];
        const flightClasses = ["Economy", "Premium Economy", "Business"];

        // Train-specific data
        const trainNames = ["Shatabdi Express 12028", "Rajdhani Express 12432", "Duronto Express 12274", "Garib Rath 12216", "Jan Shatabdi 12074"];
        const trainClasses = ["Sleeper (SL)", "3AC", "2AC", "1AC"];

        // Bus-specific data
        const busNames = ["Volvo Multi-Axle A/C Sleeper", "Scania AC Seater", "Mercedes-Benz Multi-Axle", "Bharat Benz A/C Sleeper", "Volvo 9600 Semi-Sleeper"];
        const busOperators = ["VRL Travels", "SRS Travels", "Orange Travels", "Kallada Travels", "Parveen Travels"];

        // Cab-specific data
        const cabTypes = ["Sedan - Swift Dzire", "SUV - Innova Crysta", "Hatchback - WagonR", "Premium Sedan - Honda City", "Premium SUV - Fortuner"];

        // Coupon codes
        const coupons = [
          { code: "FIRST500", discount: "₹500 OFF", desc: "First booking discount" },
          { code: "SAVE20", discount: "20% OFF", desc: "Upto ₹1000" },
          { code: "WEEKEND50", discount: "₹50 OFF", desc: "Weekend special" },
          { code: "EARLYBIRD", discount: "15% OFF", desc: "Book 7 days advance" },
          { code: "FLASH100", discount: "₹100 OFF", desc: "Limited time offer" }
        ];

        // Bank offers
        const bankOffers = [
          { bank: "HDFC Bank", offer: "10% Cashback", limit: "Upto ₹1500", card: "Credit/Debit Cards" },
          { bank: "ICICI Bank", offer: "₹750 Instant Discount", limit: "Min ₹3000", card: "Credit Cards" },
          { bank: "SBI Cards", offer: "5% Cashback", limit: "Upto ₹500", card: "Credit Cards" },
          { bank: "Axis Bank", offer: "₹1000 OFF", limit: "Min ₹5000", card: "Credit/Debit Cards" },
          { bank: "Kotak Mahindra", offer: "12% Discount", limit: "Upto ₹2000", card: "Credit Cards" }
        ];

        // Generate 4-5 offers
        const numOffers = Math.floor(Math.random() * 2) + 4; // 4-5 offers

        for (let i = 0; i < numOffers; i++) {
          const basePrice = Math.floor(Math.random() * 3000) + 1500;
          const discount = Math.floor(Math.random() * 500) + 100;
          const finalPrice = basePrice - discount;

          let serviceName = "";
          let serviceDetails = "";

          // Set service name based on category
          if (category === "Flights") {
            serviceName = flightNames[Math.floor(Math.random() * flightNames.length)];
            serviceDetails = flightClasses[Math.floor(Math.random() * flightClasses.length)];
          } else if (category === "Trains") {
            serviceName = trainNames[Math.floor(Math.random() * trainNames.length)];
            serviceDetails = trainClasses[Math.floor(Math.random() * trainClasses.length)];
          } else if (category === "Buses") {
            serviceName = busOperators[Math.floor(Math.random() * busOperators.length)];
            serviceDetails = busNames[Math.floor(Math.random() * busNames.length)];
          } else if (category === "Cabs") {
            serviceName = cabTypes[Math.floor(Math.random() * cabTypes.length)];
            serviceDetails = "One-way trip";
          }

          const times = ["05:30 AM", "06:45 AM", "08:15 AM", "10:30 AM", "01:00 PM", "03:45 PM", "06:20 PM", "08:50 PM", "10:15 PM"];
          const durations = ["2h 15m", "3h 30m", "4h 45m", "5h 20m", "6h 10m", "1h 50m"];

          offers.push({
            id: i,
            serviceName: serviceName,
            serviceDetails: serviceDetails,
            time: times[Math.floor(Math.random() * times.length)],
            duration: durations[Math.floor(Math.random() * durations.length)],
            originalPrice: `₹${basePrice.toLocaleString()}`,
            discount: `₹${discount}`,
            price: `₹${finalPrice.toLocaleString()}`,
            tag: ["Cheapest", "Fastest", "Best Value", "Recommended", "Popular"][i % 5],
            coupon: coupons[Math.floor(Math.random() * coupons.length)],
            bankOffer: bankOffers[Math.floor(Math.random() * bankOffers.length)],
            seatsAvailable: Math.floor(Math.random() * 20) + 5,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1) // 3.5 to 5.0
          });
        }
        return offers;
      };

      const offerData = {
        provider: provider,
        category: category,
        route: route,
        details: generateOffers()
      };

      setOfferModalData(offerData);
      setShowOfferModal(true);
      setIsTyping(false);
    }, 1200);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);

    if (!pendingRoute) return;

    // Get available transportation modes for this route
    const availableTransport = getAvailableTransportation(pendingRoute.origin, pendingRoute.destination);

    const aiResponse = {
      id: Date.now() + 1,
      text: `Found great travel options for your trip on ${date}: ${pendingRoute.userText}`,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "travel_result",
      travelData: availableTransport,
      selectedDate: date,
      route: pendingRoute
    };

    setMessages(prev => [...prev, aiResponse]);
    setPendingRoute(null);
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);

    const translations = {
      english: {
        welcome: "Great! I'll assist you in English. Where would you like to travel?",
        prompt: "You can search for routes like 'Bangalore to Mumbai' or 'Delhi to Goa'"
      },
      hindi: {
        welcome: "बढ़िया! मैं आपकी हिंदी में सहायता करूंगा। आप कहाँ यात्रा करना चाहते हैं?",
        prompt: "आप 'बैंगलोर से मुंबई' या 'दिल्ली से गोवा' जैसे मार्ग खोज सकते हैं"
      },
      kannada: {
        welcome: "ಅದ್ಭುತ! ನಾನು ನಿಮಗೆ ಕನ್ನಡದಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನೀವು ಎಲ್ಲಿಗೆ ಪ್ರಯಾಣಿಸಲು ಬಯಸುತ್ತೀರಿ?",
        prompt: "ನೀವು 'ಬೆಂಗಳೂರು ನಿಂದ ಮುಂಬೈ' ಅಥವಾ 'ದೆಹಲಿ ನಿಂದ ಗೋವಾ' ನಂತಹ ಮಾರ್ಗಗಳನ್ನು ಹುಡುಕಬಹುದು"
      }
    };

    const selectedTranslation = translations[language];

    const welcomeMessage = {
      id: Date.now() + 1,
      text: selectedTranslation.welcome,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "language_welcome"
    };

    const promptMessage = {
      id: Date.now() + 2,
      text: selectedTranslation.prompt,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, welcomeMessage, promptMessage]);
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessageInput("");
  };

  const handleMyProfile = () => navigate("/profile");

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <i className="fa-solid fa-compass text-white text-2xl"></i>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading TravelNudge AI</h2>
          <p className="text-gray-500">Preparing your travel companion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 text-gray-800 overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl border-r border-gray-100 flex flex-col z-30
          transition-all duration-500 ease-out shadow-2xl
          ${isSidebarOpen ? "w-80" : "w-20"}`}
      >

        {/* Sidebar Header */}
        <div className="p-6 border-gray-100 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/TravelNudge Logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <i className={`fa-solid ${isSidebarOpen ? "fa-chevron-left" : "fa-chevron-right"} text-gray-600 text-sm`}></i>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-gray-100">
          {isSidebarOpen ? (
            <button
              onClick={handleNewChat}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>New Chat</span>
            </button>
          ) : (
            <button
              onClick={handleNewChat}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fa-solid fa-plus text-sm"></i>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="p-4 border-gray-100">
          {isSidebarOpen ? (
            <div className="relative">
              <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all text-sm backdrop-blur-sm"
                placeholder="Search chats..."
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="p-3 text-gray-400 hover:text-cyan-500 transition-colors">
                <i className="fa-solid fa-search text-sm"></i>
              </div>
            </div>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {isSidebarOpen ? (
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Chats</h3>
              <div className="space-y-2">
                {messages.length > 0 ? (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3">
                    <p className="text-sm font-medium text-gray-800 truncate">Current Conversation</p>
                    <p className="text-xs text-gray-500 mt-1">{messages.length} messages</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <i className="fa-solid fa-comments text-cyan-500 text-xl"></i>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">No conversations yet</p>
                    <p className="text-gray-400 text-xs">Start a new chat to begin</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 space-y-4">
              <button className="p-3 text-gray-400 hover:text-cyan-500 transition-colors">
                <i className="fa-solid fa-comment-dots text-lg"></i>
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="border-gray-100 p-4">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center w-full p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 ${isSidebarOpen ? "justify-start space-x-3" : "justify-center"
              }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg">
              {getUserInitials()}
            </div>

            {isSidebarOpen && (
              <div className="text-left flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">{user?.full_name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && isSidebarOpen && (
            <div className="mt-2 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
              <button
                onClick={handleMyProfile}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700 text-sm border-gray-100"
              >
                <i className="fa-solid fa-user w-4 text-cyan-500"></i>
                <span>My Profile</span>
              </button>
              <button
                onClick={() => navigate("/support")}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700 text-sm border-gray-100"
              >
                <i className="fa-solid fa-headset w-4 text-cyan-500"></i>
                <span>Support</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-500 text-sm"
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
        <header className="bg-white/80 backdrop-blur-lg border-gray-100 p-4 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden p-1">
                <img src="/TravelNudge Logo.jpeg" alt="Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">TravelNudge AI</h1>
                <p className="text-cyan-600 text-sm font-medium">Online • Ready to help with your travels</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
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
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${message.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none"
                        }`}
                    >
                      {message.type === 'travel_result' ? (
                        <div className="w-full">
                          <p className="text-sm leading-relaxed mb-4 font-medium text-gray-700">{message.text}</p>
                          <div className="space-y-4">
                            {/* Flights - Only show if available */}
                            {message.travelData.flights && message.travelData.flights.length > 0 && (
                              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                <h4 className="font-bold text-sm mb-2 text-gray-700 flex items-center">
                                  <i className="fa-solid fa-plane mr-2 text-blue-500"></i> Flights
                                </h4>
                                <div className="flex overflow-x-auto space-x-3 pb-2 custom-scrollbar">
                                  {message.travelData.flights.map((opt, i) => (
                                    <div key={i} className="flex-shrink-0 w-32 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                      <div className={`h-8 mb-2 rounded flex items-center justify-center font-bold text-xs ${opt.color}`}>{opt.name}</div>
                                      <button
                                        onClick={() => handleCheckOffers(opt.name, "Flights", message.text)}
                                        className="text-[10px] w-full bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                                      >
                                        Check Info
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Trains - Only show if available */}
                            {message.travelData.trains && message.travelData.trains.length > 0 && (
                              <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                                <h4 className="font-bold text-sm mb-2 text-gray-700 flex items-center">
                                  <i className="fa-solid fa-train mr-2 text-orange-500"></i> Trains
                                </h4>
                                <div className="flex overflow-x-auto space-x-3 pb-2 custom-scrollbar">
                                  {message.travelData.trains.map((opt, i) => (
                                    <div key={i} className="flex-shrink-0 w-32 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                      <div className={`h-8 mb-2 rounded flex items-center justify-center font-bold text-xs ${opt.color}`}>{opt.name}</div>
                                      <button
                                        onClick={() => handleCheckOffers(opt.name, "Trains", message.text)}
                                        className="text-[10px] w-full bg-orange-500 text-white py-1.5 rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
                                      >
                                        Check Info
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Buses - Only show if available */}
                            {message.travelData.buses && message.travelData.buses.length > 0 && (
                              <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                                <h4 className="font-bold text-sm mb-2 text-gray-700 flex items-center">
                                  <i className="fa-solid fa-bus mr-2 text-green-500"></i> Buses
                                </h4>
                                <div className="flex overflow-x-auto space-x-3 pb-2 custom-scrollbar">
                                  {message.travelData.buses.map((opt, i) => (
                                    <div key={i} className="flex-shrink-0 w-32 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                      <div className={`h-8 mb-2 rounded flex items-center justify-center font-bold text-xs ${opt.color}`}>{opt.name}</div>
                                      <button
                                        onClick={() => handleCheckOffers(opt.name, "Buses", message.text)}
                                        className="text-[10px] w-full bg-green-500 text-white py-1.5 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
                                      >
                                        Check Info
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Cabs - Only show if available */}
                            {message.travelData.cabs && message.travelData.cabs.length > 0 && (
                              <div className="bg-yellow-50/50 p-3 rounded-xl border border-yellow-100">
                                <h4 className="font-bold text-sm mb-2 text-gray-700 flex items-center">
                                  <i className="fa-solid fa-car mr-2 text-yellow-500"></i> Cabs
                                </h4>
                                <div className="flex overflow-x-auto space-x-3 pb-2 custom-scrollbar">
                                  {message.travelData.cabs.map((opt, i) => (
                                    <div key={i} className="flex-shrink-0 w-32 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                      <div className={`h-8 mb-2 rounded flex items-center justify-center font-bold text-xs ${opt.color}`}>{opt.name}</div>
                                      <button
                                        onClick={() => handleCheckOffers(opt.name, "Cabs", message.text)}
                                        className="text-[10px] w-full bg-yellow-500 text-white py-1.5 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer"
                                      >
                                        Check Info
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <p className={`text-xs mt-3 ${message.sender === "user" ? "text-cyan-100" : "text-gray-400"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      ) : message.type === 'offer_result' ? (
                        <div className="w-full">
                          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                            <h3 className="text-sm font-bold text-gray-700">
                              {message.provider} <span className="text-gray-400 font-normal">•</span> {message.category}
                            </h3>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Live Prices</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">{message.text}</p>

                          <div className="space-y-3">
                            {message.details.map((offer) => (
                              <div key={offer.id} className="bg-gradient-to-r from-white to-blue-50/30 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all group">
                                {/* Service Name & Details */}
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-bold text-gray-900 text-sm">{offer.serviceName}</h4>
                                      <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium flex items-center">
                                        <i className="fa-solid fa-star text-yellow-500 mr-1 text-[8px]"></i>
                                        {offer.rating}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600">{offer.serviceDetails}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                      <div className="flex items-center space-x-1 text-xs text-gray-700">
                                        <i className="fa-solid fa-clock text-blue-500 text-[10px]"></i>
                                        <span className="font-semibold">{offer.time}</span>
                                      </div>
                                      <span className="text-gray-400">•</span>
                                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                                        <i className="fa-solid fa-hourglass-half text-orange-500 text-[10px]"></i>
                                        <span>{offer.duration}</span>
                                      </div>
                                      <span className="text-gray-400">•</span>
                                      <div className="flex items-center space-x-1 text-xs text-green-600">
                                        <i className="fa-solid fa-chair text-green-500 text-[10px]"></i>
                                        <span>{offer.seatsAvailable} seats</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right ml-4">
                                    <span className="inline-block text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold mb-1">
                                      {offer.tag}
                                    </span>
                                    <div className="flex items-center justify-end space-x-2">
                                      <span className="text-xs text-gray-400 line-through">{offer.originalPrice}</span>
                                      <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">
                                        Save {offer.discount}
                                      </span>
                                    </div>
                                    <p className="text-xl font-bold text-blue-600 mt-1">{offer.price}</p>
                                  </div>
                                </div>

                                {/* Offers Section */}
                                <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
                                  {/* Coupon Offer */}
                                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="bg-purple-500 text-white px-2 py-1 rounded text-[9px] font-bold">
                                        <i className="fa-solid fa-ticket mr-1"></i>
                                        COUPON
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-purple-700">{offer.coupon.code}</p>
                                        <p className="text-[9px] text-gray-600">{offer.coupon.desc}</p>
                                      </div>
                                    </div>
                                    <span className="text-xs font-bold text-purple-600">{offer.coupon.discount}</span>
                                  </div>

                                  {/* Bank Offer */}
                                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-[9px] font-bold">
                                        <i className="fa-solid fa-building-columns mr-1"></i>
                                        BANK
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-blue-700">{offer.bankOffer.bank}</p>
                                        <p className="text-[9px] text-gray-600">{offer.bankOffer.card} • {offer.bankOffer.limit}</p>
                                      </div>
                                    </div>
                                    <span className="text-xs font-bold text-blue-600">{offer.bankOffer.offer}</span>
                                  </div>
                                </div>

                                {/* Book Button */}
                                <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                  <i className="fa-solid fa-check-circle mr-2"></i>
                                  Book Now
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 text-center">
                            <a href="#" className="text-xs text-blue-500 font-medium hover:underline">
                              <i className="fa-solid fa-external-link-alt mr-1"></i>
                              View more on {message.provider}
                            </a>
                          </div>
                          <p className={`text-xs mt-3 text-gray-400 text-right`}>
                            {message.timestamp}
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${message.sender === "user" ? "text-cyan-100" : "text-gray-400"}`}>
                            {message.timestamp}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
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
        <div className="bg-white/70 border-t border-gray-100 p-3 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSendMessage}
              className="flex items-end space-x-3 bg-white border border-gray-300 rounded-2xl p-1 shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500/30 focus-within:border-cyan-500"
            >
              <div className="flex-1">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Say Hi.... Where would you like to go?"
                  className="w-full px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500 text-sm resize-none min-h-[10px] max-h-[90px]"
                  rows="1"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="p-2 text-gray-400 hover:text-cyan-500 transition-colors"
                  >
                    <i className="fa-solid fa-paperclip"></i>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" />
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-cyan-500 transition-colors"
                  >
                    <i className="fa-solid fa-image"></i>
                  </button>
                </div>
              </div>
              <button
                disabled={!messageInput.trim()}
                className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 flex items-center justify-center min-w-[60px]"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Offer Modal Popup */}
      {showOfferModal && offerModalData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOfferModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white relative">
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className={`fa-solid ${offerModalData.category === 'Flights' ? 'fa-plane' :
                    offerModalData.category === 'Trains' ? 'fa-train' :
                      offerModalData.category === 'Buses' ? 'fa-bus' :
                        'fa-car'
                    } text-2xl`}></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{offerModalData.provider}</h2>
                  <p className="text-white/90 text-sm">{offerModalData.category} • {offerModalData.route}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  <i className="fa-solid fa-bolt mr-1"></i>
                  {offerModalData.details.length} Live Offers
                </span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-semibold">
                  <i className="fa-solid fa-check-circle mr-1"></i>
                  Instant Booking
                </span>
              </div>
            </div>

            {/* Modal Body - Horizontal Scroll */}
            <div className="p-6 overflow-x-auto overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="flex space-x-4 pb-4">
                {offerModalData.details.map((offer) => (
                  <div key={offer.id} className="flex-shrink-0 w-80 bg-gradient-to-br from-white to-blue-50 border-2 border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    {/* Service Name & Rating */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{offer.serviceName}</h3>
                        <p className="text-xs text-gray-600">{offer.serviceDetails}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-lg">
                        <i className="fa-solid fa-star text-yellow-500 text-xs"></i>
                        <span className="text-xs font-bold text-yellow-700">{offer.rating}</span>
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="mb-3">
                      <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {offer.tag}
                      </span>
                    </div>

                    {/* Time & Duration */}
                    <div className="bg-white rounded-xl p-3 mb-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-clock text-blue-500"></i>
                          <span className="font-semibold text-sm">{offer.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-hourglass-half text-orange-500 text-xs"></i>
                          <span className="text-xs text-gray-600">{offer.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        <i className="fa-solid fa-chair"></i>
                        <span>{offer.seatsAvailable} seats available</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-3 border border-blue-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 line-through">{offer.originalPrice}</span>
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                          Save {offer.discount}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{offer.price}</div>
                    </div>

                    {/* Coupon Offer */}
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-2 mb-2 border border-purple-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-purple-600 text-white px-2 py-1 rounded text-[9px] font-bold">
                            <i className="fa-solid fa-ticket mr-1"></i>COUPON
                          </div>
                          <div>
                            <p className="text-xs font-bold text-purple-800">{offer.coupon.code}</p>
                            <p className="text-[9px] text-gray-600">{offer.coupon.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-700">{offer.coupon.discount}</span>
                      </div>
                    </div>

                    {/* Bank Offer */}
                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-2 mb-3 border border-blue-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold">
                            <i className="fa-solid fa-building-columns mr-1"></i>BANK
                          </div>
                          <div>
                            <p className="text-xs font-bold text-blue-800">{offer.bankOffer.bank}</p>
                            <p className="text-[9px] text-gray-600">{offer.bankOffer.card}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-blue-700">{offer.bankOffer.offer}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <i className="fa-solid fa-check-circle mr-2"></i>
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-xs text-gray-600">
                <i className="fa-solid fa-shield-halved text-green-500 mr-1"></i>
                Secure booking • Best price guaranteed
              </p>
              <button
                onClick={() => setShowOfferModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && pendingRoute && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDatePicker(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white relative rounded-t-2xl">
              <button
                onClick={() => setShowDatePicker(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-calendar-days text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Select Travel Date</h2>
                  <p className="text-white/90 text-sm">{pendingRoute.origin} → {pendingRoute.destination}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">When would you like to travel?</p>

              {/* Quick Date Options */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => handleDateSelection(new Date().toLocaleDateString('en-GB'))}
                  className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all text-center"
                >
                  <i className="fa-solid fa-calendar-day text-blue-500 text-lg mb-1 block"></i>
                  <p className="text-xs font-semibold text-gray-700">Today</p>
                </button>
                <button
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    handleDateSelection(tomorrow.toLocaleDateString('en-GB'));
                  }}
                  className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:border-green-400 transition-all text-center"
                >
                  <i className="fa-solid fa-calendar-plus text-green-500 text-lg mb-1 block"></i>
                  <p className="text-xs font-semibold text-gray-700">Tomorrow</p>
                </button>
                <button
                  onClick={() => {
                    const weekend = new Date();
                    const daysUntilSaturday = (6 - weekend.getDay() + 7) % 7 || 7;
                    weekend.setDate(weekend.getDate() + daysUntilSaturday);
                    handleDateSelection(weekend.toLocaleDateString('en-GB'));
                  }}
                  className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all text-center"
                >
                  <i className="fa-solid fa-calendar-week text-purple-500 text-lg mb-1 block"></i>
                  <p className="text-xs font-semibold text-gray-700">Weekend</p>
                </button>
              </div>

              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Or choose a specific date:</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  onChange={(e) => {
                    if (e.target.value) {
                      const selectedDate = new Date(e.target.value);
                      handleDateSelection(selectedDate.toLocaleDateString('en-GB'));
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-gray-700 font-medium"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                <i className="fa-solid fa-info-circle text-blue-500"></i>
                <p>Select a date to see available transportation options</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative rounded-t-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fa-solid fa-language text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2">Choose Your Language</h2>
                <p className="text-white/90 text-sm">अपनी भाषा चुनें • ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-center text-gray-600 mb-6">Select your preferred language to continue</p>

              <div className="space-y-3">
                {/* English */}
                <button
                  onClick={() => handleLanguageSelection('english')}
                  className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                      🇬🇧
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">English</h3>
                      <p className="text-sm text-gray-600">Continue in English</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </button>

                {/* Hindi */}
                <button
                  onClick={() => handleLanguageSelection('hindi')}
                  className="w-full p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                      🇮🇳
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">हिंदी (Hindi)</h3>
                      <p className="text-sm text-gray-600">हिंदी में जारी रखें</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </button>

                {/* Kannada */}
                <button
                  onClick={() => handleLanguageSelection('kannada')}
                  className="w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                      🇮🇳
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">ಕನ್ನಡ (Kannada)</h3>
                      <p className="text-sm text-gray-600">ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಸಿ</p>
                    </div>
                    <i className="fa-solid fa-chevron-right text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <i className="fa-solid fa-globe text-purple-500"></i>
                <p>You can change the language anytime in settings</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



