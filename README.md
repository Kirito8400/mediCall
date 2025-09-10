# 🏥 Full Stack Doctors Appointment Platform

A comprehensive healthcare platform built with Next.js 15, featuring video consultations, appointment booking, credit-based payments, and multi-role user management.

## 🎥 Tutorial
**YouTube Tutorial:** https://www.youtube.com/watch?v=ID1PRFF1dlw

![Platform Screenshot](https://github.com/user-attachments/assets/a0d3d443-f5e1-433a-85a7-a76a3866858d)

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
│   └── logo.png
├── .env.example               # Environment variables template
├── middleware.js              # Clerk authentication middleware
├── next.config.mjs            # Next.js configuration
└── package.json               # Dependencies and scripts
```

## 🏗️ Architecture Overview

### Frontend Components

#### 1. **App Router Structure**
- **Route Groups:** `(auth)` and `(main)` for organized routing
- **Dynamic Routes:** `[specialty]` for doctor filtering
- **Nested Layouts:** Role-specific layouts for different user types

#### 2. **Key Components**

```javascript
// Header Component with Authentication
components/header.jsx
- Navigation menu
- User authentication status
- Role-based menu items
- Clerk UserButton integration

// Appointment Card Component
components/appointment-card.jsx
- Appointment details display
- Status indicators
- Action buttons (Join, Cancel)
- Video call integration

// Pricing Component
components/pricing.jsx
- Clerk PricingTable integration
- Credit package display
- Subscription management
```

#### 3. **UI Component System**
- **Shadcn UI:** Pre-built accessible components
- **Radix UI:** Headless component primitives
- **Tailwind CSS:** Utility-first styling
- **Theme System:** Dark/light mode support

### Backend Architecture

#### 1. **Server Actions**
Next.js Server Actions provide type-safe backend functionality:

```javascript
// Appointment Booking Flow
actions/appointments.js
- bookAppointment()          # Create new appointment
- generateVideoToken()       # Vonage video session
- getAvailableTimeSlots()    # Doctor availability
- getDoctorAppointments()    # Doctor's schedule

// Credit Management
actions/credits.js
- deductCreditsForAppointment()  # Charge for booking
- getUserCredits()               # Check balance
- addCreditsToUser()             # Purchase credits

// User Management
actions/onboarding.js
- assignUserRole()           # Set user type
- completePatientProfile()   # Patient setup
- completeDoctorProfile()    # Doctor setup
```

#### 2. **API Integration**

**Vonage Video API:**
```javascript
// Video Session Management
const credentials = new Auth({
  applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_PRIVATE_KEY,
});

// Create video session for appointment
const session = await vonage.video.createSession({
  mediaMode: "routed"
});
```

**Clerk Authentication:**
```javascript
// Protected route middleware
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});
```

### Database Layer

#### 1. **Prisma Schema**

**Core Models:**
```prisma
model User {
  id                String    @id @default(uuid())
  clerkUserId       String    @unique
  email             String    @unique
  role              UserRole  @default(UNASSIGNED)
  credits           Int       @default(2)
  
  // Doctor fields
  specialty         String?
  experience        Int?
  verificationStatus VerificationStatus?
  
  // Relations
  patientAppointments Appointment[] @relation("PatientAppointments")
  doctorAppointments  Appointment[] @relation("DoctorAppointments")
  availabilities      Availability[]
  transactions        CreditTransaction[]
}

model Appointment {
  id                String   @id @default(uuid())
  patientId         String
  doctorId          String
  startTime         DateTime
  endTime           DateTime
  status            AppointmentStatus @default(SCHEDULED)
  videoSessionId    String?  // Vonage session ID
  
  patient           User     @relation("PatientAppointments")
  doctor            User     @relation("DoctorAppointments")
}
```

#### 2. **Model Relationships**
- **User ↔ Appointments:** Many-to-many (patient/doctor roles)
- **User ↔ Availability:** One-to-many (doctor availability slots)
- **User ↔ CreditTransaction:** One-to-many (credit history)
- **User ↔ Payout:** One-to-many (doctor earnings)

#### 3. **Enums & Status Management**
```prisma
enum UserRole {
  UNASSIGNED  # New users
  PATIENT     # Patients
  DOCTOR      # Healthcare providers
  ADMIN       # Platform administrators
}

