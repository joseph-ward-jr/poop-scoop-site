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
- **Blog**: Professional insights and tips with newsletter integration
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
│   ├── BlogPage.tsx    # Blog listing page
│   ├── BlogPostPage.tsx # Individual blog posts
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
2. **Testing**:
   - Run `npm run test:jobber` to verify API connection
   - Visit `http://localhost:3000/test/jobber` for interactive OAuth2 testing
   - Use the contact form at `http://localhost:3000/contact` for production testing
3. **Documentation**: See `docs/JOBBER_INTEGRATION.md` for detailed setup instructions

#### OAuth2 Testing Workflow

For comprehensive OAuth2 integration testing:

1. **Start Development Server**: `npm run dev`
2. **Access Test Page**: Navigate to `http://localhost:3000/test/jobber`
3. **Verify Connection**: Check that the connection status shows "Connected to Jobber API"
4. **Test Form Submission**: Use the pre-filled form or enter your own test data
5. **Verify in Jobber**: Check your Jobber account to confirm client creation
6. **Monitor Results**: Review the real-time test console for detailed feedback

The integration includes:
- Automatic client creation in Jobber
- Graceful error handling and fallbacks
- Loading states and user feedback
- Comprehensive test coverage

### Newsletter API Endpoint

The newsletter system uses a dedicated serverless function (`/api/jobber-newsletter`) that:

- **Automatic Token Refresh**: Uses the same refresh token flow as contact forms
- **Error Handling**: Graceful handling of expired tokens and API failures
- **Source Tracking**: Records where each newsletter subscription originated
- **Interest Categorization**: Tracks subscriber interests for targeted campaigns
- **Notes Integration**: Adds detailed notes to Jobber client records

**Environment Variables Required:**
- `JOBBER_CLIENT_ID`: Your Jobber app client ID
- `JOBBER_CLIENT_SECRET`: Your Jobber app client secret
- `JOBBER_REFRESH_TOKEN`: Long-lived refresh token for automatic token renewal

## Blog System & Newsletter Integration

The website features a comprehensive blog system with integrated newsletter subscription functionality:

### Blog Features

- **Modern Blog Interface**: Clean, responsive design with tag filtering
- **Individual Post Pages**: Dynamic routing for detailed blog content
- **SEO Optimization**: Proper meta tags and structured content
- **Featured Content**: Highlighted articles with professional insights

### Newsletter Integration

- **Jobber CRM Integration**: Newsletter subscribers automatically added to Jobber
- **Smart Prompts**: Context-aware newsletter signup prompts on blog posts
- **Interest Targeting**: Subscribers can select specific areas of interest
- **Professional Content**: Weekly tips on home cleaning, lawn maintenance, and eco-friendly solutions

### Current Content

- **Featured Article**: "Why Your Backyard is Worse for Being Barefoot Than Your Bathroom"
  - Professional insights on outdoor contamination
  - Wysiwash eco-friendly disinfectant information
  - Health and safety recommendations
  - Expert cleaning solutions

### Technical Implementation

- **TypeScript Types**: Comprehensive type definitions for blog and newsletter data
- **React Components**: Reusable BlogCard, NewsletterModal, and blog page components
- **Serverless API**: Newsletter subscriptions use serverless functions with automatic token refresh
- **Jobber Integration**: Newsletter subscriptions create Jobber clients with proper categorization
- **Token Management**: Automatic refresh token flow prevents token expiration issues
- **Test Coverage**: Full test suite for blog functionality and newsletter integration

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