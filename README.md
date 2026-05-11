# Agriculture Smart Assistant

A modern, AI-powered agriculture platform built with React, TypeScript, Vite, and Tailwind CSS. This comprehensive web application helps farmers with crop disease detection, weather forecasting, expert consultation, Mandi price tracking, and farming reminders.

![Agriculture Smart Assistant](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop)

## Features

### AI-Powered Disease Detection
- Upload crop images for instant AI analysis
- Receive detailed disease diagnosis with confidence scores
- Get treatment recommendations, prevention tips, and symptom information
- Animated loading states for better UX

### Weather Forecasting
- Real-time weather data for any location
- Current conditions, hourly forecasts, and 7-day predictions
- Detailed metrics: temperature, humidity, wind speed, UV index, rainfall
- Beautiful animated weather icons

### Expert Consultation
- Browse agricultural experts by specialization
- View expert profiles with ratings, experience, and consultation fees
- Book appointments with calendar integration
- Real-time availability status

### Mandi Rates (Market Prices)
- Live crop prices from markets across India
- Min/Max/Average price tracking
- Price trend indicators (up/down/stable)
- Filter by crop and location

### Farming Reminders
- Create custom reminders for farming activities
- Support for multiple reminder types: watering, fertilizer, pesticide, harvesting, irrigation
- Priority levels (low, medium, high)
- Mark reminders as complete/incomplete
- Edit and delete functionality

### Admin Panel
- Comprehensive admin dashboard with analytics
- User management with search and filter
- Charts for user growth and activity
- Role-based access control

### Additional Features
- **Authentication**: JWT-based auth with login/register
- **Dark/Light Mode**: Theme toggle support
- **Responsive Design**: Mobile-first, works on all devices
- **Animations**: Smooth transitions using Framer Motion
- **Toast Notifications**: User feedback with React Hot Toast
- **Glassmorphism UI**: Modern, premium aesthetics

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Context API + Custom Hooks
- **HTTP Client**: Axios (mock implementation)
- **Notifications**: React Hot Toast

## Project Structure

```
Agriculture Smart Assistant/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DashboardNavbar.tsx
│   │   ├── AdminNavbar.tsx
│   │   └── AdminSidebar.tsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── layouts/            # Page layouts
│   │   ├── MainLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DiseaseDetectionPage.tsx
│   │   ├── WeatherPage.tsx
│   │   ├── ExpertsPage.tsx
│   │   ├── MandiRatesPage.tsx
│   │   ├── RemindersPage.tsx
│   │   ├── AdminLoginPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   └── AdminUsersPage.tsx
│   ├── routes/             # Routing configuration
│   │   └── index.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Agriculture Smart Assistant"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

**Farmer Login:**
- Email: ramesh@example.com
- Password: password

**Admin Login:**
- Email: admin@example.com
- Password: admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design System

### Colors
- Primary: Emerald (#10b981)
- Secondary: Lime (#84cc16)
- Accent: Blue, Amber, Purple, Red
- Background: White (light) / Gray-900 (dark)

### Typography
- Font: Inter (Google Fonts)
- Headings: Display font weights
- Body: Regular weight for readability

### Components
- **Cards**: White/dark bg with subtle shadows and rounded corners
- **Buttons**: Primary (gradient), Secondary (outline), Ghost variants
- **Inputs**: Rounded with focus rings
- **Tables**: Clean with hover states

## API Integration

The application uses mock API services that simulate backend responses. To integrate with a real backend:

1. Update `src/services/api.ts` with actual API endpoints
2. Configure authentication token handling
3. Update environment variables

## Features in Detail

### Routing
- `/` - Landing Page
- `/login` - Farmer Login
- `/register` - Farmer Registration
- `/dashboard` - Farmer Dashboard
- `/disease-detection` - AI Disease Detection
- `/weather` - Weather Forecast
- `/experts` - Expert Consultation
- `/mandi-rates` - Market Prices
- `/reminders` - Farming Reminders
- `/admin/login` - Admin Login
- `/admin/dashboard` - Admin Dashboard
- `/admin/users` - User Management

### State Management
- **AuthContext**: User authentication state
- **ThemeContext**: Light/Dark mode preference
- **useLocalStorage**: Persist state to localStorage

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Design inspiration from modern SaaS platforms

---

Built with passion for empowering farmers through technology.
