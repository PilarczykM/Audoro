# Audoro

Audoro is a web application designed to help users manage and interact with digital companions, track their learning journeys, and manage subscriptions. The platform provides a user-friendly interface for creating, viewing, and customizing companions, as well as tracking progress and managing account settings.

## Features

- **Companion Management**:  
  Create, view, and customize digital companions. Each companion can have unique attributes and can be managed through a dedicated interface.

- **My Journey**:  
  Track your learning or progress journey with a dedicated section to visualize and manage your achievements.

- **Subscription Management**:  
  Manage your subscription status and access premium features.

- **Authentication**:  
  Secure sign-in functionality to protect user data and personalize the experience.

- **Responsive UI**:  
  Modern, responsive design using reusable React components and utility-first CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Components**: Custom React components and [shadcn/ui](https://ui.shadcn.com/) primitives
- **Styling**: CSS (with global styles and component-level styles)
- **Package Management**: npm / pnpm
- **Linting**: ESLint
- **Other Tools**:  
  - PostCSS for CSS processing  
  - Custom utility functions  
  - SVG and PNG assets for icons and images

## Project Structure

```
audoro/
  app/                # Next.js app directory (routing, pages)
    companions/       # Companion-related pages (list, detail, new)
    my-journey/       # User journey tracking
    sign-in/          # Authentication
    subscription/     # Subscription management
    layout.tsx        # App layout
    globals.css       # Global styles
  components/         # Reusable React components
    ui/               # UI primitives (shadcn/ui)
  constants/          # Static data and configuration
  lib/                # Utility functions
  public/             # Static assets (icons, images)
  types/              # TypeScript type definitions
```

## Components

- **Custom Components (`components/`)**  
  Application-specific React components developed for Audoro, implementing the app’s main features and logic (e.g., `CompanionCard`, `CompanionsList`, `Navbar`).

- **UI Primitives (`components/ui/`)**  
  Foundational UI components sourced from [shadcn/ui](https://ui.shadcn.com/), used as building blocks for the interface (e.g., `button`, `form`, `input`, `label`, `select`, `table`, `textarea`).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `dev` – Start the development server
- `build` – Build the application for production
- `start` – Start the production server
- `lint` – Run ESLint

