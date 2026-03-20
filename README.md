# BLIP Starter

A modern, production-ready **React + TypeScript + Vite** starter template with **shadcn/ui** components, built for building internal tools, dashboards, and admin panels quickly.

## 🚀 Features

### Core Stack
- ⚡ **Vite** - Next-gen frontend tooling
- 🎨 **React 19** - Latest React with hooks
- 🔷 **TypeScript** - Type-safe development
- 🎯 **React Router v7** - Client-side routing
- 🌙 **Dark/Light Mode** - Theme toggle with persistence

### UI & Styling
- 🎨 **shadcn/ui** - Beautiful, accessible components
- 🎭 **Tailwind CSS v4** - Utility-first CSS framework
- 📊 **Recharts** - Responsive charts
- 📱 **Responsive Design** - Mobile-first approach

### State & Data
- 🗄️ **Zustand** - Lightweight state management
- 🌐 **Axios** - HTTP client with interceptors
- 📋 **TanStack Table** - Powerful data tables
- ✅ **React Hook Form + Zod** - Form validation

### Pages Included
- 📊 **Dashboard** - Stats cards + charts
- 📦 **Products CRUD** - Full CRUD with table
- 👤 **Profile** - User profile management
- 🔐 **Auth** - Login/Register pages
- 🔑 **Change Password** - Password management

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, DashboardLayout
│   ├── shared/          # Reusable components (Modal, ConfirmDialog)
│   └── ui/              # shadcn/ui components
├── modules/             # Feature-based modules
│   ├── auth/            # Login, Register
│   ├── dashboard/       # Dashboard page
│   ├── products/        # Products CRUD
│   ├── profile/         # Profile, Change Password
│   └── shared/          # Shared components
├── hooks/               # Custom hooks
├── lib/                 # Utilities (API, toast, theme)
├── routes/              # Route guards
├── store/               # Zustand stores
├── types/               # TypeScript types
├── App.tsx              # Main app with routes
└── main.tsx             # Entry point
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blip-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 What's Included

### Authentication Flow
- ✅ Login page with email/password
- ✅ Register page
- ✅ Protected routes
- ✅ Auth state management (Zustand)
- ✅ Persistent sessions

### Dashboard
- ✅ Stats cards (Revenue, Orders, etc.)
- ✅ Bar charts (Revenue & Orders)
- ✅ Recent orders table
- ✅ Responsive layout

### Products Module
- ✅ Product list with TanStack Table
- ✅ Search & filters (category, status, price, stock)
- ✅ Sorting (name, price, stock)
- ✅ Pagination
- ✅ Add/Edit/Delete products
- ✅ Status toggle (Active/Inactive)

### Profile Management
- ✅ View/edit profile
- ✅ Change password
- ✅ Avatar display
- ✅ Logout functionality

### UI Components
- ✅ Sidebar navigation (collapsible)
- ✅ Header with search & theme toggle
- ✅ Dropdown menus
- ✅ Modals & dialogs
- ✅ Toast notifications
- ✅ Form components
- ✅ Data tables

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize Tailwind CSS variables:

```css
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

### API Configuration
Update `src/lib/api.ts` with your backend URL:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
```

Add to `.env`:
```env
VITE_API_BASE_URL=http://your-api.com
```

## 📚 Adding New Features

### 1. Create New Module
```bash
mkdir src/modules/your-feature
mkdir src/modules/your-feature/pages
mkdir src/modules/your-feature/components
```

### 2. Add Route
Edit `src/App.tsx`:
```tsx
import { YourFeature } from "@/modules/your-feature/pages/YourFeature";

<Route
  path="/your-feature"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <YourFeature />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
```

### 3. Add Sidebar Menu
Edit `src/components/layout/AppSidebar.tsx`:
```tsx
const menuItems = [
  // ... existing items
  {
    title: "Your Feature",
    icon: YourIcon,
    url: "/your-feature",
  },
];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, TypeScript, and Vite**
