# Design System — Himal Estates

**Version:** 1.0  
**Last updated:** November 2024

> This is the **single source of truth** for all visual design decisions. Every UI component must reference these tokens. No hardcoded hex values in component files — use Tailwind utility classes mapped to these tokens.

---

## 1. Brand Identity Rationale

### Why Teal + Terracotta?

| Color | Meaning in Nepali Context |
|-------|--------------------------|
| **Teal (#0F766E)** | Himalayan evergreen forests — trust, permanence, growth. Used across insurance, banking (NIC Asia, Nabil Bank use green family). Real estate = investment = stability → teal grounds the brand. |
| **Terracotta (#C2410C)** | Nepali architecture (Patan Durbar brick), prayer flags, sindoor, auspicious ceremony. Warm accent for CTAs — creates urgency and cultural familiarity without being aggressive. |
| **Warm white (#F8FAFC)** | Not clinical white — slightly warm to feel like natural light on a Himalayan morning. |
| **Deep slate (#0F172A)** | Rich ink-black for text — premium, legible, not harsh. |

### Why Plus Jakarta Sans (not Cinzel or a Devanagari-first font)?

Cinzel is beautiful but designed for Latin display — it doesn't pair well with Devanagari and renders poorly on mobile. Plus Jakarta Sans is:
- Geometric, modern, slightly quirky — memorable
- Excellent at all weights for both display and body
- Renders cleanly on Android (dominant in Nepal)
- Free on Google Fonts

Noto Sans Devanagari is paired for all Nepali text — it was designed specifically for digital Devanagari readability.

---

## 2. Color Tokens

### Palette

```css
/* Primary — Himalayan Teal */
--color-primary-900: #042f2e;
--color-primary-800: #0d3d3c;
--color-primary-700: #0f5752;
--color-primary-600: #0f766e;   /* PRIMARY — main brand color */
--color-primary-500: #14b8a6;   /* SECONDARY TEAL — lighter actions */
--color-primary-400: #2dd4bf;
--color-primary-300: #5eead4;
--color-primary-200: #99f6e4;
--color-primary-100: #ccfbf1;
--color-primary-50:  #f0fdfa;

/* Accent — Terracotta / Saffron */
--color-accent-900: #431407;
--color-accent-800: #7c2d12;
--color-accent-700: #9a3412;
--color-accent-600: #c2410c;    /* ACCENT — CTAs, badges, hot deals */
--color-accent-500: #ea580c;
--color-accent-400: #f97316;
--color-accent-300: #fb923c;
--color-accent-100: #ffedd5;
--color-accent-50:  #fff7ed;

/* Neutral / UI */
--color-bg:          #f8fafc;   /* Page background */
--color-surface:     #ffffff;   /* Card backgrounds */
--color-border:      #e2e8f0;   /* Borders, dividers */
--color-text:        #0f172a;   /* Primary text */
--color-text-muted:  #64748b;   /* Secondary text, placeholders */
--color-text-subtle: #94a3b8;   /* Timestamps, fine print */

/* Semantic */
--color-success: #16a34a;
--color-warning: #d97706;
--color-error:   #dc2626;
--color-info:    #2563eb;
```

### Tailwind Config Mapping

```typescript
// tailwind.config.ts → extend.colors
colors: {
  primary: {
    DEFAULT: '#0F766E',
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4',
    300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6',
    600: '#0f766e', 700: '#0f5752', 800: '#0d3d3c', 900: '#042f2e',
  },
  accent: {
    DEFAULT: '#C2410C',
    50: '#fff7ed', 100: '#ffedd5', 300: '#fb923c',
    400: '#f97316', 500: '#ea580c', 600: '#c2410c',
    700: '#9a3412', 800: '#7c2d12', 900: '#431407',
  },
  'warm-bg': '#F8FAFC',
  'deep-text': '#0F172A',
  'muted-text': '#64748B',
  'subtle-text': '#94A3B8',
  'card-border': '#E2E8F0',
}
```

### Usage Rules

| Token | Use For | Do NOT Use For |
|-------|---------|---------------|
| `primary-600` | Nav active state, primary buttons, links | Backgrounds (too dark) |
| `primary-500` | Secondary buttons, tags, chips | Primary CTAs |
| `primary-50` | Chip/badge backgrounds, light section bg | Text |
| `accent-600` | CTA buttons ("WhatsApp", "Inquire Now"), Hot Deal badge | Navigation |
| `accent-100` | CTA button hover background | Dark backgrounds |
| `warm-bg` | Page background | Cards (use white) |
| `deep-text` | Headings, prices, labels | Descriptions |
| `muted-text` | Descriptions, meta, labels | Headings |

---

## 3. Typography

### Font Families

```css
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-nepali:  'Noto Sans Devanagari', system-ui, sans-serif;
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-display-2xl` | 60px / 3.75rem | 1.1 | 800 | Hero headline |
| `text-display-xl` | 48px / 3rem | 1.15 | 700 | Page hero |
| `text-display-lg` | 36px / 2.25rem | 1.2 | 700 | Section header |
| `text-display-md` | 30px / 1.875rem | 1.3 | 700 | Card group header |
| `text-display-sm` | 24px / 1.5rem | 1.35 | 600 | Card title |
| `text-xl` | 20px / 1.25rem | 1.4 | 600 | Sub-headers |
| `text-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| `text-base` | 16px / 1rem | 1.6 | 400 | Body text |
| `text-sm` | 14px / 0.875rem | 1.5 | 400 | Captions, meta |
| `text-xs` | 12px / 0.75rem | 1.5 | 400 | Timestamps, badges |

### Heading Hierarchy Rules

- One `<h1>` per page — always Plus Jakarta Sans, 700+ weight
- Section headers: `<h2>` with `text-display-md`
- Card titles: `<h3>` with `text-display-sm`
- Never skip heading levels
- Nepali text (`lang="ne"`): add `font-nepali` class

### Price Formatting

```typescript
// All prices use formatNPR from src/lib/utils.ts
// Output: "रू १,२०,०००" or "NPR 1,20,000"
// Nepali number format uses comma at thousands & lakhs
// 100000 → "1,00,000" (Nepali) not "100,000" (Western)
```

---

## 4. Spacing System

**Base unit:** 4px

```
4px   = space-1   (tight gaps between icon and text)
8px   = space-2   (inner padding, dense lists)
12px  = space-3   (small gaps)
16px  = space-4   (default padding, card inner)
20px  = space-5   (section inner gaps)
24px  = space-6   (card gap in grid)
32px  = space-8   (section padding top/bottom on mobile)
40px  = space-10  (medium sections)
48px  = space-12  (large section padding)
64px  = space-16  (page section gap)
80px  = space-20  (hero padding)
96px  = space-24  (page max top padding)
```

### Layout Containers

```css
/* Max widths */
--container-sm:  640px   /* Mobile modal content */
--container-md:  768px   /* Single column content */
--container-lg:  1024px  /* Two column layouts */
--container-xl:  1280px  /* Full site max width */
--container-2xl: 1440px  /* Wide hero sections */
```

### Grid

- **Listing grid:** 1 col (mobile) → 2 col (md) → 3 col (lg) → 4 col (xl)
- **Admin grid:** 1 col → 2 col sidebar layout (lg)
- **Gap:** `gap-6` (24px) standard, `gap-4` (16px) tight grids

---

## 5. Border Radius

```
4px   = rounded-sm    (table cells, tight elements)
8px   = rounded-md    (inputs, buttons, form fields)
12px  = rounded-xl    (cards, panels, modals)
16px  = rounded-2xl   (feature cards, hero elements)
24px  = rounded-3xl   (pills, tags, chips)
9999px = rounded-full (avatars, circular buttons)
```

---

## 6. Shadows

No harsh `box-shadow: 0 4px 6px rgba(0,0,0,0.5)`. All shadows are **multi-layer, soft**.

```css
/* Card shadow — default */
--shadow-card: 
  0 1px 3px rgba(15, 23, 42, 0.04),
  0 4px 12px rgba(15, 23, 42, 0.06);

/* Card shadow — hover */
--shadow-card-hover: 
  0 4px 8px rgba(15, 23, 42, 0.06),
  0 12px 32px rgba(15, 23, 42, 0.10);

/* Modal / sheet */
--shadow-modal:
  0 8px 24px rgba(15, 23, 42, 0.12),
  0 2px 8px rgba(15, 23, 42, 0.06);

/* Admin sidebar */
--shadow-sidebar:
  2px 0 16px rgba(15, 23, 42, 0.06);

/* Primary button */
--shadow-btn-primary:
  0 2px 8px rgba(15, 118, 110, 0.30);

/* Accent button (WhatsApp CTA) */
--shadow-btn-accent:
  0 2px 8px rgba(194, 65, 12, 0.30);
```

### Tailwind Shadow Utilities

```typescript
// tailwind.config.ts → extend.boxShadow
boxShadow: {
  'card':       '0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)',
  'card-hover': '0 4px 8px rgba(15,23,42,0.06), 0 12px 32px rgba(15,23,42,0.10)',
  'modal':      '0 8px 24px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)',
  'btn-primary':'0 2px 8px rgba(15,118,110,0.30)',
  'btn-accent': '0 2px 8px rgba(194,65,12,0.30)',
}
```

---

## 7. Motion & Animation

```css
/* Standard ease */
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);   /* Snappy deceleration */
--ease-in:    cubic-bezier(0.4, 0, 1, 1);
--ease-inout: cubic-bezier(0.4, 0, 0.2, 1);

/* Durations */
--duration-fast:   100ms   /* Hover states, small toggles */
--duration-std:    200ms   /* Standard transitions (DEFAULT) */
--duration-enter:  300ms   /* Modals, sheets entering */
--duration-exit:   150ms   /* Elements leaving */
--duration-slow:   500ms   /* Page transitions, hero animations */
```

### Rules

- **Never use transitions > 500ms** on interactive elements (feels sluggish on mobile)
- Card hover: `transform: translateY(-2px)` + shadow upgrade, `200ms ease-out`
- Modal open: fade + scale from 0.96 to 1.0, `300ms ease-out`
- Skeleton loaders: pulse animation, `1.5s` loop
- WhatsApp float button: subtle bounce entry on page load

---

## 8. Component Specifications

### 8.1 ListingCard

```
┌─────────────────────────────┐
│  [Image 16:9]               │  ← Next.js Image, object-cover
│  [🔥 Hot Deal]  [⭐ Feature] │  ← absolute badges, top-left
│─────────────────────────────│
│  रू ८५,०००/month             │  ← accent-600, text-display-sm
│  3BHK Apartment in Baneshwor│  ← deep-text, text-xl, font-display
│  📍 Baneshwor, Kathmandu    │  ← muted-text, text-sm
│  🏠 Flat  •  1200 Sqft      │  ← chips, text-xs, primary-50 bg
│  [WhatsApp] [View Details →]│  ← accent btn + ghost btn
└─────────────────────────────┘
```

**States:**
- Default: `shadow-card`, rounded-xl
- Hover: `shadow-card-hover`, `translateY(-2px)`, `200ms ease-out`
- Loading: Skeleton with pulse
- Featured: gold ring `ring-2 ring-yellow-400`
- Hot Deal: red banner corner

---

### 8.2 SearchBar (Hero)

```
┌──────────────────────────────────────────┐
│ [🔍] Search by location, type, keyword... │
│ [Type ▼] [Location ▼] [Price ▼] [Search] │
└──────────────────────────────────────────┘
```

- Background: white, `shadow-card`
- Border radius: 12px outer, 8px inputs
- Search button: `accent-600` with `shadow-btn-accent`
- Responsive: filters collapse to sheet on mobile

---

### 8.3 CategoryTile

```
┌──────────────┐
│   🏠          │  ← emoji or SVG icon, 32px
│  Residential │  ← text-sm, font-display, 600
│  245 listings│  ← text-xs, muted-text
└──────────────┘
```

- Hover: `primary-50` background, `primary-600` icon
- Selected: `primary-600` bg, white text
- Rounded-2xl, 16px padding

---

### 8.4 Buttons

| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|---------|
| `primary` | `primary-600` | white | — | Main actions |
| `primary-outline` | transparent | `primary-600` | `primary-600` | Secondary |
| `accent` | `accent-600` | white | — | WhatsApp, Inquire |
| `accent-ghost` | transparent | `accent-600` | — | Soft CTA |
| `ghost` | transparent | `deep-text` | — | Nav, tertiary |
| `destructive` | `error` | white | — | Delete, remove |

All buttons: `rounded-md`, `font-medium`, `200ms transition`, `shadow-btn-*` on primary/accent.

---

### 8.5 Badge / Chip

| Type | Background | Text | Use |
|------|-----------|------|-----|
| `hot-deal` | `accent-600` | white | 🔥 Hot Deal overlay |
| `featured` | `yellow-400` | `yellow-900` | ⭐ Featured |
| `new` | `primary-500` | white | New listing |
| `rented` | `muted-text` | white | No longer available |
| `type` | `primary-50` | `primary-700` | Flat, Land, etc. |
| `location` | `warm-bg` | `muted-text` | Baneshwor, etc. |

Rounded-3xl, text-xs, font-500, px-3 py-1.

---

### 8.6 Admin Stat Card

```
┌─────────────────────┐
│ 📋  Total Leads      │
│ 148                  │  ← text-display-lg, deep-text
│ ↑ 12% this week      │  ← text-xs, success green
└─────────────────────┘
```

- White background, `shadow-card`, `rounded-xl`
- Left border: 4px `primary-600` (or accent for revenue card)
- Icon: 24px, `primary-600`

---

### 8.7 Navigation

**Desktop Navbar:**
- Height: 64px
- Background: white, `shadow: 0 1px 3px rgba(0,0,0,0.06)`
- Logo left, links center, CTA right (WhatsApp button)
- Active link: `primary-600` with bottom 2px underline
- Sticky on scroll with backdrop blur

**Mobile Nav:**
- Hamburger → slide-in Sheet from right (shadcn Sheet)
- Full-height, 280px wide
- Brand colors, social links at bottom

---

## 9. Imagery Guidelines

- **Hero image:** Aerial Kathmandu skyline with mountain backdrop — teal-tinted overlay at 40% opacity
- **Listing images:** Real photos preferred; placeholder shows brand gradient with property type icon
- **Image ratio:** 16:9 for listing cards, 4:3 for detail gallery thumbnails
- **Alt text:** Always descriptive: `"3BHK apartment in Baneshwor, Kathmandu — living room view"`
- **Format:** WebP primary, JPEG fallback; use Next.js `<Image>` always

---

## 10. Iconography

- Library: **Lucide React** (clean, consistent stroke icons)
- Size: 16px (inline text), 20px (buttons), 24px (nav/cards), 32px (category tiles), 48px (empty states)
- Stroke width: 1.5px (default Lucide)
- Color: inherits from parent (`currentColor`) — never hardcode icon colors

---

*Design system version-controlled in `docs/design-system.md`. Any changes require a `decisions.md` entry.*
