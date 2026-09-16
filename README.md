# Marvin & Meri Cris — Wedding Invitation Website

## 1. Project Overview

Build a modern, elegant, mobile-first wedding invitation website for **Marvin and Meri Cris**.

This is a digital wedding invitation intended to be shared through messaging apps and social media. The website should feel like a premium wedding invitation rather than a generic web template.

The final website will be hosted on **Vercel**.

### Core Concept

> **The Beginning of Forever**

The design should communicate:

- Romance
- Elegance
- Intimacy
- Celebration
- Modern luxury
- Timelessness

Avoid making the website look overly corporate, overly playful, or like a generic wedding template.

---

# 2. Wedding Information

Use the following information exactly as provided.

### Couple

**Groom:** Marvin
**Bride:** Meri Cris

### Wedding Date

**October 26, 2026**

Display formats may include:

- October 26, 2026
- 26 October 2026
- 26 · 10 · 2026

### Venue

**San Antonio de Padua Parish Church**

**San Francisco, Bulan, Sorsogon**

### Wedding Quote

> "The beginning of forever"

Do not replace, modify, or paraphrase the wedding quote unless explicitly instructed.

---

# 3. Recommended Technology

Use a modern Vercel-friendly stack.

### Required

- Next.js
- TypeScript
- Tailwind CSS
- Vercel

### Recommended

- Framer Motion for animations
- Lucide React for icons
- Google Fonts or another appropriate web font provider

### Optional Future Integration

The architecture should allow future integration with:

- Google Sheets RSVP responses
- Google Maps
- Photo gallery storage
- Guest management
- Analytics

## Google Sheets RSVP Setup

The RSVP form sends submissions to a Google Apps Script web app. Add its deployed URL to `.env.local` and your Vercel project:

```text
NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/your-deployment-id/exec
```

Copy `google-apps-script/Code.gs` into the Apps Script project attached to your Google Sheet, deploy it as a web app accessible to anyone, and use the deployment URL above.

---

# 4. Design Direction

## Overall Style

Use:

**Modern Romantic Editorial Luxury**

The website should feel like a professionally designed wedding invitation.

Think:

- Editorial wedding magazine
- Luxury printed invitation
- Elegant typography
- Burgundy stationery
- Minimal black accents
- Ivory paper
- Fine lines
- Large typography
- Subtle transitions

Do NOT use:

- Generic wedding template aesthetics
- Excessive roses
- Excessive hearts
- Cartoon wedding graphics
- Excessive gold
- Glitter effects
- Neon colors
- Excessive gradients
- Heavy glassmorphism
- Generic corporate dashboard UI

---

# 5. Color Palette

## Primary

Burgundy should be the dominant brand color.

Suggested:

```text
Burgundy:
#6E1F2A
```

Alternative darker burgundy:

```text
#54141F
```

## Secondary

Warm ivory / white:

```text
#FAF8F5
```

Pure white:

```text
#FFFFFF
```

Black:

```text
#111111
```

Optional muted neutral:

```text
#D8D0CA
```

### Color Usage

Burgundy:

- Hero backgrounds
- Buttons
- Accent sections
- Decorative lines
- Important headings

Ivory:

- Main page background
- Content sections
- Invitation cards

Black:

- Body text
- Secondary typography
- Small UI elements

Do not make black visually dominant.

The visual hierarchy should remain:

**Burgundy → Ivory/White → Black**

---

# 6. Typography

Use a sophisticated serif typeface for the couple's names and major romantic headings.

Recommended direction:

### Serif

Examples:

- Cormorant Garamond
- Playfair Display
- DM Serif Display
- Bodoni-style alternatives

### Sans Serif

Use a clean sans-serif for supporting information.

Examples:

- Inter
- Manrope
- Montserrat
- DM Sans

### Typography Hierarchy

Couple names should be visually dominant.

Example:

```text
MARVIN
    &
MERI CRIS
```

or:

```text
Marvin
&
Meri Cris
```

The typography should feel elegant rather than decorative.

Avoid excessive script fonts.

---

# 7. Hero / Opening Screen

The first screen is extremely important.

It should immediately communicate that this is a wedding invitation.

Recommended composition:

```text
THE WEDDING OF

MARVIN
&
MERI CRIS

"The beginning of forever"

26 · 10 · 2026

[ OPEN INVITATION ]
```

The hero should occupy approximately the full viewport.

Use generous whitespace.

Possible visual elements:

- Fine border
- Minimal floral line art
- Subtle grain texture
- Burgundy background
- Ivory typography
- Small decorative divider

Avoid overcrowding the hero.

---

# 8. Invitation Opening Interaction

The website should have an elegant opening interaction.

Initial state:

```text
THE WEDDING OF

MARVIN & MERI CRIS

THE BEGINNING OF FOREVER

[ OPEN INVITATION ]
```

When the user clicks **OPEN INVITATION**:

1. Play a subtle transition.
2. Reveal the main invitation.
3. Smoothly transition into the main page.
4. Do not use excessive animations.
5. The animation should remain fast enough for mobile users.

Recommended animation style:

- Fade
- Slide
- Scale
- Mask reveal
- Gentle parallax

