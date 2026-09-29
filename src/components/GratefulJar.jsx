import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRATEFUL_REASONS } from '../config';

export default function GratefulJar() {
  const [isShaking, setIsShaking] = useState(false);
  const [currentReason, setCurrentReason] = useState(null);
  const [openedCount, setOpenedCount] = useState(0);
  const [lastIndex, setLastIndex] = useState(-1);

  const shakeJar = () => {
    if (isShaking) return;

    if (window.navigator?.vibrate) {
      window.navigator.vibrate([30, 40, 60]);
    }

    setIsShaking(true);

    // Pick random reason that is not immediate duplicate
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * GRATEFUL_REASONS.length);
    } while (randomIndex === lastIndex && GRATEFUL_REASONS.length > 1);

    setLastIndex(randomIndex);

    setTimeout(() => {
      setIsShaking(false);
      setCurrentReason(GRATEFUL_REASONS[randomIndex]);
      setOpenedCount((prev) => prev + 1);

      // Heart confetti pop
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#ff85a1', '#f7cad0', '#ffb703'],
      });
    }, 650);
  };

  return (
    <section className="relative w-full py-8 px-4 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase text-pink-300 glass-pill border border-pink-500/20 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          Endless Gratitude
        </span>
        <h2 className="font-serif text-3xl text-white font-medium">
          Reasons I'm Grateful for You
        </h2>
        <p className="text-xs text-blush-200/70 mt-1 max-w-xs mx-auto font-light">
          A little jar packed with all the reasons my heart beats for you
        </p>
      </div>

      {/* Interactive Jar Graphic & Button */}
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Animated Jar Illustration */}
        <div
          onClick={shakeJar}
          className={`relative w-48 h-60 cursor-pointer flex flex-col items-center justify-end pb-4 transition-transform touch-manipulation ${
            isShaking ? 'animate-jarShake' : 'hover:scale-105'
          }`}
        >
          {/* Glass Jar Lid */}
          <div className="absolute top-2 w-28 h-6 rounded-t-xl bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 border-2 border-pink-400/50 shadow-md z-20 flex items-center justify-center">
            <div className="w-16 h-1 bg-pink-500/30 rounded-full" />
          </div>
          {/* Lid Neck */}
          <div className="absolute top-7 w-24 h-3 bg-pink-300/30 border-x-2 border-pink-400/40 z-10" />

          {/* Jar Body */}
          <div className="w-44 h-52 rounded-[36px] glass-panel-deep border-2 border-pink-400/40 shadow-glow-pink relative overflow-hidden flex flex-col items-center justify-between p-4 z-10">
            {/* Glass highlight glare */}
            <div className="absolute top-4 left-3 w-3 h-28 bg-white/20 rounded-full blur-[1px] -rotate-6 pointer-events-none" />

            {/* Little origami folded hearts/stars floating inside jar */}
            <div className="absolute inset-0 p-4 flex flex-wrap gap-2 items-center justify-center pointer-events-none opacity-85">
              {['💖', '✨', '💌', '🌸', '💕', '⭐', '🌷', '💝', '🌟'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={
                    isShaking
                      ? {
                          x: [0, (i % 2 === 0 ? 1 : -1) * 15, 0],
                          y: [0, -20, 0],
                          rotate: [0, 45, -45, 0],
                        }
                      : {
                          y: [0, -5, 0],
                        }
                  }
                  transition={{
                    repeat: isShaking ? 0 : Infinity,
                    duration: 2 + (i % 3),
                    ease: 'easeInOut',
                  }}
                  className="text-xl filter drop-shadow-sm"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>

            {/* Label on the Jar */}
            <div className="relative z-10 my-auto w-32 py-2 px-1.5 rounded-xl bg-white/90 shadow-md border border-pink-300/50 text-center -rotate-2">
              <span className="font-handwriting text-lg text-rose-950 font-bold block leading-tight">
                Abby's Jar
              </span>
              <span className="text-[9px] uppercase tracking-wider text-rose-600 font-bold">
                of reasons
              </span>
            </div>

            {/* Jar bottom glow */}
            <div className="w-full text-center z-10">
              <span className="text-[10px] text-pink-300/70 tracking-wider uppercase font-medium">
                Tap jar or shake below
              </span>
            </div>
          </div>
        </div>

        {/* Shake Button */}
        <div className="mt-6 flex flex-col items-center gap-2 w-full px-6">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={shakeJar}
            disabled={isShaking}
            className="w-full py-4 min-h-[48px] rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-serif text-lg font-medium shadow-glow-pink border border-pink-300/40 flex items-center justify-center gap-2 touch-manipulation active:opacity-90 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isShaking ? 'animate-spin' : ''}`} />
            <span>{isShaking ? 'Shaking the Jar...' : 'Shake the Jar ✨'}</span>
          </motion.button>

          {openedCount > 0 && (
            <span className="text-xs text-pink-300/80 font-light mt-1">
              Reasons revealed: <strong className="text-pink-200">{openedCount}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Reason Card Modal Popup */}
      <AnimatePresence>
        {currentReason && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCurrentReason(null)}
              className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 touch-manipulation"
            />

            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 max-w-sm mx-auto z-50 glass-panel-deep rounded-3xl p-6 border-2 border-pink-400/50 shadow-2xl flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setCurrentReason(null)}
                className="absolute top-4 right-4 w-9 h-9 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-pink-200 hover:text-white border border-pink-400/20 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white mb-4 shadow-glow-pink border border-white/40">
                <Heart className="w-8 h-8 fill-white" />
              </div>

              <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-2">
                A Note From The Jar
              </span>

              {/* The Reason Text */}
              <div className="w-full my-3 p-5 rounded-2xl bg-white/5 border border-pink-400/20">
                <p className="font-serif text-lg sm:text-xl italic text-white leading-relaxed">
                  "{currentReason}"
                </p>
              </div>

              <p className="text-xs font-handwriting text-2xl text-pink-300 mb-5">
                Forever grateful for you, Abby 💕
              </p>

              {/* Draw another button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentReason(null);
                  setTimeout(() => shakeJar(), 200);
                }}
                className="w-full py-3.5 min-h-[48px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-glow-pink touch-manipulation border border-pink-300/30"
              >
                Draw Another Reason 🌸
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
