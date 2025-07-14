# Location Videos

This directory contains hero videos for each location page. Each video should be optimized for web and represent the local area.

**Note: Location pages now use MP4 videos instead of images, similar to the homepage hero video.**

## Required Videos

### Video Specifications
- **Format**: MP4 (H.264 codec recommended)
- **Dimensions**: Square aspect ratio (1080x1080px recommended)
- **Duration**: 10-30 seconds (short loops work best)
- **File Size**: Under 5MB for optimal loading
- **Quality**: High quality, professional appearance
- **Audio**: No audio needed (videos play muted)

### Required Files (moved to `/public/videos/locations/`)

1. **canton-hero.mp4**
   - Location: Canton, GA
   - Suggested content: Canton neighborhood, homes, or local landmarks

2. **ballground-hero.mp4**
   - Location: Ballground, GA
   - Suggested content: Rural properties, countryside, or Ballground scenery

3. **holly-springs-hero.mp4**
   - Location: Holly Springs, GA
   - Suggested content: Holly Springs neighborhoods, premium homes, or local area

4. **milton-hero.mp4**
   - Location: Milton, GA
   - Suggested content: Luxury homes, equestrian properties, or Milton landscapes

5. **woodstock-hero.mp4**
   - Location: Woodstock, GA
   - Suggested content: Woodstock neighborhoods, community areas, or local scenery

## Video Features

- **Auto-play**: Videos start automatically when page loads
- **Loop**: Videos loop continuously
- **Muted**: Videos play without sound
- **Mobile Optimized**: `playsInline` attribute for iOS compatibility
- **Responsive**: Videos scale properly on all devices

## Fallback Behavior

If a video fails to load, the page will automatically display a fallback with:
- Emoji icon representing the location
- Location name
- Service description

## Implementation Notes

- Videos use `object-cover` CSS class for proper aspect ratio
- Error handling is built-in for missing videos
- Videos should be optimized for web to ensure fast loading
- Consider using video compression tools to reduce file size while maintaining quality
- Videos play similar to the homepage hero video implementation