Avoid:

- Bouncing
- Excessive spinning
- Flashing
- Long loading animations

---

# 9. Main Website Sections

The initial website should contain the following sections.

## Section 01 — Invitation

Introduce the wedding formally.

Example structure:

```text
TOGETHER WITH THEIR FAMILIES

MARVIN
&
MERI CRIS

joyfully invite you to celebrate
their wedding day

October 26, 2026
```

Do not invent parents' names or additional family information.

---

# 10. Section 02 — Wedding Day

Display the important event information.

```text
THE WEDDING DAY

October 26, 2026

San Antonio de Padua Parish Church
San Francisco, Bulan, Sorsogon
```

Provide a clear location button.

Example:

```text
[ VIEW LOCATION ]
```

The button may later link to Google Maps.

Do not invent coordinates or a Google Maps URL.

---

# 11. Section 03 — Countdown

Create a live countdown to:

```text
October 26, 2026
```

Display:

```text
DAYS
HOURS
MINUTES
SECONDS
```

The countdown must update automatically.

When the wedding date has passed, do not display negative numbers.

Instead, replace the countdown with a suitable message such as:

```text
THE BEGINNING OF FOREVER
```

---

# 12. Section 04 — Our Story

Create a placeholder section for the couple's story.

Example:

```text
OUR STORY

Every love story has a beginning.

[ STORY CONTENT ]
```

Do not invent their relationship history.

Until actual information is provided, use tasteful placeholder content or structure that is clearly intended to be replaced.

---

# 13. Section 05 — Gallery

Create a wedding photo gallery structure.

Initially support placeholder images.

The gallery should support:

- Portrait photos
- Landscape photos
- Couple photos
- Engagement photos
- Wedding photos

Use a refined editorial grid.

Avoid generic masonry layouts if they make the site feel cluttered.

Possible layout:

```text
┌──────────────┬───────┐
│              │       │
│     PHOTO    │ PHOTO │
│              │       │
├───────┬──────┴───────┤
│ PHOTO │     PHOTO     │
└───────┴───────────────┘
```

Images should have subtle hover effects on desktop.

On mobile, prioritize performance.

---

# 14. Section 06 — Entourage

Create a structure for the wedding entourage.

Categories may include:

```text
Parents
Principal Sponsors
Best Man
Maid of Honor
Groomsmen
Bridesmaids
Flower Girls
Ring Bearer
Bible Bearer
Coin Bearer
```

Do not invent names.

Use an easily editable data structure so names can be added later.

Example:

```ts
const entourage = { parents: [], principalSponsors: [], bestMan: [], maidOfHonor: [], groomsmen: [], bridesmaids: [] };
```

---

# 15. Section 07 — Dress Code

Create a visually elegant dress-code section.

The actual dress code has not yet been provided.

Therefore:

- Do not invent a dress code.
- Create a placeholder.
- Make the content easily editable.

Example:

```text
DRESS CODE

[Details to be provided]
```

---

# 16. Section 08 — RSVP

Create an RSVP section.

Initial structure:

```text
RSVP

We would be honored
to celebrate with you.

[ RSVP NOW ]
```

The initial version may use a placeholder button.

Future RSVP implementation may include:

- Guest name
- Attendance
- Number of guests
- Meal preference
- Message

Do not implement a database unless explicitly requested.

---

# 17. Section 09 — Closing

End the website with the wedding quote.

Large typography:

> "The beginning of forever"

Then:

```text
MARVIN & MERI CRIS

October 26, 2026
```

The closing section should feel calm and emotional.

---

# 18. Navigation

The website should not use a traditional corporate navbar.

Prefer an elegant minimal navigation.

Possible options:

```text
HOME
STORY
DETAILS
GALLERY
RSVP
```

On mobile:

- Use a minimal menu button
- Keep navigation unobtrusive
- Ensure easy access to RSVP

The navigation should not cover important content.

---

# 19. Responsive Design

Mobile-first design is mandatory.

Primary target:

```text
Mobile phones
```

Secondary:

```text
Tablet
Desktop
```

The website must work correctly at:

- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1440px+

Pay particular attention to:

- Couple names
- Hero typography
- Countdown
- Images
- Buttons
- Navigation
- RSVP form

No horizontal scrolling should occur.

---

# 20. Animations

Animations should be subtle and premium.

Recommended:

- Fade-in
- Text reveal
- Image reveal
- Scroll-triggered sections
- Gentle parallax
- Button hover
- Page transition

Animation duration should generally remain around:

```text
300ms – 1000ms
```

Do not animate everything.

Use animation to establish atmosphere, not to demonstrate technical ability.

Respect:

```text
prefers-reduced-motion
```

Users who disable animations should still receive the complete experience.

---

# 21. Performance

This website will likely be accessed through mobile devices.

Prioritize:

- Fast initial load
- Optimized images
- Lazy loading
- Responsive images
- Minimal JavaScript
- Proper font loading
- No unnecessary dependencies

Use Next.js image optimization where appropriate.

Avoid loading large images before they are needed.

---

# 22. SEO / Social Sharing

Configure metadata for the wedding.

