# FitSync

A progressive web app (PWA) for tracking workouts and fitness goals. Built with **Next.js**, styled using **Tailwind CSS**, and powered by **MongoDB** for persistent data storage. Authentication and user management are handled via **Clerk**.

## 🚀 Features

- 📱 **Progressive Web App** (offline support with `next-pwa`)
- 🔑 **Authentication** with Clerk (`@clerk/nextjs`)
- 🗄 **Database** integration with MongoDB
- 🎨 **Modern UI** using Tailwind CSS + Lucide Icons
- 📊 **Workout tracking** with customizable routines
- 🌙 **Responsive design** for mobile and desktop

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Lucide React Icons](https://lucide.dev/)
- **PWA Support:** [next-pwa](https://github.com/shadowwalker/next-pwa)

## 📦 Packages Used

- `next` – React framework for production-ready apps
- `react` / `react-dom` – Core React libraries
- `@clerk/nextjs` – Authentication & user management
- `mongodb` – Database client
- `tailwindcss` / `postcss` / `autoprefixer` – Styling setup
- `lucide-react` – Icon library
- `next-pwa` – Adds PWA capabilities
- `eslint` + configs – Linting and code quality

## ⚙️ Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/shay122990/FitSync-pwa-fitness-app
   cd workout-pwa
   ```

````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file with:

   ```env
   # === MongoDB ===
   MONGODB_URI_DEV=get_the_UrI_from_mongodb

   # === Clerk Auth ===
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=text_key
   CLERK_SECRET_KEY=sk_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/profile
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile

   # === Base URL ===
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   Create a `.env.production` file with:

   ```env
   # === MongoDB ===
   MONGODB_URI=get_the_UrI_from_mongodb

   # === Clerk Auth ===
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=text_key
   CLERK_SECRET_KEY=sk_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/profile
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile

   # === Base URL ===
   NEXT_PUBLIC_BASE_URL=your_vercel_published_url
   ```

4. **Run the dev server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

## 📱 PWA Setup

- Installable on mobile & desktop.
- Works offline with caching.

## 📖 Scripts

- `npm run dev` → Start dev server
- `npm run build` → Build for production
- `npm start` → Run production server
- `npm run lint` → Lint code

## 📝 License

MIT License © 2025

````
