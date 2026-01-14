# Phia's Smulparadijs - Modern Website

A modern, conversion-focused restaurant website built with SvelteKit, Svelte 5 (runes mode), Tailwind CSS, and Sveltia CMS.

## Features

- 🎨 Modern, "flitsend" design with video hero section
- 📱 Mobile-first responsive design
- ⚡ Built with Svelte 5 (runes mode) and SvelteKit
- 🎨 Styled with Tailwind CSS v4
- 📝 Content management with Sveltia CMS
- ♿ Accessible (WCAG compliant)
- 🔍 SEO optimized with LocalBusiness schema
- 🚀 Performance optimized

## Pages

- **Home** - Video hero, quick actions, menu preview, reviews, location
- **Menu** - Searchable menu with HALAL filters
- **Maaltijd of Soep** - Daily specials and updates hub
- **Foto's** - Image gallery with lightbox
- **Wie zijn wij** - About page with company story
- **Contact** - Contact information with map

## Tech Stack

- **Framework**: SvelteKit 2.x
- **UI Library**: Svelte 5 (runes mode)
- **Styling**: Tailwind CSS v4
- **CMS**: Sveltia CMS
- **TypeScript**: For type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   └── components/
│       ├── Header.svelte
│       ├── Footer.svelte
│       └── SEO.svelte
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte (Homepage)
│   ├── menu/+page.svelte
│   ├── maaltijd-of-soep/+page.svelte
│   ├── fotos/+page.svelte
│   ├── wie-zijn-wij/+page.svelte
│   └── contact/+page.svelte
└── static/
    ├── videos/
    └── images/
```

## CMS Setup

Sveltia CMS is configured for content management. To access the CMS:

1. Navigate to `/admin` (after setting up Sveltia CMS)
2. Authenticate with your Git provider
3. Start managing content

## Design System

- **Spacing**: 8px base unit (8, 16, 24, 32, 48, 64, 96)
- **Colors**: 
  - Primary: Orange-600 (#d97706)
  - Accent: Red-600 (#dc2626)
  - Dark: Gray-800 (#1f2937)
- **Max width**: 1200-1320px (7xl)

## Contact Information

- **Phone**: 070 785 1 813
- **Catering**: 06 23 74 74 66
- **Address**: Theresiastraat 279, 2593 AS Den Haag
- **KvK**: 70933200

## License

Private - All rights reserved © Phia's Smulparadijs
