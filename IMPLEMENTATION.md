# Implementation Notes

## Current State

This is the initial build of the modern Phia's Smulparadijs website. All core features are implemented and working.

## Placeholder Content

The following areas currently use placeholder/hardcoded data that should be replaced via the CMS:

1. **Menu Items** (`src/routes/menu/+page.svelte`)
   - Currently hardcoded example menu items
   - Replace by connecting to CMS content from `content/menu/`

2. **Photos** (`src/routes/fotos/+page.svelte`)
   - Currently using placeholder gradients
   - Add actual food photos via Sveltia CMS to `static/images/uploads/`

3. **Reviews** (`src/routes/+page.svelte`)
   - Example reviews displayed
   - Can be managed via CMS at `content/reviews/`

4. **Video Hero** (`src/routes/+page.svelte`)
   - Placeholder gradient background
   - Add actual video file to `static/videos/` and uncomment video element

## Next Steps for Production

### 1. Content Population
- [ ] Add menu items via CMS (`/admin`)
- [ ] Upload restaurant photos
- [ ] Add daily specials/updates
- [ ] Configure actual reviews

### 2. Media Assets
- [ ] Upload hero video (MP4 format, optimized for web)
- [ ] Add food photography
- [ ] Add logo/branding images

### 3. CMS Backend Configuration
- [ ] Set up Git backend (GitHub/GitLab)
- [ ] Configure authentication
- [ ] Set up media folder permissions

### 4. Integrations
- [ ] Google Maps API integration
- [ ] Google Analytics (optional)
- [ ] Social media embedding (optional)

### 5. Deployment
- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Configure build settings
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Test all functionality in production

## Design System Notes

### Spacing
The spacing system uses rem units with the assumption of 16px base font size:
- 0.5rem = 8px
- 1rem = 16px
- 1.5rem = 24px
- etc.

### Colors
Primary colors are from Tailwind's default palette:
- Orange-600: `#d97706`
- Red-600: `#dc2626`
- Gray-800: `#1f2937`

### Responsive Breakpoints
Using Tailwind's default breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## CMS Content Structure

### Menu Categories
Ensure menu items in CMS use one of these categories:
- `broodjes-halal`
- `overige`
- `gerechten`
- `snacks`
- `dranken`

These match the frontend filtering logic.

## Known Limitations

1. **PDF Menu Download** - Currently a placeholder button. Add actual PDF to `/static/` folder.
2. **Google Maps** - Shows placeholder. Need to add Google Maps embed code or API integration.
3. **Video Auto-play** - Requires actual video file and may need user interaction on mobile.

## Performance Considerations

- Lazy load images in photo gallery
- Optimize video file (< 5MB recommended)
- Use WebP format for images where possible
- Consider adding loading="lazy" to images below the fold

## Accessibility Notes

All interactive elements are keyboard accessible. The site follows WCAG 2.1 Level AA guidelines:
- Proper heading hierarchy
- ARIA labels where needed
- Focus indicators
- Sufficient color contrast
- Reduced motion support