Title:

```text
Marvin & Meri Cris — The Beginning of Forever
```

Description:

```text
Join Marvin and Meri Cris as they begin their forever together on October 26, 2026.
```

Create Open Graph metadata.

Social preview should show:

```text
Marvin & Meri Cris
The Beginning of Forever
October 26, 2026
```

Use a dedicated wedding image once provided.

Do not invent the couple's photograph.

---

# 23. Accessibility

Follow basic accessibility practices.

Requirements:

- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Sufficient color contrast
- Reduced-motion support

Do not rely exclusively on color to communicate information.

---

# 24. Code Architecture

Keep the project maintainable.

Suggested structure:

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Hero.tsx
│   ├── Invitation.tsx
│   ├── WeddingDetails.tsx
│   ├── Countdown.tsx
│   ├── Story.tsx
│   ├── Gallery.tsx
│   ├── Entourage.tsx
│   ├── DressCode.tsx
│   ├── RSVP.tsx
│   └── Footer.tsx
│
├── data/
│   └── wedding.ts
│
└── public/
    ├── images/
    └── icons/
```

The exact architecture may be adjusted when appropriate.

---

# 25. Centralized Wedding Data

Wedding information should be centralized instead of scattered throughout components.

Example:

```ts
export const wedding = {
	groom: 'Marvin',
	bride: 'Meri Cris',

	date: '2026-10-26',

	displayDate: 'October 26, 2026',

	venue: { name: 'San Antonio de Padua Parish Church', location: 'San Francisco, Bulan, Sorsogon' },

	quote: 'The beginning of forever',
};
```

Components should consume this data.

Do not hard-code the same wedding information repeatedly.

---

# 26. Content Rules

Never invent personal information.

Do not fabricate:

- Parents
- Entourage
- Relationship history
- Dress code
- Reception venue
- Ceremony time
- Reception time
- Contact numbers
- RSVP deadline
- Wedding hashtag
- Couple photographs

If information is unavailable, create an editable placeholder.

---

# 27. UX Principles

The website should feel:

**Elegant → Personal → Emotional → Simple**

It should NOT feel:

**Busy → Generic → Template-like → Over-animated**

Every element should have a purpose.

Whitespace is important.

Typography is part of the design.

Photography should be treated as editorial content rather than decoration.

---

# 28. Initial MVP

The first implementation should prioritize:

1. Hero
2. Invitation opening interaction
3. Wedding details
4. Countdown
5. Story placeholder
6. Gallery placeholder
7. Entourage placeholder
8. Dress-code placeholder
9. RSVP placeholder
10. Closing section
11. Responsive design
12. SEO/social metadata

Do not spend time implementing backend systems during the initial MVP.

---

# 29. Future Features

Potential future enhancements:

- Supabase RSVP system
- Guest-specific RSVP links
- QR code invitation
- Google Maps integration
- Wedding playlist
- Background music toggle
- Guestbook
- Digital wedding wishes
- Photo upload
- Private guest information
- Admin RSVP dashboard
- RSVP export
- Attendance tracking
- Wedding hashtag feed
- Custom domain
- Analytics

These should be implemented only when requested.

---

# 30. Development Rules for the AI Agent

When implementing this project:

1. Follow the provided wedding information exactly.
2. Do not invent missing personal information.
3. Keep the design premium and editorial.
4. Burgundy must remain the dominant color.
5. White/ivory should provide visual breathing room.
6. Black should be used primarily for typography and subtle accents.
7. Prioritize mobile UX.
8. Avoid excessive animation.
9. Keep components reusable.
10. Centralize wedding data.
11. Keep the site fast.
12. Do not introduce unnecessary dependencies.
13. Do not create backend functionality unless requested.
14. Do not replace provided content with generic AI-generated wedding copy.
15. Use placeholders when information is still unavailable.
16. Make future RSVP/database integration easy.
17. Ensure the project can deploy cleanly to Vercel.
18. Test responsive layouts before considering the implementation complete.
19. Maintain a polished visual hierarchy.
20. The final result should look intentionally designed, not AI-generated.

---

# 31. Definition of Done

The MVP is considered complete when:

- The project runs locally without errors.
- The project builds successfully.
- The project deploys successfully to Vercel.
- The hero communicates the wedding immediately.
- The opening invitation interaction works.
- Wedding information is accurate.
- Countdown works correctly.
- All sections are responsive.
- No horizontal scrolling exists.
- Images are optimized.
- Metadata is configured.
- Social sharing metadata is prepared.
- Accessibility basics are implemented.
- No personal information has been fabricated.
- The overall visual result matches the Burgundy / White / Black luxury wedding direction.

---

# 32. Final Creative Direction

The final website should feel like:

> **A beautifully designed physical wedding invitation brought to life on the web.**

Not a business website.

Not a dashboard.

Not a generic template.

Not an over-engineered application.

It should feel intimate, elegant, romantic, and timeless.

The central visual identity is:

**BURGUNDY + IVORY + BLACK**

with the emotional centerpiece:

> **"The beginning of forever."**

And the names:

# Marvin & Meri Cris

**October 26, 2026**
