import React from 'react';

export default function AnimatedSeajinLogo({ height = 75, showText = true, isWhiteText = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        background: 'transparent'
      }}
    >
      <style>{`
        @keyframes seajinForkMove {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3.5px) rotate(-6deg); }
        }
        @keyframes seajinSpoonMove {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3.5px) rotate(6deg); }
        }
        @keyframes seajinLeafSway {
          0%, 100% { transform: rotate(0deg) scale(1); transform-origin: bottom center; }
          33% { transform: rotate(5deg) scale(1.05); transform-origin: bottom center; }
          66% { transform: rotate(-4deg) scale(1.02); transform-origin: bottom center; }
        }
        @keyframes seajinGlow {
          0%, 100% { filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18)); }
          50% { filter: drop-shadow(0 6px 14px rgba(16, 185, 129, 0.4)); }
        }
        .seajin-animated-fork {
          animation: seajinForkMove 2.4s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .seajin-animated-spoon {
          animation: seajinSpoonMove 2.4s ease-in-out infinite 0.3s;
          transform-origin: center bottom;
        }
        .seajin-animated-leaf {
          animation: seajinLeafSway 3s ease-in-out infinite 0.15s;
          transform-origin: center bottom;
        }
        .seajin-logo-svg {
          animation: seajinGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* SVG Motion Emblem */}
      <svg
        className="seajin-logo-svg"
        height={height}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Outer Oval Ring Frame */}
        <ellipse
          cx="100"
          cy="60"
          rx="88"
          ry="48"
          fill="#ffffff"
          stroke="#0d2b5c"
          strokeWidth="6"
          style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))' }}
        />

        {/* Outer Accent Smile Curve */}
        <path
          d="M25 68 C 50 102, 150 102, 175 68"
          stroke="#52b32b"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 1. Fork (Left - Animated) */}
        <g className="seajin-animated-fork">
          {/* Fork handle */}
          <path d="M 62 55 L 62 82 C 62 85 58 85 58 82 L 58 55 Z" fill="#0d2b5c" />
          {/* Fork tines */}
          <path d="M 54 38 L 54 55 Q 60 62 66 55 L 66 38 H 63.5 L 63.5 50 H 61.5 L 61.5 38 H 58.5 L 58.5 50 H 56.5 L 56.5 38 Z" fill="#0d2b5c" />
        </g>

        {/* 2. Sprout / Leaves (Center - Animated) */}
        <g className="seajin-animated-leaf">
          {/* Main Stem */}
          <path d="M 98 84 Q 99 65 100 48" stroke="#52b32b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Center Main Leaf */}
          <path d="M 100 48 C 82 28, 102 18, 126 32 C 114 48, 106 50, 100 48 Z" fill="#52b32b" />
          <path d="M 101 47 C 108 38, 118 32, 124 33" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
          {/* Left Small Leaf */}
          <path d="M 98 62 C 84 52, 80 62, 90 72 C 94 69, 97 65, 98 62 Z" fill="#66c734" />
        </g>

        {/* 3. Spoon (Right - Animated) */}
        <g className="seajin-animated-spoon">
          {/* Spoon bowl */}
          <ellipse cx="140" cy="46" rx="9" ry="14" fill="#0d2b5c" />
          {/* Spoon handle */}
          <path d="M 141.5 58 L 141.5 82 C 141.5 85 138.5 85 138.5 82 L 138.5 58 Z" fill="#0d2b5c" />
        </g>
      </svg>

      {/* Typography below emblem */}
      {showText && (
        <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <div style={{
            fontSize: '1.35rem',
            fontWeight: '900',
            color: isWhiteText ? '#ffffff' : '#0d2b5c',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textShadow: isWhiteText ? '0 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.6)' : '0 2px 6px rgba(255,255,255,0.8)'
          }}>
            주식회사 서진
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '4px'
          }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: '#52b32b' }} />
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '900',
              color: isWhiteText ? '#a7f3d0' : '#0d2b5c',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              textShadow: isWhiteText ? '0 1px 4px rgba(0,0,0,0.8)' : 'none'
            }}>
              SEOJIN
            </span>
            <div style={{ width: '20px', height: '2px', backgroundColor: '#52b32b' }} />
          </div>
        </div>
      )}
    </div>
  );
}
