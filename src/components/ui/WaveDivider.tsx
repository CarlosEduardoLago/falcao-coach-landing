import React from 'react';

interface WaveDividerProps {
  from: string;
  to: string;
  flip?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ from, to, flip = false }) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      <svg
        className="relative block w-full"
        style={{ height: '60px' }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`wave-grad-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C300,60 900,0 1200,40 L1200,60 L0,60 Z"
          fill={`url(#wave-grad-${from}-${to})`}
        />
      </svg>
    </div>
  );
};
