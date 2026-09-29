import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { BOUQUET_FLOWERS } from '../config';

export default function BouquetSection() {
  const [selectedFlower, setSelectedFlower] = useState(null);

  const handleSelectFlower = (flower) => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(25);
    }
    setSelectedFlower(flower);
  };

  return (
    <section className="relative w-full py-8 px-4 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase text-pink-300 glass-pill border border-pink-500/20 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          A Floral Bouquet For You
        </span>
        <h2 className="font-serif text-3xl text-white font-medium">
          Pick a Flower, My Love
        </h2>
        <p className="text-xs text-blush-200/70 mt-1 max-w-xs mx-auto font-light">
          Each bloom holds a secret truth about how beautiful you are to me
        </p>
      </div>

      {/* Visual Bouquet Arrangement */}
      <div className="relative w-full max-w-sm h-64 flex items-center justify-center my-2">
        {/* Decorative Bouquet Wrapper / Aura */}
        <div className="absolute inset-x-8 bottom-4 h-36 rounded-b-[60px] bg-gradient-to-t from-pink-900/30 via-rose-800/10 to-transparent border-b border-pink-400/20 blur-sm pointer-events-none" />

        {/* Central Ribbon Knot */}
        <div className="absolute bottom-6 flex flex-col items-center pointer-events-none z-0">
          <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-pink-400/40 shadow-glow-pink">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          </div>
          <div className="text-[10px] tracking-widest text-pink-300/60 uppercase mt-1">For Abby</div>
        </div>

        {/* The 4 Interactive Flowers Arranged Artfully */}
        <div className="grid grid-cols-2 gap-4 w-full px-6 z-10">
          {BOUQUET_FLOWERS.map((flower, idx) => {
            const isTop = idx < 2;
            return (
              <motion.button
                key={flower.id}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                animate={{
                  y: isTop ? [-3, 3, -3] : [3, -3, 3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5 + idx * 0.5,
                  ease: 'easeInOut',
                }}
                onClick={() => handleSelectFlower(flower)}
                className={`flex flex-col items-center justify-center p-4 min-h-[96px] min-w-[48px] rounded-2xl glass-panel border ${flower.border} shadow-lg backdrop-blur-md active:bg-white/20 touch-manipulation transition-all group`}
              >
                <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                  {flower.icon}
                </span>
                <span className="mt-2 text-sm font-serif font-medium text-white group-hover:text-pink-200">
                  {flower.name}
                </span>
                <span className="text-[10px] text-pink-300/80 font-light mt-0.5">
                  Tap to read
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet Modal for Selected Flower */}
      <AnimatePresence>
        {selectedFlower && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFlower(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 touch-manipulation"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 max-w-md mx-auto z-50 glass-panel-deep rounded-t-[32px] p-6 border-t-2 border-pink-400/40 shadow-2xl flex flex-col items-center"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 bg-pink-300/30 rounded-full mb-4" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedFlower(null)}
                className="absolute top-5 right-5 w-9 h-9 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-pink-200 hover:text-white border border-pink-400/20 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Flower Icon & Badge */}
              <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-5xl mb-3 shadow-glow-pink border border-pink-300/30">
                {selectedFlower.icon}
              </div>

              <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-1">
                {selectedFlower.tagline}
              </span>

              <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                {selectedFlower.name}
              </h3>

              {/* Romantic Note */}
              <div className="w-full p-5 rounded-2xl bg-white/5 border border-pink-300/20 text-center relative mb-4">
                <p className="font-serif text-lg italic text-rose-100 leading-relaxed">
                  "{selectedFlower.quote}"
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-pink-400">
                  <Heart className="w-4 h-4 fill-pink-400" />
                  <span className="text-xs font-handwriting text-2xl text-pink-200">
                    always yours
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setSelectedFlower(null)}
                className="w-full py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm tracking-wide shadow-glow-pink touch-manipulation border border-pink-300/30"
              >
                Keep in My Heart 💕
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
