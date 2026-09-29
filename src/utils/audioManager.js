// Audio Manager with graceful Web Audio API fallback for romantic ambient music
import { AUDIO_SRC } from '../config';

class AudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.audioContext = null;
    this.synthInterval = null;
    this.subscribers = new Set();
    this.hasUserGestureUnlocked = false;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => cb({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    }));
  }

  init() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(AUDIO_SRC);
      this.audio.loop = true;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Local audio file not found or blocked. Starting ambient romantic melody generator...', e);
        if (this.hasUserGestureUnlocked) {
          this.startAmbientSynth();
        }
      });
    }
  }

  // Triggered on the user gesture (unlock PIN)
  async unlockAndPlay() {
    this.hasUserGestureUnlocked = true;
    this.init();

    // Unlock Web Audio Context for iOS / mobile browsers
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx && !this.audioContext) {
      try {
        this.audioContext = new AudioCtx();
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
      } catch (err) {
        console.warn('AudioContext init error:', err);
      }
    }

    // Try HTML5 audio first
    if (this.audio) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
      } catch (err) {
        console.warn('HTML5 audio play rejected, fallback to procedural ambient chords:', err);
        this.startAmbientSynth();
      }
    } else {
      this.startAmbientSynth();
    }
  }

  // Romantic ambient lullaby chords (Ethereal romantic acoustic vibe)
  startAmbientSynth() {
    if (this.synthInterval || !this.audioContext) return;
    this.isPlaying = true;
    this.notify();

    // Gentle pentatonic romantic notes (C4, D4, E4, G4, A4, C5, D5, E5, G5)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C maj
      [220.00, 261.63, 329.63, 440.00], // A min
      [174.61, 220.00, 261.63, 349.23], // F maj
      [196.00, 246.94, 293.66, 392.00], // G maj
    ];

    let chordIdx = 0;
    const playArp = () => {
      if (!this.isPlaying || this.isMuted || !this.audioContext) return;
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isPlaying || this.isMuted) return;
          try {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

            // Soft envelope: swell and gentle decay
            gain.gain.setValueAtTime(0, this.audioContext.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, this.audioContext.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 2.5);

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.start();
            osc.stop(this.audioContext.currentTime + 2.6);
          } catch (e) {
            console.error(e);
          }
        }, i * 380);
      });
    };

    playArp();
    this.synthInterval = setInterval(playArp, 2800);
  }

  stopAmbientSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopAmbientSynth();
    this.isPlaying = false;
    this.notify();
  }

  resume() {
    if (this.audio && this.audio.src) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {
        this.startAmbientSynth();
      });
    } else {
      this.startAmbientSynth();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    this.notify();
  }
}

export const audioManager = new AudioManager();
