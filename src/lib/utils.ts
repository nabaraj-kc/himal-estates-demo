import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

// ------------------------------------------------------------------
// shadcn/ui default cn utility
// ------------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------------------------------------------
// formatNPR — Nepali number format (1,00,000 system)
// e.g. 1500000 → "NPR 15,00,000"
// e.g. 2500 → "NPR 2,500"
// ------------------------------------------------------------------

export function formatNPR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'NPR 0';

  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();

  let formatted: string;

  if (str.length <= 3) {
    formatted = str;
  } else {
    // Last 3 digits
    const last3 = str.slice(-3);
    // Remaining digits grouped in 2s (Indian/Nepali system)
    const rest = str.slice(0, -3);
    const groups: string[] = [];
    let i = rest.length;
    while (i > 0) {
      groups.unshift(rest.slice(Math.max(0, i - 2), i));
      i -= 2;
    }
    formatted = groups.join(',') + ',' + last3;
  }

  return `${isNegative ? '-' : ''}NPR ${formatted}`;
}

// ------------------------------------------------------------------
// formatNPRShort — compact form for cards
// e.g. 15000000 → "NPR 1.5 Cr"
// e.g. 2500000 → "NPR 25 Lakh"
// e.g. 150000 → "NPR 1.5 Lakh"
// ------------------------------------------------------------------

export function formatNPRShort(amount: number): string {
  if (isNaN(amount)) return 'NPR 0';

  if (amount >= 10_000_000) {
    const crore = amount / 10_000_000;
    return `NPR ${crore % 1 === 0 ? crore : crore.toFixed(1)} Cr`;
  }
  if (amount >= 100_000) {
    const lakh = amount / 100_000;
    return `NPR ${lakh % 1 === 0 ? lakh : lakh.toFixed(1)} Lakh`;
  }
  if (amount >= 1_000) {
    const k = amount / 1_000;
    return `NPR ${k % 1 === 0 ? k : k.toFixed(1)}K`;
  }
  return `NPR ${amount}`;
}

// ------------------------------------------------------------------
// formatDate — localized date formatting
// ------------------------------------------------------------------

export function formatDate(date: Date | string, locale: 'en' | 'ne' = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  if (locale === 'ne') {
    // Simple BS approximation note: for full BS calendar, use a dedicated library.
    // For now we return a Nepali-formatted date in AD with Devanagari numerals.
    const ad = format(d, 'dd/MM/yyyy');
    return toDevanagariNumerals(ad);
  }
  return format(d, 'MMM d, yyyy');
}

// ------------------------------------------------------------------
// formatRelativeTime — "2 days ago" style
// ------------------------------------------------------------------

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return formatDistanceToNow(d, { addSuffix: true });
}

// ------------------------------------------------------------------
// toDevanagariNumerals — convert ASCII digits to Devanagari
// ------------------------------------------------------------------

export function toDevanagariNumerals(str: string): string {
  const map: Record<string, string> = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
  };
  return str.replace(/[0-9]/g, (d) => map[d] ?? d);
}

// ------------------------------------------------------------------
// slugify — create URL-safe slug from listing title
// ------------------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ------------------------------------------------------------------
// truncate — truncate text with ellipsis
// ------------------------------------------------------------------

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

// ------------------------------------------------------------------
// getInitials — get initials from full name (for Avatar)
// ------------------------------------------------------------------

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

// ------------------------------------------------------------------
// buildWhatsAppLink — generate WhatsApp click-to-chat URL
// ------------------------------------------------------------------

export function buildWhatsAppLink(phone: string, message?: string): string {
  const encoded = message ? encodeURIComponent(message) : '';
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ''}`;
}

// ------------------------------------------------------------------
// getListingTypeColor — returns Tailwind classes for listing type badge
// ------------------------------------------------------------------

export function getListingTypeColor(type: string): string {
  const map: Record<string, string> = {
    sale: 'bg-primary-100 text-primary-700',
    rent: 'bg-blue-100 text-blue-700',
    lease: 'bg-purple-100 text-purple-700',
    business: 'bg-accent/10 text-accent-700',
    wanted: 'bg-yellow-100 text-yellow-700',
  };
  return map[type] ?? 'bg-gray-100 text-gray-700';
}

// ------------------------------------------------------------------
// parseQueryString — parse URL search params into an object
// ------------------------------------------------------------------

export function parseQueryString(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
