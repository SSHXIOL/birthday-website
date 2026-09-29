// =========================================================================
// 💖 ABBY'S 17th BIRTHDAY APP — CENTRAL CONFIGURATION FILE
// Everything you see on the website can be customized right here in this file!
// =========================================================================

// 🔐 1. SECRET UNLOCK PIN
// Change this to any 4-digit secret date (e.g. 3009 for September 30th)
export const PIN_CODE = "3009";
export const PIN_HINT = "September 30th";

// 🎵 2. BACKGROUND MUSIC
// You can drop an MP3 file into `public/music/bg-music.mp3` or change this path
export const AUDIO_SRC = "/music/bg-music.mp3";

// 👑 3. GENERAL DETAILS
export const APP_CONFIG = {
  girlfriendName: "Abby",
  age: 17,
  musicTitle: "Golden Hour - Acoustic 🎵",
  coupleSince: "2024", // Years together
  heroSubtitle: '"3 birthdays together, 2 years in love, and a lifetime of adventures ahead."',
};

// 💌 4. THE 17th BIRTHDAY LETTER
// Edit your letter paragraphs, greeting, and signature below:
export const LETTER_CONTENT = {
  envelopeTitle: "To My Sweetest Abby",
  envelopeBadge: "17",
  greeting: "Happy Birthday,",
  paragraphs: [
    "my sweet sweet cutie pretty gal of a girlfriend. You’re 17 now, that’s an age where things start to get serious, I know you hate change and the consequences that comes with it but I wholeheartedly hope that you don’t forget that the people around you won’t stop loving you, and that includes me, I honestly ran out of words to describe how much you mean to me and how heavily you impact my life and how I look at life, and being with you for 2 years honestly feels unreal. Looking back at everything we went through, all the ups and down we went through, always one thing has stayed consistent about it, my love for you. I know that I still need a lot of improving when it comes to how I express my love for you and how I handle situations involving you being unhappy, but I solemnly promise to treat you care and love. And being with you in your birthday for 3 years honestly feels really special and intimate to me, because watching you grow into the person you are today has been one of the greatest privileges of my life.",

    "I know the future can feel overwhelming sometimes, and stepping into this next chapter comes with its own weight. But whenever the world feels like it’s moving a little too fast, I want you to remember that you don't have to carry it all on your own. I’m right here, in your corner, through every twist, every turn, and every challenge that comes our way. No matter how much things change around us, my place next to you isn’t going anywhere.",

    "Thank you for being my comfort, my peace, and the person who brings so much genuine warmth into my days. Thank you for your patience with me, for every quiet moment we share, and for letting me love you. You deserve all the happiness, gentleness, and peace this world can offer—not just today, but every single day."
  ],
  closingGreeting: "Happy 17th birthday, my wifey❤️.",
  signature: "Yours always and forever"
};

// 🌸 5. FLOWER BOUQUET NOTES
// Tapping each flower displays these tailored love messages:
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

// 📸 6. POLAROID PHOTOS & REVERSE NOTES
// Tip: Drop your photos into `public/images/photo1.jpg`, `photo2.jpg`, etc.
// Or replace the `image` URLs with your own direct links!
export const PHOTO_LIST = [
  {
    id: 1,
    image: "/images/photo1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80",
    caption: "The day my heart chose you ✨",
    date: "September 30th",
    note: "I still remember how your eyes sparkled when you laughed that day. My favorite sight in the whole universe.",
    rotation: "-3deg"
  },
  {
    id: 2,
    image: "/images/photo2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80",
    caption: "Your smile is my safe haven 🧸",
    date: "Summer Days",
    note: "Every time you hold my hand, everything else in this chaotic world goes completely silent.",
    rotation: "2.5deg"
  },
  {
    id: 3,
    image: "/images/photo3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
    caption: "3 Birthdays together & forever 💕",
    date: "Our Precious Moments",
    note: "Watching you grow into the incredible, gentle, strong young woman you are today is my greatest pride.",
    rotation: "-2deg"
  },
  {
    id: 4,
    image: "/images/video1.mp4",
    video: "/images/video1.mp4",
    isVideo: true,
    fallbackImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    caption: "My prettiest cutie gal 🌷",
    date: "Every Single Day",
    note: "No words in any language will ever be enough to describe how gorgeous you are to me inside and out.",
    rotation: "3deg"
  }
];

// 💖 7. HEART COLLAGE THUMBNAILS
export const HEART_COLLAGE_PHOTOS = [
  { id: 'h1', src: '/images/photo1.jpg', label: 'Magic' },
  { id: 'h2', src: '/images/photo2.jpg', label: 'Warmth' },
  { id: 'h3', src: '/images/photo3.jpg', label: 'Forever' },
  { id: 'h4', src: '/images/photo1.jpg', label: 'Pretty' },
  { id: 'h5', src: '/images/photo2.jpg', label: 'Smiles' },
  { id: 'h6', src: '/images/photo3.jpg', label: 'Sweetheart' },
  { id: 'h7', src: '/images/photo1.jpg', label: 'Love' },
  { id: 'h8', src: '/images/photo2.jpg', label: 'Cherish' },
  { id: 'h9', src: '/images/photo3.jpg', label: 'Joy' },
];

// 🏺 8. REASONS I'M GRATEFUL FOR YOU (JAR OF REASONS)
// Add, remove, or edit any reasons here:
export const GRATEFUL_REASONS = [
  "The adorable way you seek attention when you need it.",
  "How you make even the most boring, ordinary days feel like a romance manhwa arc.",
  "You try your best to have patience with me whenever I am slow to understand things or clumsy with words.",
  "The gentle warmth of your hands when you hold mine.",
  "How passionate you get talking about the little things you care deeply about.",
  "The way you believe in me even during the moments when I struggle to believe in myself.",
  "Because you are my safest comfort and my calmest harbor when the world gets is mean.",
  "Every quiet, comfortable silence we share without having to utter a single word.",
  "The fact that you chose me to love, and that I get to celebrate 3 birthdays by your side.",
  "Your beautiful, radiant soul that brings kindness to everyone fortunate enough to know you.",
  "How you smell like vanilla, warmth, and home.",
  "The sweet little messages you send that can instantly flip my entire day around.",
  "Because you are my girlfriend, my best friend, and my wifey all in one person ❤️."
];
