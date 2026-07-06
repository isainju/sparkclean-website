# SparkClean — Design Brainstorm

## Three Stylistic Approaches

### 1. Precision Black
**Theme:** Automotive luxury meets Swiss precision. High contrast black/white with surgical red accents. Feels like a premium car brand's website.
**Probability:** 0.07

### 2. Urban Night Shift
**Theme:** Dark, cinematic, neon-accented. Inspired by Hong Kong's night skyline. Feels edgy and modern — the car detailing service that works while the city sleeps.
**Probability:** 0.04

### 3. Executive Clean
**Theme:** Crisp, minimal, editorial. White space-dominant with bold black type and sharp red CTAs. Inspired by premium service brands (think Aesop, Dyson). Feels trustworthy and no-nonsense — exactly what a time-poor professional wants.
**Probability:** 0.02

---

## Chosen Approach: **Precision Black**

### Design Movement
Swiss International Typographic Style meets premium automotive branding — disciplined, asymmetric, and unapologetically bold.

### Core Principles
1. **Contrast as a tool** — Pure black (#1a1a1a) and white (#ffffff) with surgical red (#e63946) for action elements only
2. **Type-first hierarchy** — Headlines carry visual weight; body copy is functional and tight
3. **Asymmetric tension** — Avoid centered layouts; use offset grids and diagonal cuts to create energy
4. **Zero decoration** — Every element earns its place; no gratuitous ornament

### Color Philosophy
- **#1a1a1a** — The car at midnight. Authority, premium, dependable.
- **#ffffff** — Clarity. The clean result. Breathing room.
- **#e63946** — Urgency and action. Red is reserved exclusively for CTAs and critical highlights — never decorative.
- **#f8f9fa** — Light grey for alternating sections, preventing visual fatigue without breaking the monochrome palette.

### Layout Paradigm
Asymmetric split-column layouts with deliberate off-center anchoring. Hero section uses a full-bleed image with text anchored to the left third. Service cards use a staggered grid. Sections alternate between dark and light backgrounds to create rhythm.

### Signature Elements
1. **Red slash dividers** — Thin diagonal red lines as section separators, referencing speed and precision
2. **Oversized numerals** — Step numbers and stats rendered in massive, ghosted type behind content
3. **Edge-to-edge image bleeds** — Images break out of containers to create depth

### Interaction Philosophy
Every interaction confirms the brand's efficiency. Hover states are instant (no slow fades). CTAs pulse subtly to draw attention. Scroll-triggered reveals are directional (slide from left for text, fade for images).

### Animation
- Nav: 0ms background transition on scroll (instant opacity change to black/90)
- Scroll reveals: `translateY(24px) → 0` with `opacity 0 → 1`, 400ms ease-out, staggered 80ms per item
- CTA buttons: `scale(0.97)` on active, 160ms ease-out
- Before/after slider: smooth drag with CSS `clip-path` transition
- Section entrances: elements slide in from the left (text) or fade up (images)

### Typography System
- **Display/Headlines:** `Barlow Condensed` — Bold, condensed, automotive. Used for H1, H2, section labels.
- **Body/UI:** `DM Sans` — Clean, modern, readable. Used for paragraphs, nav, pricing.
- **Accent numbers:** `Barlow Condensed` in oversized weight for stats and step numbers.
- Hierarchy: 72px display → 48px H2 → 32px H3 → 16px body → 13px caption

### Brand Essence
**SparkClean: The detailing service that respects your time.** For Hong Kong professionals who refuse to compromise on their car's appearance. Different because we come to you.

Personality: **Efficient. Precise. Trustworthy.**

### Brand Voice
Headlines are direct and benefit-led. No fluff. CTAs are action-oriented with price transparency.
- Example headline: "Your Car, Detailed While You Work"
- Example CTA: "Book Now — HKD 380"
- Banned phrases: "Welcome to SparkClean", "Get started today", "We are passionate about..."

### Wordmark & Logo
A bold angular "S" formed from two overlapping diagonal slashes — referencing speed and the letter S simultaneously. Rendered in white on black, or black on white. The slash motif echoes the red accent dividers throughout the site.

### Signature Brand Color
**#e63946** — SparkClean Red. Used only for CTAs, highlights, and the "Best Value" badge. Ownable because of its restraint.
