# Audoro

Audoro is a web application designed to help users manage and interact with digital companions, track their learning journeys, and manage subscriptions. The platform provides a user-friendly interface for creating, viewing, and customizing companions, as well as tracking progress and managing account settings.

## Features

- **Companion Management**:  
  Create, view, and customize digital companions. Each companion can have unique attributes and can be managed through a dedicated interface (list, detail, and creation pages).
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
  - Supabase integration  
  - Vapi SDK integration  
  - SVG and PNG assets for icons and images

## Project Structure

```
audoro/
  app/                # Next.js app directory (routing, pages)
    companions/       # Companion-related pages
      [id]/           # Detail/edit page for a companion
        page.tsx
      new/            # New companion creation page
        page.tsx
      page.tsx        # Companions list page
    my-journey/       # User journey tracking
      page.tsx
    sign-in/          # Authentication
      [[...sign-in]]/ # Sign-in page
        page.tsx
    subscription/     # Subscription management
      page.tsx
    layout.tsx        # App layout
    globals.css       # Global styles
    page.tsx          # Home page
  components/         # Reusable React components
    CompanionCard.tsx
    CompanionsList.tsx
    CompanionForm.tsx
    CompanionComponent.tsx
    Navbar.tsx
    NavItems.tsx
    CTA.tsx
    SearchInput.tsx
    SubjectFilter.tsx
    ui/               # UI primitives (shadcn/ui)
      button.tsx
      form.tsx
      input.tsx
      label.tsx
      select.tsx
      table.tsx
      textarea.tsx
  constants/          # Static data and configuration
    index.ts
    soundwaves.json
  lib/                # Utility functions and integrations
    actions/
      companion.action.ts
    utils.ts
    supabase.ts
    vapi.sdk.ts
  public/             # Static assets (icons, images)
  types/              # TypeScript type definitions
    index.d.ts
    vapi.d.ts
```

## Components

- **Custom Components (`components/`)**  
  - `CompanionCard`  
  - `CompanionsList`  
  - `CompanionForm`  
  - `CompanionComponent`  
  - `Navbar`  
  - `NavItems`  
  - `CTA`  
  - `SearchInput`  
  - `SubjectFilter`

- **UI Primitives (`components/ui/`)**  
  - `button`  
  - `form`  
  - `input`  
  - `label`  
  - `select`  
  - `table`  
  - `textarea`

## Utilities & Actions

- **Utility Functions (`lib/utils.ts`)**: General-purpose helpers used throughout the app.
- **Companion Actions (`lib/actions/companion.action.ts`)**: Logic for managing companion data.
- **Integrations**:  
  - `lib/supabase.ts`: Supabase client setup.  
  - `lib/vapi.sdk.ts`: Vapi SDK integration.

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

