import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LETTER_CONTENT } from '../config';

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(20);
    }
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      // Gentle sprinkle of pink confetti
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#ff85a1', '#f7cad0', '#ffb703'],
      });
    }
  };

  return (
    <section className="relative w-full py-8 px-4 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase text-pink-300 glass-pill border border-pink-500/20 mb-2">
          <Feather className="w-3.5 h-3.5 text-pink-400" />
          Words From My Heart
        </span>
        <h2 className="font-serif text-3xl text-white font-medium">
          The 17th Birthday Letter
        </h2>
        <p className="text-xs text-blush-200/70 mt-1 max-w-xs mx-auto font-light">
          A sealed letter written especially for you, my wifey
        </p>
      </div>

      {/* Envelope / Parchment Card Container */}
      <div className="w-full max-w-md">
        {/* Closed Envelope Teaser */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggle}
            className="w-full rounded-3xl glass-panel-deep p-8 flex flex-col items-center text-center cursor-pointer border border-pink-400/30 shadow-glow-pink relative overflow-hidden group touch-manipulation"
          >
            {/* Shimmer background bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Glowing Wax Stamp */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 flex items-center justify-center shadow-lg border-2 border-pink-200/60 mb-5 relative">
              <Mail className="w-9 h-9 text-white" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400/90 text-rose-950 flex items-center justify-center text-[10px] font-bold shadow-md">
                {LETTER_CONTENT.envelopeBadge}
              </div>
            </div>

            <h3 className="font-serif text-2xl text-white font-medium mb-1">
              {LETTER_CONTENT.envelopeTitle}
            </h3>
            <p className="text-xs text-pink-200/80 font-light mb-6">
              Tap the wax seal to unfold your letter 💌
            </p>

            <button
              type="button"
              className="px-6 py-3 min-h-[48px] rounded-full bg-white/10 hover:bg-white/15 text-pink-200 font-serif text-sm font-medium border border-pink-400/30 flex items-center gap-2 shadow-sm touch-manipulation"
            >
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              <span>Break the Seal</span>
              <Sparkles className="w-4 h-4 text-pink-300" />
            </button>
          </motion.div>
        )}

        {/* Unfolded Parchment / Frosted Glass Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl glass-panel-deep p-6 sm:p-8 border border-pink-400/40 shadow-glow-rose relative overflow-hidden"
            >
              {/* Decorative top ribbon */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-400/20">
                <div className="flex items-center gap-2 text-pink-300">
                  <MailOpen className="w-5 h-5 text-pink-400" />
                  <span className="text-xs uppercase tracking-widest font-medium">
                    A Letter For Abby
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-xs text-pink-300/80 hover:text-white px-3 py-1.5 min-h-[48px] flex items-center justify-center rounded-full glass-pill border border-pink-400/20 touch-manipulation"
                >
                  Fold Letter
                </button>
              </div>

              {/* Romantic Letter Content */}
              <div className="space-y-4 font-serif text-rose-100 text-base leading-relaxed tracking-wide selection:bg-pink-500/30">
                <p className="text-2xl font-serif font-semibold text-white tracking-normal drop-shadow-sm">
                  {LETTER_CONTENT.greeting}
                </p>

                {LETTER_CONTENT.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-blush-200 text-[15px] sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))}

                <div className="pt-4 border-t border-pink-400/20 text-right">
                  <p className="text-lg font-serif italic text-white font-medium">
                    {LETTER_CONTENT.closingGreeting}
                  </p>
                  <p className="text-2xl font-handwriting text-pink-300 mt-1">
                    {LETTER_CONTENT.signature}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
