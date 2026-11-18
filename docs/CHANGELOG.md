# Changelog

All notable changes to the Himal Estates demo project will be documented in this file.

---

## [1.0.0] - 2024-11-18 (Phase 1 & Phase 2 Kickoff)

### Added
- **Core Architecture & Scaffolding**:
  - Next.js 16 App Router with TypeScript strict mode and Turbopack support.
  - Tailored Tailwind CSS system featuring custom Himalayan palette (`primary` #0F766E, `accent` #C2410C, `background` #F8FAFC, `text` #0F172A).
  - Unstyled shadcn/ui foundation customized with soft elevation and radius tokens.
- **Brand & Identity**:
  - Centralized single-source brand config at `src/config/brand.ts`.
  - SVG abstract peak monogram & wordmark logo (`Logo.tsx`).
- **Internationalization (i18n)**:
  - Full English (`en.json`) and Nepali (`ne.json`) translation dictionaries with natural Nepali real-estate vocabulary.
  - Custom `formatNPR` and `formatNPRShort` utility supporting South Asian numerical groupings (Lakhs & Crores).
- **Documentation Suite**:
  - `README.md`, `PRD.md`, `design-analysis.md`, `design-system.md`, `implementation-plan.md`, `phases.md`, `rules.md`, `data-model.md`, `decisions.md`, `test-plan.md`, `demo-script.md`, and `CHANGELOG.md`.
- **Quality Verification**:
  - TypeScript compilation and Next.js static build verified (0 errors).
