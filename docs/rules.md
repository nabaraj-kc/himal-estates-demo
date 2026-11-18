# Coding Rules — Himal Estates

> These rules apply to **every file** in this codebase. All agents, contributors, and future maintainers must follow them. No exceptions without a `decisions.md` entry.

---

## 1. TypeScript

### Strict Mode — Non-Negotiable

```jsonc
// tsconfig.json — required settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Rules

| Rule | Good | Bad |
|------|------|-----|
| No `any` | `const data: Listing[] = ...` | `const data: any = ...` |
| No `as any` | Use type guards or Zod parse | `result as any` |
| No non-null assertion abuse | `if (user) user.name` | `user!.name` |
| Explicit return types on all functions | `function fn(): string {}` | `function fn() {}` |
| No implicit `{}` | Use `Record<string, unknown>` | `type Obj = {}` |
| Prefer `interface` for objects | `interface Listing { ... }` | `type Listing = { ... }` (for simple objects) |
| Use `Readonly<T>` for config objects | `const brand: Readonly<Brand> = ...` | Mutable config |
| Zod for all external/user data | `ListingSchema.parse(data)` | Manual type assertion |

### Imports

```typescript
// Good — named imports, organized
import { formatNPR, formatDate } from '@/lib/utils';
import type { Listing } from '@/types';

// Bad — wildcard, relative paths from deep nesting
import * as utils from '../../../lib/utils';
```

Import order (enforced by ESLint):
1. React / Next.js
2. Third-party libraries
3. Internal `@/` aliases (types, config, lib, components)
4. Relative `./` imports

---

## 2. Component Rules

### File Size Limit: **300 lines maximum**

If a component exceeds 300 lines, it must be split. No exceptions.

```
// Bad: ListingDetail.tsx with 800 lines
// Good:
ListingDetail.tsx          (~150 lines — layout orchestrator)
ListingGallery.tsx         (~100 lines)
ListingMetaPanel.tsx       (~100 lines)
ListingInquirySection.tsx  (~80 lines)
```

### Component Structure

```typescript
// Template for every component file

// 1. Imports (grouped)
import { type FC } from 'react';
import { cn } from '@/lib/utils';
import type { Listing } from '@/types';

// 2. Types / interfaces (local to this file)
interface ListingCardProps {
  listing: Listing;
  className?: string;
  priority?: boolean; // for Next Image
}

// 3. Component (named, not default where possible)
export const ListingCard: FC<ListingCardProps> = ({ listing, className, priority = false }) => {
  // 4. Hooks (top of function body)
  // 5. Derived state / computed values
  // 6. Handlers
  // 7. Return JSX
  return (
    <article className={cn('...', className)}>
      {/* ... */}
    </article>
  );
};

// 4. Default export (only when required by Next.js page convention)
// export default ListingCard;  ← only for page.tsx files
```

### Reusability Rules

- **Never duplicate UI patterns.** If you write the same JSX in two places, extract a component.
- **Props over internal state** when parent needs to control the component.
- **Composition over configuration.** Prefer `children` + small sub-components over a massive `config` prop object.
- **No inline styles.** All styling via Tailwind utility classes.
- **No hardcoded design values.** Use design system tokens: `text-primary-600`, `rounded-xl`, `shadow-card`.

### Server vs Client Components

```typescript
// Server Component (default — no directive needed):
// - Data fetching, static rendering, metadata
// - No useState, useEffect, event handlers

// Client Component (add directive when needed):
'use client';
// - useState, useEffect, event handlers
// - Browser APIs (localStorage, window)
// - Framer Motion, Leaflet

// Rule: Keep 'use client' as deep in the tree as possible.
// Never mark a whole page 'use client' just because one child needs it.
```

---

## 3. Accessibility (a11y)

### Required for Every Component

- [ ] All interactive elements (`button`, `a`, `input`) have accessible labels
- [ ] Icon-only buttons have `aria-label` or `title`
- [ ] Images have descriptive `alt` text (never empty string on content images)
- [ ] Form inputs paired with `<label>` (not just placeholder)
- [ ] Modals trap focus and restore on close
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for large text (WCAG AA)
- [ ] No keyboard traps
- [ ] Focus visible on all interactive elements (not removed by `outline: none` without replacement)
- [ ] `lang` attribute on `<html>` matches current locale (`en` or `ne`)

### Semantic HTML

```typescript
// Good
<main>
  <article>
    <h1>3BHK Apartment in Baneshwor</h1>
    <section aria-label="Listing details">...</section>
  </article>
</main>
<nav aria-label="Site navigation">...</nav>

// Bad
<div class="main">
  <div class="article">
    <div class="title">3BHK Apartment</div>
  </div>
</div>
```

### Skip Link

Every public page must include:
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-md">
  Skip to main content
</a>
```

---

## 4. Naming Conventions

### Files & Directories

| Type | Convention | Example |
|------|-----------|---------|
| React component | PascalCase `.tsx` | `ListingCard.tsx` |
| Page (Next.js) | lowercase `page.tsx` | `page.tsx` |
| Layout (Next.js) | lowercase `layout.tsx` | `layout.tsx` |
| Hook | camelCase with `use` prefix | `useListings.ts` |
| Service | camelCase `Service` suffix | `listingService.ts` |
| Utility | camelCase `.ts` | `formatNPR.ts` |
| Type file | camelCase `.ts` | `index.ts` |
| Config file | camelCase `.ts` | `brand.ts` |
| JSON data | kebab-case | `listings.json` |
| Test file | same name + `.test.ts(x)` | `ListingCard.test.tsx` |

