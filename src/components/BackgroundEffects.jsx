import React, { useMemo } from 'react';

export default function BackgroundEffects() {
  // Generate random twinkling stars and bokeh orbs
  const stars = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 19) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: `${2 + (i % 4)}px`,
      duration: `${3 + (i % 4)}s`,
      delay: `${(i * 0.4) % 3}s`,
      opacity: 0.25 + ((i % 5) * 0.15),
    }));
  }, []);

  const bokeh = useMemo(() => {
    return [
      { top: '10%', left: '15%', size: '260px', color: 'rgba(255, 133, 161, 0.12)', duration: '14s' },
      { top: '45%', right: '10%', size: '320px', color: 'rgba(247, 202, 208, 0.08)', duration: '18s' },
      { top: '75%', left: '20%', size: '280px', color: 'rgba(114, 9, 78, 0.25)', duration: '16s' },
      { top: '30%', left: '50%', size: '200px', color: 'rgba(255, 92, 138, 0.1)', duration: '12s' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Plum & Berry Gradient Base */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#160b15] via-[#210e1e] to-[#120811]" 
      />

      {/* Radial soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blush-400/10 via-transparent to-transparent" />

      {/* Glowing Bokeh Orbs */}
      {bokeh.map((item, idx) => (
        <div
          key={idx}
          className="absolute rounded-full blur-3xl animate-float"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            width: item.size,
            height: item.size,
            backgroundColor: item.color,
            animationDuration: item.duration,
          }}
        />
      ))}

      {/* Sparkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-rose-200 animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
            boxShadow: '0 0 6px rgba(255, 200, 220, 0.8)',
          }}
        />
      ))}

      {/* Subtle Noise / Texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30" />
    </div>
  );
}
