// Configuration for Abby's 17th Birthday App
// You can easily change PIN code, music, photos, and messages here!

export const PIN_CODE = "1204"; // Secret date (e.g., December 4th)
export const AUDIO_SRC = "/music/bg-music.mp3"; // Background music path

export const APP_CONFIG = {
  girlfriendName: "Abby",
  age: 17,
  musicTitle: "Golden Hour - Acoustic 🎵",
  coupleSince: "2024", // 2 years together
};

// Flower bouquet messages
export const BOUQUET_FLOWERS = [
  {
    id: "rose",
    name: "Red Rose",
    icon: "🌹",
    accent: "#ff4d6d",
    border: "border-rose-400/40",
    bgGradient: "from-rose-500/20 to-pink-900/30",
    quote: "You are the finest rose that ever bloomed — full of love and unmatched beauty.",
    tagline: "Elegance & Endless Love"
  },
  {
    id: "sunflower",
    name: "Sunflower",
    icon: "🌻",
    accent: "#ffb703",
    border: "border-amber-400/40",
    bgGradient: "from-amber-500/20 to-yellow-900/30",
    quote: "Like a sunflower, you always turn toward the light and bring warmth to everyone around you.",
    tagline: "Warmth & My Sunshine"
  },
  {
    id: "cherry",
    name: "Cherry Blossom",
    icon: "🌸",
    accent: "#ff85a1",
    border: "border-pink-400/40",
    bgGradient: "from-pink-500/20 to-purple-900/30",
    quote: "Gentle, radiant, and bringing endless joy wherever you go.",
    tagline: "Grace & Gentle Tenderness"
  },
  {
    id: "tulip",
    name: "Pink Tulip",
    icon: "🌷",
    accent: "#f72585",
    border: "border-fuchsia-400/40",
    bgGradient: "from-fuchsia-500/20 to-pink-900/30",
    quote: "A constant reminder of how lucky I am to have you by my side.",
    tagline: "Devotion & Sweet Serenity"
  }
];

// Polaroid Photos & Backside Notes
// If local files like /images/photo1.jpg are not yet present, romantic aesthetic fallbacks are provided
export const PHOTO_LIST = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80",
    fallbackImage: "/images/photo1.jpg",
    caption: "The day my heart chose you ✨",
    date: "Dec 2024",
    note: "I still remember how your eyes sparkled when you laughed that day. My favorite sight in the whole universe.",
    rotation: "-3deg"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80",
    fallbackImage: "/images/photo2.jpg",
    caption: "Your smile is my safe haven 🧸",
    date: "Summer Days",
    note: "Every time you hold my hand, everything else in this chaotic world goes completely silent.",
    rotation: "2.5deg"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
    fallbackImage: "/images/photo3.jpg",
    caption: "3 Birthdays together & forever 💕",
    date: "Our Precious Moments",
    note: "Watching you grow into the incredible, gentle, strong young woman you are today is my greatest pride.",
    rotation: "-2deg"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    fallbackImage: "/images/photo4.jpg",
    caption: "My prettiest cutie gal 🌷",
    date: "Every Single Day",
    note: "No words in any language will ever be enough to describe how gorgeous you are to me inside and out.",
    rotation: "3deg"
  }
];

// Heart collage thumbnails (arranged in heart shape)
export const HEART_COLLAGE_PHOTOS = [
  { id: 'h1', src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80', label: 'Magic' },
  { id: 'h2', src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80', label: 'Warmth' },
  { id: 'h3', src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=300&q=80', label: 'Forever' },
  { id: 'h4', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', label: 'Pretty' },
  { id: 'h5', src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80', label: 'Smiles' },
  { id: 'h6', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80', label: 'Sweetheart' },
  { id: 'h7', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', label: 'Love' },
  { id: 'h8', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80', label: 'Cherish' },
  { id: 'h9', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80', label: 'Joy' },
];

// Reasons I'm Grateful For You
export const GRATEFUL_REASONS = [
  "The adorable way your nose crinkles when you laugh genuinely at something silly.",
  "How you make even the most boring, ordinary days feel like a movie scene.",
  "Your patience with me whenever I am slow to understand things or clumsy with words.",
  "The gentle warmth of your hands when you hold mine during chilly walks.",
  "How passionate you get talking about the little things you care deeply about.",
  "The way you believe in me even during the moments when I struggle to believe in myself.",
  "Because you are my safest comfort and my calmest harbor when the world gets loud.",
  "Every quiet, comfortable silence we share without having to utter a single word.",
  "The fact that you chose me to love, and that I get to celebrate 3 birthdays by your side.",
  "Your beautiful, radiant soul that brings kindness to everyone fortunate enough to know you.",
  "How you smell like vanilla, warmth, and home.",
  "The sweet little messages you send that can instantly flip my entire day around.",
  "Because you are my girlfriend, my best friend, and my wifey all in one person ❤️."
];
