import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { APP_CONFIG } from '../config';

export default function FloatingAudioWidget() {
  const [audioState, setAudioState] = useState({
    isPlaying: audioManager.isPlaying,
    isMuted: audioManager.isMuted,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState({ ...state });
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(15);
    }
    audioManager.togglePlay();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(15);
    }
    audioManager.toggleMute();
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 touch-manipulation select-none">
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-panel-deep rounded-full border border-pink-400/40 shadow-glow-pink p-1.5 flex items-center gap-2 cursor-pointer backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {/* Rotating Vinyl Disc Indicator */}
        <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: audioState.isPlaying ? 360 : 0 }}
            transition={{
              repeat: audioState.isPlaying ? Infinity : 0,
              duration: 3.5,
              ease: 'linear',
            }}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-950 border border-pink-400/30 flex items-center justify-center shadow-md relative overflow-hidden"
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1.5 rounded-full border border-stone-700/60" />
            <div className="absolute inset-2.5 rounded-full border border-stone-600/40" />
            {/* Vinyl label */}
            <div className="w-4 h-4 rounded-full bg-pink-500/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            </div>
          </motion.div>

          {/* Glowing music wave indicator if playing */}
          {audioState.isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
            </span>
          )}
        </div>

        {/* Collapsed / Expanded Song Label */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col pr-1 overflow-hidden whitespace-nowrap"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300">
                Playing for Abby
              </span>
              <span className="text-xs text-white font-medium truncate max-w-[130px]">
                {APP_CONFIG.musicTitle}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause Button (Min 48px touch target) */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full glass-panel flex items-center justify-center text-pink-300 hover:text-white border border-pink-400/30 active:scale-95 transition-all touch-manipulation"
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play music'}
        >
          {audioState.isPlaying ? (
            <Pause className="w-5 h-5 fill-pink-400 text-pink-400" />
          ) : (
            <Play className="w-5 h-5 fill-pink-400 text-pink-400 ml-0.5" />
          )}
        </button>

        {/* Mute/Unmute Toggle (Accessible when expanded or directly) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={handleToggleMute}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-panel flex items-center justify-center text-pink-300 hover:text-white border border-pink-400/30 active:scale-95 transition-all touch-manipulation mr-1"
              aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
            >
              {audioState.isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-pink-300" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
