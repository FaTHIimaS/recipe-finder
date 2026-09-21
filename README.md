# Recipe Finder 🍳

A modern, responsive culinary application with a 4-screen mobile flow powered by Google Gemini AI. Enter your available kitchen ingredients to instantly generate appetizing, step-by-step recipes with preparation times, difficulty levels, dynamic portion scaling, and offline cookbook saving.

---

## ✨ Features

- **Screen 1: Pantry Search & Kitchen Home**
  - Search by typing comma-separated ingredients (e.g. `garlic, tomatoes, pasta`).
  - Quick-select staple chips (eggs, onions, olive oil, rice, etc.).
  - Instant navigation to saved recipes and flow inspector.

- **Screen 2: Recipe Results**
  - Real-time recipe generation powered by Google Gemini AI (`@google/genai`).
  - Recipe cards displaying total cook time, difficulty, category, and photo badges.
  - Interactive cooking-time filters (under 20 mins, under 30 mins, or all).
  - Resilient model fallback with backoff retry and curated pantry matching.

- **Screen 3: Step-by-Step Recipe Details**
  - Dynamic portion scaler (recalculates ingredient quantities automatically).
  - Interactive ingredient checklist to cross off items as you prep.
  - Numbered sequential cooking instructions with progress indicators.
  - Chef secrets and serving tips for each dish.
  - One-tap heart button to bookmark recipes.

- **Screen 4: Saved Recipes Cookbook**
  - Offline-first persistence using browser local storage.
  - 2-column responsive cookbook grid with quick search filter.
  - Offline network detection indicator.

- **Dual View Modes**:
  - **Phone Simulator**: Authentic mobile device frame with persistent bottom navigation.
  - **All 4 Screens Flow Board**: Side-by-side multi-screen layout to review design and typographic consistency across all screens at once.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Server**: Vite 6 + Express (Full-stack architecture)
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Motion

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm / yarn / bun)
- **Gemini API Key**: From [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/recipe-finder.git
cd recipe-finder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment file and add your Gemini API key:
```bash
cp .env.example .env
```
Edit `.env` and set your API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

To compile the frontend bundle and build the server for production:

```bash
# Build production assets and bundle the server
npm run build

# Start the production server
npm start
```

---

## 🐙 Git & GitHub Commands

### Pushing this project to a new GitHub repository:

1. **Create a new empty repository** on [GitHub](https://github.com/new) (do not initialize with README or license).
2. **Run these commands in your project terminal**:

```bash
# Initialize git repository (if not already done)
git init

# Stage all project files
git add .

# Create the initial commit
git commit -m "Initial commit: Recipe Finder 4-screen app with Gemini AI"

# Set default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/recipe-finder.git

# Push to GitHub
git push -u origin main
```

### Making future updates:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "feat: describe your change here"

# Push to GitHub
git push
```

---

## 🌐 Deploying to GitHub Pages (No White Screen)

The project is pre-configured with **relative asset paths (`base: './'`)** and a **React Error Boundary** to prevent the white screen issue on GitHub Pages:

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. Push your repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically run the included workflow (`.github/workflows/deploy.yml`), build the app, and deploy it to `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

### Option B: Deploy from Branch (e.g., `gh-pages` or `/docs`)

If using manual branch deployment:
```bash
# Build the project
npm run build

# The output in dist/ uses relative paths (./assets/...) and works on any subpath
```

---

## 📁 Project Structure

```
├── index.html            # Main HTML entry point
├── server.ts             # Express backend with Vite middleware & Gemini API endpoint
├── vite.config.ts        # Vite build and Tailwind configuration
├── tsconfig.json         # TypeScript compiler configuration
├── metadata.json         # AI Studio app metadata
├── package.json          # Project scripts and dependencies
├── .env.example          # Template for required environment variables
├── .gitignore            # Git exclusion rules
└── src/
    ├── main.tsx          # React application entry point
    ├── App.tsx           # Primary state controller and view switcher
    ├── index.css         # Global styles with Tailwind imports
    ├── types.ts          # Shared TypeScript interfaces & types
    ├── components/       # Screen views & UI components
    │   ├── HomeScreen.tsx        # Screen 1: Search & kitchen home
    │   ├── ResultsScreen.tsx     # Screen 2: Recipe search results cards
    │   ├── DetailScreen.tsx      # Screen 3: Recipe detail with portion scaler
    │   ├── SavedScreen.tsx       # Screen 4: Saved recipes cookbook
    │   ├── NavigationBar.tsx     # Persistent bottom tab navigation
    │   └── OfflineIndicator.tsx  # Network status banner
    ├── data/
    │   └── recipes.ts    # Curated recipe database & pantry search algorithm
    └── hooks/
        └── useLocalStorage.ts   # Persistent local storage hook
```

---

## 📄 License

MIT License. Feel free to use, modify, and distribute this project.
