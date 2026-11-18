# Architecture & Design Decisions Log

This document logs all critical product, architectural, and design decisions made for Himal Estates, along with the one-line rationale for each decision.

---

| Date | Category | Decision | One-Line Reason |
|------|----------|----------|-----------------|
| 2024-11-17 | Tech Stack | Next.js 16 (App Router) + TypeScript + Tailwind CSS | Provides optimal SSR performance, strict type safety, and rapid responsive component styling. |
| 2024-11-17 | Design System | Applied ui-ux-pro-max guidelines (Glassmorphism + Himalayan Palette) | Achieves a high-trust, modern aesthetic with deep teal (#0F766E), terracotta accent (#C2410C), and soft elevation. |
| 2024-11-17 | Typography | Plus Jakarta Sans (Headings) + Inter (Body) + Noto Sans Devanagari (Nepali) | Superior legibility on screens across both Latin script and authentic Devanagari glyphs. |
| 2024-11-17 | Brand Identity | Abstract geometric Himalayan peak monogram logo instead of clip-art Everest/houses | Signals an established, sophisticated real-estate tech firm rather than a dated local classifieds board. |
| 2024-11-17 | Configuration | Single brand config file at `src/config/brand.ts` | Allows the middleman client to change agency name, phone, WhatsApp, and social URLs across the entire app in seconds. |
| 2024-11-17 | Data Persistence | TypeScript mock layer with localStorage persistence + initial JSON seed | Gives the client full CRUD realism (saving listings, adding leads, updating commissions) with zero backend setup friction. |
| 2024-11-17 | Maps | Leaflet with OpenStreetMap loaded via dynamic client-side import | Free, reliable, privacy-friendly map rendering with zero API key dependencies and no SSR hydration errors. |
| 2024-11-17 | Locale & Currency | Custom `formatNPR` helper with South Asian numbering (Lakhs & Crores) | Tailored to authentic Nepali property market communication rather than Western millions. |
| 2024-11-17 | Mobile UX | Sticky contact bar with WhatsApp deep link, interactive Call simulator, and Inquire drawer | Matches the dominant Nepali user behavior of WhatsApp & direct phone calls for deal negotiation. |
| 2024-11-17 | Admin Usability | Full mobile-first responsive layout for `/admin` | Empowers the middleman to manage listings, track commissions, and generate social posts directly from his phone on the go. |
| 2024-11-17 | Social Media Bridge | Built-in "Share to Social" graphic & caption generator | Provides the client an instant workflow bridge from web listing to branded TikTok & Facebook promotional assets. |
| 2024-11-17 | Image Strategy | Local high-res royalty-free mock image assets with explicit credit attribution in `CREDITS.md` | Prevents broken external hotlinks during client presentation and guarantees high-speed offline reliability. |
