# 🏥 Full Stack Doctors Appointment Platform

## 📋 Application Description

A comprehensive healthcare platform built with Next.js 15, designed to connect patients with healthcare providers through a seamless digital experience. The platform facilitates medical appointment booking, video consultations, credit-based payments, and a medical products shop, all within an intuitive and secure environment.

### Core Functionality

- **User Role Management**: Multi-role system supporting patients, doctors, and administrators
- **Appointment Booking**: Intuitive scheduling system with availability management
- **Video Consultations**: Secure, HIPAA-compliant video sessions for remote healthcare
- **Credit System**: Flexible payment model with credit packages and doctor payouts
- **Medical Products Shop**: E-commerce functionality for healthcare products
- **Admin Dashboard**: Comprehensive tools for platform management and oversight

## 🚀 Features

### User Management
- **Role-Based Access Control**: Different interfaces and permissions for patients, doctors, and administrators
- **Profile Management**: Comprehensive profile creation and management for all user types
- **Authentication**: Secure sign-in/sign-up flows with Clerk integration
- **Onboarding**: Guided role selection and profile completion process

### Appointment System
- **Doctor Discovery**: Browse and filter doctors by specialty, experience, and ratings
- **Availability Management**: Doctors can set their available time slots
- **Booking Flow**: Streamlined appointment creation with credit verification
- **Appointment Management**: View, reschedule, and cancel appointments
- **Notifications**: Booking confirmations and appointment reminders

### Video Consultation
- **Secure Video Sessions**: End-to-end encrypted video calls via Vonage API
- **Session Management**: Join, conduct, and end consultations
- **Chat Functionality**: Text communication during video sessions
- **Screen Sharing**: Share medical documents and test results

### Credit System
- **Credit Packages**: Various credit purchase options
- **Transaction History**: Complete record of credit usage
- **Doctor Payouts**: Revenue sharing model for healthcare providers
- **Billing Integration**: Secure payment processing through Clerk

### Medical Products Shop
- **Product Catalog**: Extensive range of medical products across categories
- **Search & Filter**: Find products by category, price range, and keywords
- **Shopping Cart**: Add, remove, and manage items
- **View Options**: Toggle between grid and list views
- **Stock Management**: Real-time product availability indicators

### Admin Tools
- **User Management**: Oversee all platform users
- **Doctor Verification**: Review and approve healthcare provider applications
- **Payout Processing**: Manage doctor compensation
- **Analytics Dashboard**: Monitor platform usage and performance

## 👥 User Role Interfaces

### Patient Interface

**Available Features:**
- Browse doctors by specialty and availability
- Book, reschedule, and cancel appointments
- Join video consultations
- Purchase and manage credits
- View appointment history
- Shop for medical products
- Manage shopping cart and wishlist
- Update personal profile

**Interface Description:**
- Patient dashboard with appointment calendar
- Doctor listing with filtering options
- Credit purchase interface with package selection
- Video consultation room with controls
- Medical products shop with category navigation

### Doctor Interface

**Available Features:**
- Complete profile with medical credentials
- Set and update availability schedule
- View upcoming and past appointments
- Conduct video consultations
- Track earnings and request payouts
- Update professional information

**Interface Description:**
- Doctor dashboard with appointment schedule
- Availability calendar with time slot management
- Patient appointment details view
- Video consultation room with medical notes
- Earnings tracker and payout request form

### Admin Interface

**Available Features:**
- Review and verify doctor applications
- Manage all platform users
- Process doctor payouts
- View platform analytics and metrics
- Moderate content and resolve issues

**Interface Description:**
- Admin dashboard with key metrics
- User management interface with search and filter
- Doctor verification queue with application details
- Payout management system
- Platform analytics with usage statistics

## ⚙️ Setup and Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- PostgreSQL database (local or cloud-based)
- Clerk account for authentication
- Vonage Video API account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doctors-appointment-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration Options

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk URLs (Optional)
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Vonage Video API
NEXT_PUBLIC_VONAGE_APPLICATION_ID="your_vonage_application_id"
VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----"

