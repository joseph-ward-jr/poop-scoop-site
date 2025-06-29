# Poop Scoop Pro - Professional Pet Waste Removal Website

A modern, responsive website for a professional pet waste removal service built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with mobile-first responsive layout
- **Fast Performance**: Built with Vite for lightning-fast development and optimized builds
- **SEO Friendly**: Semantic HTML structure with proper meta tags
- **Conversion Optimized**: Strategic CTAs and lead capture forms
- **Mobile Responsive**: Looks great on all devices from phones to desktops

## Pages

- **Homepage**: Hero section with benefits and integrated contact form
- **About Us**: Company story and team information
- **Testimonials**: Customer reviews with interactive carousel
- **Pricing**: Detailed pricing tables with FAQ section
- **Contact**: Comprehensive contact form with validation

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Emoji-based icons for simplicity and performance

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joseph-ward-jr/poop-scoop-site.git
cd poop-scoop-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
# or if using Augment
augment dev
```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Page layout wrapper
│   ├── ContactForm.tsx # Unified contact form component
│   └── __tests__/      # Component tests
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── AboutPage.tsx   # About us page
│   ├── TestimonialsPage.tsx # Customer testimonials
│   ├── PricingPage.tsx # Pricing and FAQ
│   └── ContactPage.tsx # Contact form
├── App.tsx             # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Customization

### Colors
The color palette can be customized in `tailwind.config.js`. The current theme uses:
- **Primary**: Green tones for nature/eco-friendly feel
- **Secondary**: Warm yellows for friendliness
- **Brown**: Earth tones for grounding

### Content
All content is easily editable within the respective page components. Key areas to customize:
- Company name and contact information
- Pricing plans and rates
- Testimonials and reviews
- Service areas and descriptions

### Styling
The site uses Tailwind CSS with custom utility classes defined in `src/index.css`:
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.section-padding` - Consistent section spacing
- `.container-max` - Maximum width container

## Form Handling & Jobber Integration

The contact forms use a unified `ContactForm` component with the following fields:
- Name (required)
- Email address (required)
- Phone number (required)
- Home or commercial address (required)
- Contact preference: Call, Email, or Text (required)
- Additional information (optional)

### Jobber API Integration

The forms are integrated with Jobber API for automatic client creation:

1. **Setup**: Copy `.env.example` to `.env.local` and add your Jobber access token
2. **Testing**: Run `npm run test:jobber` to verify API connection
3. **Documentation**: See `docs/JOBBER_INTEGRATION.md` for detailed setup instructions

The integration includes:
- Automatic client creation in Jobber
- Graceful error handling and fallbacks
- Loading states and user feedback
- Comprehensive test coverage

## Testing

The project includes comprehensive tests for the contact form component:

```bash
npm test
```

Tests cover form validation, submission handling, and different variants (homepage vs contact page).

## Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions to deploy
- **Traditional Hosting**: Upload `dist` folder contents via FTP

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact the development team or create an issue in the repository.