enum AppointmentStatus {
  SCHEDULED   # Upcoming appointment
  COMPLETED   # Finished consultation
  CANCELLED   # Cancelled by user
}

enum VerificationStatus {
  PENDING     # Awaiting admin review
  VERIFIED    # Approved doctor
  REJECTED    # Denied application
}
```

## 🔧 Core Functionality

### 1. **User Management System**

**Role-Based Access:**
```javascript
// lib/checkUser.js - User verification
export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;
  
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id }
  });
  
  if (!existingUser) {
    // Create new user record
    return await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      }
    });
  }
  
  return existingUser;
}
```

### 2. **Appointment Booking System**

**Booking Flow:**
1. **Doctor Selection:** Browse by specialty
2. **Time Slot Selection:** Check availability
3. **Credit Verification:** Ensure sufficient balance
4. **Video Session Creation:** Generate Vonage session
5. **Confirmation:** Send booking confirmation

```javascript
// Booking validation
if (patient.credits < 2) {
  throw new Error("Insufficient credits");
}

// Create video session
const session = await vonage.video.createSession({
  mediaMode: "routed"
});

// Book appointment
const appointment = await db.appointment.create({
  data: {
    patientId: patient.id,
    doctorId,
    startTime,
    endTime,
    videoSessionId: session.sessionId,
    patientDescription
  }
});
```

### 3. **Credit System**

**Credit Management:**
- **Purchase:** Clerk Billing integration
- **Usage:** 2 credits per consultation
- **Tracking:** Transaction history
- **Payout:** Doctor earnings (80% revenue share)

```javascript
// Credit deduction
export async function deductCreditsForAppointment(userId) {
  await db.$transaction(async (tx) => {
    // Deduct credits
    await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: 2 } }
    });
    
    // Record transaction
    await tx.creditTransaction.create({
      data: {
        userId,
        amount: -2,
        type: "APPOINTMENT_DEDUCTION"
      }
    });
  });
}
```

### 4. **Video Consultation**

**Vonage Integration:**
```javascript
// Generate video token for user
export async function generateVideoToken(formData) {
  const appointmentId = formData.get("appointmentId");
  const appointment = await db.appointment.findUnique({
    where: { id: appointmentId }
  });
  
  const token = vonage.video.generateClientToken(
    appointment.videoSessionId,
    {
      role: "publisher",
      data: `userId=${userId}`,
      expireTime: Math.round(Date.now() / 1000) + 7200 // 2 hours
    }
  );
  
  return { token, sessionId: appointment.videoSessionId };
}
```

## ⚙️ Configuration

### Environment Variables

Create `.env.local` from `.env.example`:

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

### Required Services Setup

#### 1. **Database (Neon PostgreSQL)**
```bash
# Install Neon CLI
npm install -g @neondatabase/cli

# Create database
neonctl databases create --name doctors-appointment

# Get connection string
neonctl connection-string
```

#### 2. **Clerk Authentication**
```bash
# Setup steps:
1. Create account at https://clerk.com
2. Create new application
3. Configure sign-in/sign-up options
4. Set up billing (for credit purchases)
5. Copy API keys to .env.local
```

#### 3. **Vonage Video API**
```bash
# Setup steps:
1. Create account at https://dashboard.nexmo.com/
2. Create new Video API application
3. Generate private key
4. Copy Application ID and Private Key
```

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone <repository-url>
cd doctors-appointment-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

### Development Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma database browser
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
```

## 👥 User Roles & Permissions

### Patient Role
- ✅ Browse doctors by specialty
- ✅ Book appointments
- ✅ Join video consultations
- ✅ Purchase credit packages
- ✅ View appointment history
- ✅ Cancel appointments

### Doctor Role
- ✅ Complete profile verification
- ✅ Set availability schedule
- ✅ View patient appointments
- ✅ Join video consultations
- ✅ Request payouts
- ✅ Update profile information

### Admin Role
- ✅ Verify doctor applications
- ✅ Manage all users
- ✅ Process doctor payouts
- ✅ View platform analytics
- ✅ Moderate content

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
