import React from 'react';
import Link from 'next/link';
import { brand } from '@/config/brand';

interface LogoProps {
  variant?: 'full' | 'monogram' | 'compact';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string;
}

export function Logo({
  variant = 'full',
  theme = 'auto',
  className = '',
  size = 'md',
  showTagline = true,
  href = '/',
}: LogoProps) {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  // Color classes depending on theme
  const textColor =
    theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const taglineColor =
    theme === 'dark'
      ? 'text-teal-200/80'
      : theme === 'light'
      ? 'text-slate-500'
      : 'text-slate-500 dark:text-teal-200/80';

  // The Monogram SVG: Modern geometric 'H' with ascending peak angles and architectural lines
  const MonogramSVG = (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      aria-label="Himal Estates Monogram"
    >
      <defs>
        <linearGradient id="himalTealGrad" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id="himalTerracottaGrad" x1="22" y1="8" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA580C" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
      </defs>

      {/* Rounded backdrop shield */}
      <rect width="44" height="44" rx="12" fill="currentColor" className="text-teal-950/10 dark:text-white/10" />

      {/* Left Pillar of 'H' */}
      <path
        d="M11 11H17V33H11V11Z"
        fill="url(#himalTealGrad)"
      />

      {/* Crossbar & Ascending Ridge connecting to right side */}
      <path
        d="M17 21L27 13V19L17 27V21Z"
        fill="url(#himalTerracottaGrad)"
      />

      {/* Right Pillar of 'H' with geometric peak top */}
      <path
        d="M27 13L33 8V33H27V13Z"
        fill="url(#himalTealGrad)"
      />

      {/* Subtle architectural foundation accent */}
      <circle cx="22" cy="32" r="2" fill="#C2410C" />
    </svg>
  );

  const content = (
    <div className={`group inline-flex items-center gap-3 ${className}`}>
      {MonogramSVG}

      {variant !== 'monogram' && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-bold tracking-tight ${textSizes[size]} ${textColor} transition-colors`}
            >
              Himal
            </span>
            <span
              className={`font-display font-semibold tracking-tight ${textSizes[size]} ${textColor}`}
            >
              Estates
            </span>
          </div>

          {showTagline && variant === 'full' && (
            <span
              className={`font-sans font-medium tracking-wider uppercase ${taglineSizes[size]} ${taglineColor}`}
            >
              {brand.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
