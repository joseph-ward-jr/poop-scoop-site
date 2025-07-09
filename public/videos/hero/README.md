# Hero Video Setup

## Video File Location
Place your MP4 file here as: `sanitization-demo.mp4`

## Video Requirements
- **Format**: MP4 (H.264 codec recommended for best browser compatibility)
- **Aspect Ratio**: Square (1:1) or close to square for best fit
- **Duration**: 10-30 seconds (will loop automatically)
- **Size**: Keep under 10MB for fast loading
- **Resolution**: 800x800px or 1080x1080px recommended

## Current Setup
The video element in the homepage header is configured with:
- `autoPlay`: Starts automatically when page loads
- `loop`: Repeats continuously
- `muted`: Required for autoplay in most browsers
- `playsInline`: Prevents fullscreen on mobile
- `poster`: Shows the existing garden image while video loads
- Fallback to existing image if video fails to load

## To Replace
1. Add your MP4 file as `public/videos/hero/sanitization-demo.mp4`
2. The video will automatically appear in the homepage header
3. Remove this README.md file when done

## Browser Support
- Modern browsers: Full video support
- Older browsers: Falls back to existing image
- Mobile: Optimized for mobile playback
