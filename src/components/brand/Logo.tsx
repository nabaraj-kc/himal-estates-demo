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
      ? 'text-zinc-400'
      : 'text-[#71717A]';

  // The Monogram SVG: Modern geometric 'H' with architectural lines in monochrome Ink Black
  const MonogramSVG = (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      aria-label="Himal Estates Monogram"
    >
      {/* Rounded backdrop shield */}
      <rect width="44" height="44" rx="10" fill="#0F0F0F" />

      {/* Left Pillar of 'H' */}
      <path
        d="M12 11H17V33H12V11Z"
        fill="#FFFFFF"
      />

      {/* Crossbar & Ascending Ridge */}
      <path
        d="M17 21L27 14V19L17 26V21Z"
        fill="#E5E5E5"
      />

      {/* Right Pillar of 'H' with geometric peak top */}
      <path
        d="M27 14L32 10V33H27V14Z"
        fill="#FFFFFF"
      />

      {/* Clean architectural foundation dot */}
      <circle cx="22" cy="31" r="1.75" fill="#FFFFFF" />
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
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F0F] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
