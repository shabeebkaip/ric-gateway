# RIC Gateway - Next.js

This is a [Next.js](https://nextjs.org) project for RIC (Riyadh International Corporation) Medical Equipment & Healthcare Solutions.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
/app                    # Next.js App Router directory
  /layout.tsx          # Root layout with metadata
  /page.tsx            # Home page
  /providers.tsx       # Client-side providers (React Query, etc.)
  /not-found.tsx       # 404 page
/src
  /components          # React components
  /hooks              # Custom React hooks
  /lib                # Utility functions
/public               # Static assets (images, logos, etc.)
\`\`\`

## Build

To create a production build:

\`\`\`bash
npm run build
\`\`\`

To start the production server:

\`\`\`bash
npm start
\`\`\`

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Shadcn/ui** - UI components
- **React Query** - Data fetching and caching
- **Lucide React** - Icons

## Features

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Modern animations
- ✅ Dark mode support
- ✅ Type-safe with TypeScript

## Migration from Vite

This project has been migrated from Vite to Next.js. Key changes:

- Removed: vite.config.ts, index.html, React Router, Vite plugins
- Added: next.config.ts, App Router structure, 'use client' directives
- Updated: Dependencies, TypeScript config, build scripts
