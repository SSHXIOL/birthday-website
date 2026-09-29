import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RotateCw, Heart, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { PHOTO_LIST, HEART_COLLAGE_PHOTOS } from '../config';

export default function PhotoGallery() {
  const [flippedCards, setFlippedCards] = useState({});
  const [activeCollagePhoto, setActiveCollagePhoto] = useState(null);

  const toggleFlip = (id) => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(20);
    }
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative w-full py-8 px-4 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase text-pink-300 glass-pill border border-pink-500/20 mb-2">
          <Camera className="w-3.5 h-3.5 text-pink-400" />
          Precious Memories
        </span>
        <h2 className="font-serif text-3xl text-white font-medium">
          Our Story in Polaroids
        </h2>
        <p className="text-xs text-blush-200/70 mt-1 max-w-xs mx-auto font-light">
          Tap any Polaroid to flip it and uncover the hidden memory on the back
        </p>
      </div>

      {/* Part A: Stacked / Grid 3D Flip Polaroid Cards */}
      <div className="w-full max-w-sm flex flex-col gap-6 mb-12">
        {PHOTO_LIST.map((photo, index) => {
          const isFlipped = !!flippedCards[photo.id];

          return (
            <div
              key={photo.id}
              className="w-full h-96 perspective-1000 touch-manipulation"
              style={{ transform: `rotate(${photo.rotation})` }}
            >
              <motion.div
                className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => toggleFlip(photo.id)}
              >
                {/* FRONT: Polaroid Frame with Photo & Handwritten Caption */}
                <div className="absolute inset-0 backface-hidden bg-white/95 rounded-2xl p-4 shadow-2xl flex flex-col justify-between border-2 border-pink-200/40 text-stone-800">
                  {/* Pin / Tape accent */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-300/40 rounded-sm backdrop-blur-sm -rotate-2 border border-white/40 shadow-sm" />

                  {/* Photo Container */}
                  <div className="w-full h-64 rounded-xl overflow-hidden bg-stone-900 relative group">
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      onError={(e) => {
                        // Fallback image if custom image doesn't load
                        e.target.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] text-white/90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-400" />
                      <span>{photo.date}</span>
                    </div>
                  </div>

                  {/* Handwritten Caption & Tap prompt */}
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <p className="font-handwriting text-2xl text-stone-800 font-bold tracking-wide">
                      {photo.caption}
                    </p>
                    <span className="flex items-center gap-1 text-[11px] text-pink-600 font-sans font-medium bg-pink-100/80 px-2.5 py-1 rounded-full">
                      <RotateCw className="w-3 h-3" />
                      Flip
                    </span>
                  </div>
                </div>

                {/* BACK: Frosted romantic letter parchment with memory note */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#2a1327] via-[#1f0e1d] to-[#160a15] rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-pink-400/40 text-rose-100">
                  <div className="flex items-center justify-between border-b border-pink-400/20 pb-3">
                    <span className="text-xs uppercase tracking-widest text-pink-300 font-medium">
                      Memory #{index + 1}
                    </span>
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                  </div>

                  <div className="my-auto py-2 text-center">
                    <p className="font-serif text-lg italic text-rose-100 leading-relaxed">
                      "{photo.note}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-pink-400/20 flex items-center justify-between text-xs text-pink-300/70">
                    <span className="font-handwriting text-xl text-pink-300">
                      always & forever
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      Tap to flip back
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Part B: Floating Heart Collage */}
      <div className="w-full max-w-sm mt-4 flex flex-col items-center">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] tracking-wider uppercase text-pink-300 glass-pill border border-pink-500/20 mb-1">
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
            Heart Collage
          </span>
          <h3 className="font-serif text-2xl text-white font-medium">
            Pieces of My Heart
          </h3>
          <p className="text-xs text-blush-200/70 font-light mt-0.5">
            Every snapshot forms a piece of the love I hold for you
          </p>
        </div>

        {/* Heart-Shaped Matrix Layout */}
        <div className="relative w-72 h-72 flex items-center justify-center my-2">
          {/* Subtle Heart Outline Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-64 h-64 text-pink-500/10 fill-pink-500/5 blur-sm" />
          </div>

          {/* Heart shaped photo arrangement */}
          <div className="relative w-64 h-64">
            {/* Top Lobes */}
            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[0])}
              className="absolute top-2 left-8 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[0].src} alt="" className="w-full h-full object-cover" />
            </div>

            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[1])}
              className="absolute top-2 right-8 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[1].src} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Upper Middle */}
            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[2])}
              className="absolute top-12 left-0 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[2].src} alt="" className="w-full h-full object-cover" />
            </div>

            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[3])}
              className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden glass-panel border-2 border-pink-300 shadow-glow-rose cursor-pointer active:scale-95 transition-transform z-10"
            >
              <img src={HEART_COLLAGE_PHOTOS[3].src} alt="" className="w-full h-full object-cover" />
            </div>

            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[4])}
              className="absolute top-12 right-0 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[4].src} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Lower Middle */}
            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[5])}
              className="absolute bottom-16 left-6 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[5].src} alt="" className="w-full h-full object-cover" />
            </div>

            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[6])}
              className="absolute bottom-16 right-6 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/40 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[6].src} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Heart Bottom Tip */}
            <div 
              onClick={() => setActiveCollagePhoto(HEART_COLLAGE_PHOTOS[7])}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl overflow-hidden glass-panel border border-pink-400/50 shadow-glow-pink cursor-pointer active:scale-95 transition-transform"
            >
              <img src={HEART_COLLAGE_PHOTOS[7].src} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Memory Card for Heart Collage Click */}
      <AnimatePresence>
        {activeCollagePhoto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCollagePhoto(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 touch-manipulation"
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 max-w-sm mx-auto z-50 glass-panel-deep rounded-3xl p-5 border border-pink-400/40 shadow-2xl flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setActiveCollagePhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-pink-200 border border-pink-400/20 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 border border-pink-300/30">
                <img
                  src={activeCollagePhoto.src}
                  alt={activeCollagePhoto.label}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-1.5 text-pink-300 mb-1">
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                <span className="font-serif text-lg font-medium text-white">
                  {activeCollagePhoto.label}
                </span>
              </div>
              <p className="text-xs text-blush-200/80 font-light text-center">
                One of countless reasons why you hold my heart completely
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
