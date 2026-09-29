import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Delete, Sparkles, KeyRound } from 'lucide-react';
import { PIN_CODE, APP_CONFIG } from '../config';
import { audioManager } from '../utils/audioManager';

export default function PasscodeScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const maxDigits = PIN_CODE.length; // 4 digits

  const handleDigitPress = (digit) => {
    // Mobile tactile haptic feedback
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }

    if (pin.length >= maxDigits) return;

    const newPin = pin + digit;
    setPin(newPin);

    // If reached pin length, validate
    if (newPin.length === maxDigits) {
      if (newPin === PIN_CODE) {
        // Unlock audio on the user gesture event
        audioManager.unlockAndPlay();
        if (window.navigator?.vibrate) {
          window.navigator.vibrate([30, 40, 60]);
        }
        setTimeout(() => {
          onUnlock();
        }, 300);
      } else {
        // Wrong pin - shake & reset
        if (window.navigator?.vibrate) {
          window.navigator.vibrate([50, 50, 50]);
        }
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setPin('');
        }, 550);
      }
    }
  };

  const handleBackspace = () => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(10);
    }
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['hint', '0', 'delete'],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center justify-between min-h-[100dvh] w-full max-w-md mx-auto px-6 py-8 overflow-hidden select-none no-overscroll touch-manipulation"
    >
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center mt-6">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full glass-panel flex items-center justify-center mb-4 text-blush-400 border border-pink-400/30 shadow-glow-pink"
        >
          <Lock className="w-7 h-7 text-blush-300" />
        </motion.div>

        <h1 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-sm">
          For You, My Love
        </h1>
        <p className="text-blush-200/90 text-sm mt-2 flex items-center gap-1.5 font-light">
          <span>Enter our secret date</span>
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 inline" />
        </p>
      </div>

      {/* Secret PIN Indicators (Glowing Hearts) */}
      <div className="flex flex-col items-center my-auto w-full">
        <div
          className={`flex items-center justify-center gap-4 py-4 px-6 rounded-2xl glass-panel transition-all duration-300 ${
            isError ? 'animate-shake border-red-500/60 bg-red-950/20' : 'border-pink-500/20'
          }`}
        >
          {Array.from({ length: maxDigits }).map((_, index) => {
            const isFilled = index < pin.length;
            return (
              <motion.div
                key={index}
                animate={isFilled ? { scale: [0.8, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFilled
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-400 shadow-glow-pink border border-white/50 text-white'
                    : 'bg-white/5 border border-pink-300/20 text-transparent'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isFilled ? 'fill-white text-white opacity-100 scale-100' : 'opacity-20 scale-75'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Error notification or hint display */}
        <div className="h-8 mt-3 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {isError ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-rose-300 tracking-wide bg-rose-950/50 px-3 py-1 rounded-full border border-rose-500/30"
              >
                Not quite right, my love... try again 🥺
              </motion.span>
            ) : showHint ? (
              <motion.span
                key="hint"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-light text-blush-200 bg-plum-800/80 px-3.5 py-1 rounded-full border border-pink-400/20 shadow-sm"
              >
                💡 Hint: December 4th ({PIN_CODE})
              </motion.span>
            ) : (
              <span className="text-xs text-rose-200/50 font-light">
                4 digits of our special moment
              </span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3x4 Circular Numeric Keypad */}
      <div className="w-full max-w-[320px] pb-4">
        <div className="grid grid-cols-3 gap-3.5 place-items-center">
          {keypad.map((row, rIdx) =>
            row.map((item, cIdx) => {
              if (item === 'hint') {
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="w-16 h-16 min-w-[48px] min-h-[48px] rounded-full glass-panel flex flex-col items-center justify-center text-blush-300/80 active:scale-90 active:bg-white/20 transition-transform duration-100 touch-manipulation border border-pink-400/20"
                    aria-label="Hint"
                  >
                    <Sparkles className="w-5 h-5 text-blush-300" />
                    <span className="text-[10px] tracking-tight mt-0.5 opacity-70">Hint</span>
                  </button>
                );
              }

              if (item === 'delete') {
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    type="button"
                    onClick={handleBackspace}
                    className="w-16 h-16 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-blush-300/90 active:scale-90 active:bg-white/20 transition-transform duration-100 touch-manipulation border border-pink-400/20"
                    aria-label="Delete digit"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                );
              }

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onClick={() => handleDigitPress(item)}
                  className="w-16 h-16 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-2xl font-serif font-normal text-white active:scale-90 active:bg-pink-500/30 transition-all duration-100 touch-manipulation border border-pink-400/25 shadow-sm hover:border-pink-300/50"
                  aria-label={`Digit ${item}`}
                >
                  {item}
                </button>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}
