import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Calendar, Stars, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

import BackgroundEffects from './components/BackgroundEffects';
import PasscodeScreen from './components/PasscodeScreen';
import MatrixRainIntro from './components/MatrixRainIntro';
import BouquetSection from './components/BouquetSection';
import LetterSection from './components/LetterSection';
import PhotoGallery from './components/PhotoGallery';
import GratefulJar from './components/GratefulJar';
import FloatingAudioWidget from './components/FloatingAudioWidget';
import { APP_CONFIG } from './config';

export default function App() {
  // Steps: 'passcode' -> 'intro' -> 'main'
  const [currentStep, setCurrentStep] = useState('passcode');

  const handleReplayConfetti = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(30);
    }
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff85a1', '#f7cad0', '#ffb703', '#ffffff', '#ff4d6d'],
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#120811] text-rose-100 flex flex-col items-center justify-start overflow-x-hidden no-overscroll">
      {/* Universal Ambient Glowing Background */}
      <BackgroundEffects />

      {/* App Container - Centered Mobile Reel */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col min-h-[100dvh]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Secret Keypad Lockscreen */}
          {currentStep === 'passcode' && (
            <motion.div
              key="step-passcode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <PasscodeScreen onUnlock={() => setCurrentStep('intro')} />
            </motion.div>
          )}

          {/* STEP 2: Pink Matrix Cyber Rain Intro */}
          {currentStep === 'intro' && (
            <motion.div
              key="step-intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <MatrixRainIntro onComplete={() => setCurrentStep('main')} />
            </motion.div>
          )}

          {/* STEP 3: Main Romantic Birthday Experience */}
          {currentStep === 'main' && (
            <motion.div
              key="step-main"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col pb-28"
            >
              {/* Romantic Hero Header */}
              <header className="relative w-full pt-10 pb-6 px-6 text-center flex flex-col items-center">
                {/* Age & Year Pill */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/30 text-xs text-pink-300 font-medium tracking-widest uppercase mb-4 shadow-glow-pink"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Celebrating 17 Beautiful Years</span>
                </motion.div>

                {/* Big Romantic Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,133,161,0.5)]">
                  Happy Birthday, <br />
                  <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-blush-400 bg-clip-text text-transparent italic">
                    {APP_CONFIG.girlfriendName} 💕
                  </span>
                </h1>

                {/* Subtitle milestone */}
                <p className="font-serif text-base sm:text-lg text-blush-200/90 mt-3 max-w-xs mx-auto italic">
                  "3 birthdays together, 2 years in love, and a lifetime of adventures ahead."
                </p>

                {/* Quick stats / Love milestones badge */}
                <div className="grid grid-cols-3 gap-2 w-full mt-6">
                  <div className="glass-panel p-2.5 rounded-2xl flex flex-col items-center text-center border border-pink-400/20">
                    <span className="font-serif text-xl font-bold text-white">17</span>
                    <span className="text-[10px] text-pink-300/80 uppercase tracking-tight">Years Old</span>
                  </div>
                  <div className="glass-panel p-2.5 rounded-2xl flex flex-col items-center text-center border border-pink-400/20">
                    <span className="font-serif text-xl font-bold text-pink-400">3rd</span>
                    <span className="text-[10px] text-pink-300/80 uppercase tracking-tight">BDay Together</span>
                  </div>
                  <div className="glass-panel p-2.5 rounded-2xl flex flex-col items-center text-center border border-pink-400/20">
                    <span className="font-serif text-xl font-bold text-white">∞</span>
                    <span className="text-[10px] text-pink-300/80 uppercase tracking-tight">Love For You</span>
                  </div>
                </div>

                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent my-6" />
              </header>

              {/* Section 1: Digital Flower Bouquet */}
              <BouquetSection />

              <div className="w-20 h-px bg-pink-400/20 mx-auto my-3" />

              {/* Section 2: The 17th Birthday Letter */}
              <LetterSection />

              <div className="w-20 h-px bg-pink-400/20 mx-auto my-3" />

              {/* Section 3: Polaroid Flips & Heart Collage */}
              <PhotoGallery />

              <div className="w-20 h-px bg-pink-400/20 mx-auto my-3" />

              {/* Section 4: Interactive Grateful Jar */}
              <GratefulJar />

              {/* Romantic Closing Message & Replay Action */}
              <footer className="mt-8 px-6 text-center flex flex-col items-center">
                <div className="glass-panel-deep p-6 rounded-3xl border border-pink-400/30 w-full flex flex-col items-center shadow-glow-pink">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
                    <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-white">
                    I Love You Always, Abby
                  </h3>
                  <p className="text-xs text-blush-200/80 font-light mt-1 max-w-xs leading-relaxed">
                    Thank you for being my dream girl and filling my world with so much happiness.
                  </p>

                  <div className="flex items-center gap-3 mt-5 w-full">
                    <button
                      type="button"
                      onClick={handleReplayConfetti}
                      className="flex-1 py-3 min-h-[48px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-serif text-sm font-medium shadow-md flex items-center justify-center gap-1.5 touch-manipulation active:scale-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Celebrate! 🎉</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('passcode')}
                      className="px-4 py-3 min-h-[48px] rounded-xl glass-panel text-pink-300 text-xs font-medium border border-pink-400/30 hover:text-white touch-manipulation flex items-center gap-1"
                      title="Lock & replay from start"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Replay</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-pink-300/50 font-light mt-6">
                  Crafted with boundless love for your 17th birthday 💕
                </p>
              </footer>

              {/* Floating Thumb-Reachable Audio Pill */}
              <FloatingAudioWidget />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
