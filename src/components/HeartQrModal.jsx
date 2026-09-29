import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Heart, X, Download, Share2, Check, Sparkles, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../config';

export default function HeartQrModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const websiteUrl = typeof window !== 'undefined' ? window.location.href : 'https://sshxiol.github.io/birthday-website/';

  const handleCopy = () => {
    navigator.clipboard?.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating / Footer Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-pink-400/40 text-xs font-medium text-pink-200 shadow-glow-pink hover:text-white transition-all touch-manipulation my-2"
        aria-label="View Heart QR Code"
      >
        <QrCode className="w-4 h-4 text-pink-400" />
        <span>Heart QR Code Gift Card</span>
        <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
      </motion.button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm glass-panel-deep rounded-3xl p-5 border border-pink-400/40 shadow-2xl flex flex-col items-center z-10 overflow-hidden text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 min-w-[44px] min-h-[44px] rounded-full glass-panel flex items-center justify-center text-pink-200 border border-pink-400/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Subtitle */}
              <div className="flex items-center gap-1.5 text-pink-300 mb-1 mt-1">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  Printable Gift Card
                </span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-white">
                Heart QR Code
              </h3>
              <p className="text-xs text-blush-200/80 font-light mt-0.5 max-w-xs leading-relaxed">
                Scan with any smartphone camera to open {APP_CONFIG.girlfriendName}'s birthday website 💕
              </p>

              {/* Heart QR Graphic Preview */}
              <div className="relative w-64 h-64 my-4 rounded-2xl overflow-hidden shadow-2xl border border-pink-400/30 bg-[#140a16] flex items-center justify-center p-2 group">
                <img
                  src="/qr-heart.png"
                  alt="Heart QR Code"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 w-full mt-2">
                <a
                  href="/qr-heart.png"
                  download="Abby-Heart-QR-Code.png"
                  className="py-2.5 px-3 min-h-[44px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-serif text-xs font-medium shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Image (PNG)</span>
                </a>

                <a
                  href="/qr-heart.svg"
                  download="Abby-Heart-QR-Code.svg"
                  className="py-2.5 px-3 min-h-[44px] rounded-xl glass-panel text-pink-200 hover:text-white text-xs font-medium border border-pink-400/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Vector (SVG)</span>
                </a>
              </div>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-full mt-2 py-2 px-3 min-h-[40px] rounded-xl glass-panel text-pink-300/80 hover:text-pink-200 text-xs flex items-center justify-center gap-1.5 border border-pink-400/20 active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Website Link</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
