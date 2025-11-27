import React from 'react';

export const SinoutLogoInfinity = ({ className = "w-12 h-12", color = "currentColor" }: { className?: string, color?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
        <path
            d="M30 50 C30 30, 50 30, 50 50 C50 70, 70 70, 70 50 C70 30, 50 30, 50 50 C50 70, 30 70, 30 50 Z"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="scale(1.2) translate(-8, 0)"
        />
    </svg>
);

export const SinoutLogoWhite = ({ className = "w-32 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 200 60" fill="none" className={className}>
        {/* Infinity Symbol */}
        <path
            d="M30 30 C30 15, 45 15, 45 30 C45 45, 60 45, 60 30 C60 15, 45 15, 45 30 C45 45, 30 45, 30 30 Z"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        {/* Text */}
        <text x="75" y="40" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="white">Sinout</text>
    </svg>
);

export const SinoutLogoBlack = ({ className = "w-32 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 200 60" fill="none" className={className}>
        {/* Infinity Symbol */}
        <path
            d="M30 30 C30 15, 45 15, 45 30 C45 45, 60 45, 60 30 C60 15, 45 15, 45 30 C45 45, 30 45, 30 30 Z"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        {/* Text */}
        <text x="75" y="40" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="black">Sinout</text>
    </svg>
);