# Node Environment
NODE_ENV="development"
```

### Service Configuration

#### 1. Database (Neon PostgreSQL)

1. Create an account at [Neon](https://neon.tech)
2. Create a new project and database
3. Copy the connection string to your `.env.local` file

#### 2. Clerk Authentication

1. Create an account at [Clerk](https://clerk.com)
2. Create a new application
3. Configure sign-in/sign-up options
4. Set up billing for credit purchases
5. Copy API keys to your `.env.local` file

#### 3. Vonage Video API

1. Create an account at [Vonage API Dashboard](https://dashboard.nexmo.com/)
2. Create a new Video API application
3. Generate a private key
4. Copy the Application ID and Private Key to your `.env.local` file

## 📝 Usage Examples

### Patient: Booking an Appointment

1. Sign in as a patient
2. Navigate to the "Find Doctors" page
3. Filter doctors by specialty (e.g., Cardiology)
4. Select a doctor and view their profile
5. Choose an available time slot
6. Confirm booking (requires 2 credits)
7. Receive confirmation and appointment details

### Doctor: Setting Availability

1. Sign in as a doctor
2. Navigate to the "Availability" section
3. Select dates and times when you're available
4. Save your availability schedule
5. Patients can now book during these times

### Video Consultation

1. Both patient and doctor sign in before appointment time
2. Navigate to the appointment details
3. Click "Join Video Call" when the appointment time arrives
4. Grant camera and microphone permissions
5. Conduct the consultation
6. End the call when finished

### Shopping for Medical Products

1. Navigate to the "Shop" section
2. Browse products by category or use the search function
3. Filter by price range if needed
4. Toggle between grid and list views
5. Add products to your cart
6. Review cart and proceed to checkout

### Admin: Verifying a Doctor

1. Sign in as an admin
2. Navigate to the "Doctor Verification" section
3. Review pending applications
4. Check submitted credentials and documentation
5. Approve or reject the application
6. Doctor receives notification of the decision

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Shadcn UI
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL (Neon)
- **Authentication:** Clerk
- **Video Calls:** Vonage Video API
- **Payments:** Clerk Billing
- **UI Components:** Radix UI, Lucide Icons
- **Styling:** Tailwind CSS, CSS Variables

## 📁 Project Structure

```
doctors-appointment-platform/
├── 📁 actions/                 # Server actions for backend logic
│   ├── admin.js               # Admin management functions
│   ├── appointments.js        # Appointment booking & management
│   ├── credits.js             # Credit system management
│   ├── doctor.js              # Doctor profile & availability
│   ├── doctors-listing.js     # Doctor search & filtering
│   ├── onboarding.js          # User role assignment
│   ├── patient.js             # Patient profile management
│   └── payout.js              # Doctor payout system
├── 📁 app/                     # Next.js App Router
│   ├── 📁 (auth)/             # Authentication routes
│   │   ├── layout.js          # Auth layout wrapper
│   │   ├── sign-in/           # Clerk sign-in pages
│   │   └── sign-up/           # Clerk sign-up pages
│   ├── 📁 (main)/             # Main application routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── appointments/      # User appointments
│   │   ├── doctor/            # Doctor dashboard
│   │   ├── doctors/           # Doctor listings
│   │   ├── onboarding/        # Role selection
│   │   ├── pricing/           # Credit packages
│   │   ├── shop/              # Medical products shop
│   │   └── video-call/        # Video consultation
│   ├── favicon.ico            # App favicon
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout with Clerk
│   └── page.js                # Landing page
├── 📁 components/              # Reusable UI components
│   ├── ui/                    # Shadcn UI components
│   ├── appointment-card.jsx   # Appointment display card
│   ├── header.jsx             # Navigation header
│   ├── page-header.jsx        # Page title component
│   ├── pricing.jsx            # Clerk pricing table
│   └── theme-provider.jsx     # Dark/light theme
├── 📁 hooks/                   # Custom React hooks
│   └── use-fetch.js           # Data fetching hook
├── 📁 lib/                     # Utility libraries
│   ├── checkUser.js           # User authentication helper
│   ├── data.js                # Static data (features, testimonials)
│   ├── medical-products.js    # Medical products data and utilities
│   ├── prisma.js              # Prisma client configuration
│   ├── schema.js              # Zod validation schemas
│   ├── specialities.js        # Medical specialties data
│   └── utils.js               # Utility functions
├── 📁 prisma/                  # Database configuration
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database schema
├── 📁 public/                  # Static assets
│   ├── banner.png             # Hero section images
│   ├── banner2.png
│   ├── logo-single.png        # App logos
│   ├── logo.png
│   └── products/              # Product images and data
├── .env.example               # Environment variables template
├── middleware.js              # Clerk authentication middleware
├── next.config.mjs            # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🔒 Security Features

- **Authentication:** Clerk-based secure authentication
- **Authorization:** Role-based access control
- **Data Validation:** Zod schema validation
- **SQL Injection Protection:** Prisma ORM parameterized queries
- **CSRF Protection:** Next.js built-in protection
- **Secure Video:** Vonage encrypted video sessions

## 📱 Responsive Design

- **Mobile-First:** Tailwind CSS responsive utilities
- **Breakpoints:** sm, md, lg, xl screen sizes
- **Touch-Friendly:** Optimized for mobile interactions
- **Progressive Enhancement:** Works without JavaScript

## 🎨 UI/UX Features

- **Dark/Light Theme:** System preference detection
- **Loading States:** React Spinners integration
- **Toast Notifications:** Sonner toast library
- **Form Validation:** React Hook Form + Zod
- **Accessibility:** ARIA labels and keyboard navigation
- **Product Views:** Grid and list view options for shop products
- **Interactive Cart:** Real-time cart updates with toast notifications
- **Filtering UI:** Category and price range filters with instant results

## 📊 Performance Optimizations

- **Next.js 15:** App Router with React Server Components
- **Turbopack:** Fast development builds
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic route-based splitting
- **Database Indexing:** Optimized Prisma queries

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RoadsideCoder** - Original tutorial and development
- **Clerk** - Authentication and billing services
- **Vonage** - Video API integration
- **Neon** - PostgreSQL database hosting
- **Vercel** - Deployment platform

---

**Made with 💗 by RoadsideCoder**
