# Test Plan & Quality Assurance Matrix

## 1. Overview
This test plan validates all critical user and admin journeys on the Himal Estates platform to guarantee a flawless, production-ready client demonstration.

---

## 2. Test Suites

### Suite A: Public Discovery & Navigation
- **TC-A1: Home Page Loading & Hero Search**
  - Verify Hero search bar supports category selection, location text input, and budget range filter.
  - Submitting search navigates to `/listings` with proper query parameters preserved.
- **TC-A2: Category Grid & Carousels**
  - Verify clicking any category card (Flats, Houses, Land, Shops, Hotels) filters the catalog correctly.
  - Test horizontal drag/scroll and responsive wrapping on mobile (375px) vs desktop (1440px).
- **TC-A3: Multi-Language Switcher**
  - Toggle between English (EN) and Nepali (नेपाली).
  - Verify all UI headers, navigation links, filters, and badge labels switch seamlessly with no layout break.

### Suite B: Listings Catalog & Exploration
- **TC-B1: Filter Engine**
  - Test filters for Category, Purpose (Sale vs Rent), Price range, and Location.
  - Verify active filter pill tags and "Clear all" button reset.
- **TC-B2: View Toggle**
  - Switch between Grid View, List View, and Interactive Map View.
  - Confirm Leaflet pins render accurately with popups showing property snippet, price, and thumbnail.
- **TC-B3: Favorites / Saved Properties**
  - Click heart icon on listing cards.
  - Verify heart toggles filled state and counter increments.
  - Navigate to `/saved` and confirm favorited properties persist across page refreshes via localStorage.

### Suite C: Listing Detail & Interactive Engagement
- **TC-C1: Photo Gallery & Lightbox**
  - Click primary image to launch fullscreen high-res lightbox carousel.
  - Verify keyboard (Esc / Arrow keys) and touch swipe gestures work.
- **TC-C2: Calling Simulator Modal**
  - Click "Call" on desktop: modal displays realistic dialing state ("Connecting with Himal Estates..."), followed by active call timer with mute/hangup controls.
  - Click "Call" on mobile view: triggers direct `tel:+9779801234567` deep link.
- **TC-C3: WhatsApp Integration**
  - Click "WhatsApp": opens pre-filled inquiry text message to `wa.me/9779801234567` citing property ID and title.
- **TC-C4: Live Chat Simulation**
  - Open floating chat widget.
  - Send message (e.g. "Is this flat available for visit?").
  - Verify typing indicator ("Himal Estates agent is typing...") displays, followed by realistic automated response.
- **TC-C5: Lead Inquiry Form**
  - Submit inquiry form with Name, Phone, and Preferred Inspection Time.
  - Confirm success feedback banner appears and lead is immediately dispatched to Admin Leads inbox.

### Suite D: Seller Submission Wizard
- **TC-D1: Multi-Step "List Your Property"**
  - Step 1: Property Type & Intent (Rent / Sale).
  - Step 2: Location, Area (Ropani/Aana/SqFt), Facilities (Water, Parking, Elevator, Road access).
  - Step 3: Photos (drag and drop simulated preview).
  - Step 4: Contact details & expected price.
  - Verify validation prevents empty submission and redirects to confirmation with reference ID.
  - Verify listing enters Admin Approval Queue as "Pending".

### Suite E: Admin Operations & Middleman Tools
- **TC-E1: Authentication**
  - Navigate to `/admin/login`. Verify demo credentials pre-fill option or hint.
  - Sign in with `admin@himalestates.com` / `demo2024`.
- **TC-E2: Dashboard Analytics**
  - Verify KPI cards: Active Listings, New Leads, Month Deals, Total Commission.
  - Verify Recharts line chart (Monthly Lead Flow) and pie chart (Listing Breakdown) render smoothly without hydration errors.
- **TC-E3: Listings Management & Approval Queue**
  - Edit existing listing status (Active, Pending, Sold/Rented, Hidden).
  - Toggle "Featured" or "Hot Deal" badges.
  - Approve pending seller submission and confirm it moves into the public catalog.
- **TC-E4: Lead CRM Pipeline**
  - Filter leads by status (New, Contacted, Negotiating, Deal Done, Lost).
  - Add internal notes to lead.
  - Click quick-action WhatsApp button to chat with client.
- **TC-E5: Commission Tracker**
  - Record new deal with Property, Buyer, Seller, Transaction Value, and Commission % (e.g., 2%).
  - Verify auto-calculation of commission NPR amount and revenue tally updates.
  - Test "Export CSV" downloads formatted `.csv` file.
- **TC-E6: "Share to Social" Generator**
  - Select listing from dropdown.
  - Verify preview canvas generates branded 1080x1350 card with logo, photo, price badge, location, and contact banner.
  - Click "Copy Caption" to clipboard.
  - Click "Download Social Image" to trigger JPEG/PNG download.

### Suite F: Performance & Mobile Responsiveness
- **TC-F1: Viewport Check**
  - 375px (iPhone SE / standard mobile)
  - 768px (iPad portrait / tablet)
  - 1440px (Desktop HD)
- **TC-F2: Touch Targets & Accessibility**
  - All interactive buttons have minimum 44px x 44px touch targets.
  - Contrast ratios meet WCAG AA standards (minimum 4.5:1 for text).
