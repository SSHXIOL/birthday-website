import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function MatrixRainIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [isOpeningGift, setIsOpeningGift] = useState(false);

  // Sequence: Countdown -> Celebration words -> Reveal gift box
  const sequence = [
    { text: '3', subtitle: 'Get ready...', size: 'text-7xl font-serif' },
    { text: '2', subtitle: 'Something special for you...', size: 'text-7xl font-serif' },
    { text: '1', subtitle: 'Here it comes...', size: 'text-7xl font-serif' },
    { text: 'HAPPY', subtitle: 'To the sweetest girl...', size: 'text-5xl font-serif tracking-widest' },
    { text: 'BIRTHDAY', subtitle: 'To my entire universe...', size: 'text-4xl font-serif tracking-wider' },
    { text: APP_CONFIG.girlfriendName.toUpperCase(), subtitle: 'My beautiful wifey...', size: 'text-6xl font-serif font-bold text-pink-400' },
    { text: '❤️', subtitle: 'Forever & Always', size: 'text-7xl' },
  ];

  // Sequence timer controller
  useEffect(() => {
    if (sequenceIndex < sequence.length) {
      const duration = sequenceIndex < 3 ? 900 : 1100;
      const timer = setTimeout(() => {
        setSequenceIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShowGift(true);
    }
  }, [sequenceIndex, sequence.length]);

  // Pink Matrix Rain Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Characters: Romantic Japanese kana, hearts, sparkles & numbers
    const chars = '♡♥✿❀✧★1234567890ABBYLOVE17FOREVERSWEET'.split('');
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    const draw = () => {
      // Semi-transparent fade trail in deep plum
      ctx.fillStyle = 'rgba(18, 8, 17, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient coloring: Leading glyph is glowing white/blush, trailing glyphs are hot-pink/plum
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ff85a1';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = Math.random() > 0.4 ? '#ff85a1' : '#f7cad0';
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#e05780';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Heart-shaped celebratory confetti explosion
  const triggerConfettiExplosion = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate([40, 60, 100]);
    }
    setIsOpeningGift(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff85a1', '#f7cad0', '#ffb703', '#ffffff'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Grand burst in layers
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.4,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff85a1', '#f7cad0', '#ffd166'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff85a1', '#f7cad0', '#ffd166'],
      });
    }, 250);

    setTimeout(() => {
      onComplete();
    }, 1100);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden no-overscroll touch-manipulation">
      {/* Pink Cyber Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Central Sequence Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {!showGift && sequenceIndex < sequence.length && (
            <motion.div
              key={sequenceIndex}
              initial={{ opacity: 0, scale: 0.7, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h2
                className={`${sequence[sequenceIndex].size} text-white drop-shadow-[0_0_20px_rgba(255,133,161,0.8)]`}
              >
                {sequence[sequenceIndex].text}
              </h2>
              <p className="mt-3 text-sm text-blush-200/80 font-light tracking-widest uppercase">
                {sequence[sequenceIndex].subtitle}
              </p>
            </motion.div>
          )}

          {/* Animated Pulsing Gift Box */}
          {showGift && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: isOpeningGift ? 1.3 : 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 120 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={triggerConfettiExplosion}
            >
              <motion.div
                animate={isOpeningGift ? { rotate: [0, -10, 10, -20, 20, 0], scale: 1.2 } : { y: [0, -10, 0] }}
                transition={{ repeat: isOpeningGift ? 0 : Infinity, duration: 2, ease: 'easeInOut' }}
                className="relative w-36 h-36 rounded-3xl glass-panel-deep flex items-center justify-center border-2 border-pink-400/50 shadow-glow-pink p-4"
              >
                {/* Glowing Aura Ring */}
                <div className="absolute inset-0 rounded-3xl bg-pink-500/20 blur-xl animate-pulse" />

                <Gift className="w-16 h-16 text-blush-400 drop-shadow-[0_0_12px_rgba(255,133,161,0.9)]" />

                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-500/30 glass-pill flex items-center justify-center border border-pink-300/40"
                >
                  <Sparkles className="w-4 h-4 text-rose-200" />
                </motion.div>
              </motion.div>

              <div className="mt-6 flex flex-col items-center text-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-serif text-lg font-medium shadow-glow-pink border border-pink-300/40 flex items-center gap-2 touch-manipulation animate-pulse"
                >
                  <span>Tap to open your gift 🎁</span>
                </motion.button>
                <span className="text-xs text-blush-200/60 mt-2 font-light">
                  A special surprise waiting just for you
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button for quick preview */}
      <button
        type="button"
        onClick={() => {
          triggerConfettiExplosion();
        }}
        className="absolute bottom-6 right-6 text-xs text-rose-300/50 hover:text-rose-200 py-2 px-3 rounded-full border border-pink-500/10 glass-pill transition-colors touch-manipulation z-20"
      >
        Skip intro ✨
      </button>
    </div>
  );
}