### Variables & Functions

| Type | Convention | Example |
|------|-----------|---------|
| Component | PascalCase | `const ListingCard` |
| Hook | camelCase with `use` | `const useListings` |
| Handler | `handle` prefix | `handleSubmit`, `handleFilterChange` |
| Boolean state | `is`/`has`/`can` prefix | `isLoading`, `hasError`, `canEdit` |
| Async function | verb + noun | `fetchListings`, `createLead` |
| Constants (global) | SCREAMING_SNAKE | `MAX_IMAGE_SIZE`, `DEFAULT_LOCALE` |
| Types/Interfaces | PascalCase | `Listing`, `InquiryForm` |
| Enum values | PascalCase | `ListingStatus.Active` |

### CSS Classes (Tailwind)

- Use design system tokens: `text-primary-600` not `text-[#0F766E]`
- Arbitrary values only when no token exists and it's documented in `decisions.md`
- Group with `cn()` utility for conditional classes
- Order: layout → spacing → typography → color → decoration → interactive states

---

## 5. Internationalization (i18n)

### No Hardcoded Strings

**All** user-visible strings must come from i18n files.

```typescript
// Bad
<h2>Featured Listings</h2>
<p>Browse properties for sale and rent in Nepal</p>

// Good
const t = useTranslations('home');
<h2>{t('featuredListings.title')}</h2>
<p>{t('featuredListings.subtitle')}</p>
```

### i18n File Structure

```json
// src/i18n/en.json
{
  "nav": { "home": "Home", "listings": "Listings", "about": "About" },
  "home": {
    "hero": { "title": "Find Your Perfect Property in Nepal", "subtitle": "..." },
    "featuredListings": { "title": "Featured Listings", "subtitle": "..." }
  },
  "listing": { "price": "Price", "area": "Area", "inquire": "Inquire Now" },
  "admin": { "dashboard": "Dashboard", "listings": "Manage Listings" },
  "common": { "loading": "Loading...", "error": "Something went wrong" },
  "errors": { "required": "This field is required", "phone": "Enter a valid Nepal phone number" }
}
```

### Nepali Text Rules

- Always wrap Nepali text with `lang="ne"` attribute
- Always apply `font-nepali` class (Noto Sans Devanagari)
- Nepali phone format: `+९७७-९८०१२३४५६७`
- Nepali numbers in prices: use `ne-NP` locale in `formatNPR`

---

## 6. Money Formatting

### All money MUST use `formatNPR` from `src/lib/utils.ts`

```typescript
// src/lib/utils.ts
export function formatNPR(amount: number, options?: { locale?: 'en' | 'ne' }): string {
  const locale = options?.locale === 'ne' ? 'ne-NP' : 'en-IN';
  // Uses 'en-IN' locale which gives South Asian grouping (1,00,000)
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  
  return options?.locale === 'ne' 
    ? `रू ${formatted}`
    : `NPR ${formatted}`;
}

// Usage:
formatNPR(1200000)         // "NPR 12,00,000"
formatNPR(1200000, { locale: 'ne' }) // "रू १२,००,०००"
formatNPR(85000)           // "NPR 85,000"
```

**Never do:**
```typescript
// Bad — bypasses formatting
<span>NPR {listing.price.toLocaleString()}</span>
<span>{`रू ${price}`}</span>
```

---

## 7. Brand Text

### All Brand Text from `src/config/brand.ts`

```typescript
// Good
import { brand } from '@/config/brand';
<a href={`https://wa.me/${brand.whatsapp}`}>{brand.phone}</a>
<span>{brand.name}</span>
<p>{brand.tagline}</p>

// Bad — hardcoded brand data
<a href="https://wa.me/9779801234567">+977-9801234567</a>
<span>Himal Estates</span>
```

The `brand.ts` config is the **single source of truth**. If the phone number changes, it changes in one place and updates everywhere.

---

## 8. Data & Services

- UI components **never** access `localStorage` directly — always through service functions
- Service functions return typed interfaces from `src/types/index.ts`
- All service functions are `async` even in mock mode (prepares for real API)
- No `fetch` calls from components — always from service functions or API route handlers
- Zod validates all data at service boundaries (reading from localStorage, form submission)

---

## 9. Git Commit Convention

Format: `type(scope): description`

| Type | Use |
|------|-----|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Scaffolding, deps, config |
| `style` | CSS/design only changes |
| `refactor` | Code restructuring |
| `docs` | Documentation |
| `test` | Tests |
| `perf` | Performance |

Examples:
```
feat(listing): add listing detail page with gallery
fix(inquiry): validate Nepal phone number format
chore: install framer-motion and configure animations
docs: update phases.md with Phase 2 completion
```

---

## 10. Testing

- All utility functions in `src/lib/` must have unit tests
- All Zod schemas must have positive and negative test cases
- All service functions must have mock tests
- UI components: Playwright e2e for critical flows (inquiry submit, admin login, listing CRUD)
- See `test-plan.md` for complete test cases

---

*Rules are enforced. When in doubt, ask. When you disagree, add a `decisions.md` entry and get consensus — do not silently deviate.*
