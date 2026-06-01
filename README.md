# James Matthew P. Bringquez — Portfolio

Personal portfolio website showcasing my work as a **Web Developer**, **Web Designer**, and **Front-end Developer**, with a growing focus on **UI/UX design**.

**Live site:** [bringquez-portfolio.vercel.app](https://bringquez-portfolio.vercel.app/)

---

## About Me

I'm **James Matthew P. Bringquez**, based in the **Philippines**. I build modern, responsive web experiences at the intersection of code and design — from clean front-end interfaces to thoughtful layout and structure.

I hold **1 year & 2 months** of professional experience in **Web Development** and am actively expanding into **UI/UX** through user research, wireframing, and prototyping.

**Email:** [jamesbringquez@gmail.com](mailto:jamesbringquez@gmail.com)

### Connect

- **GitHub:** [github.com/JamesBringquez](https://github.com/JamesBringquez)
- **LinkedIn:** [linkedin.com/in/james-matthew-bringquez](https://www.linkedin.com/in/james-matthew-bringquez/)
- **Vercel:** [vercel.com/james-matthew-bringquezs-projects](https://vercel.com/james-matthew-bringquezs-projects)

---

## Site Overview

The main portfolio is a single-page layout with smooth scrolling sections. Standalone **project demos** open in a **new browser tab** with their own layout (no portfolio navbar) and a link back to the homepage.

| Section | Description |
|---------|-------------|
| **Hero** | Introduction, profile accent, CTA |
| **About** | Bio and profile image |
| **Experience** | Work history timeline + education timeline |
| **Services** | Web dev, design, front-end, UI/UX roles |
| **Skills & Tools** | Technical skills, certifications, soft skills, and **AI-Assisted Development** workflow |
| **Featured Projects** | Two highlighted personal projects (cards link to demo sites) |
| **Contact** | Email and social links |
| **Footer** | Logo, links, copyright |

---

## What I Do

| Role | Focus |
|------|--------|
| **Web Developer** | Responsive, performant websites with modern frameworks |
| **Web Designer** | Visually compelling layouts that balance aesthetics and usability |
| **Front-end Developer** | Pixel-perfect, interactive user interfaces |
| **UI/UX Explorer** | User research, wireframing, and experience-driven design |

---

## Skills

### Languages
- JavaScript · TypeScript · C# · HTML · CSS

### Frameworks & Styling
- React · Tailwind CSS · Bootstrap

### Databases
- MySQL · MSSQL

### Design & Tools
- Responsive Design · UI/UX Principles · Figma · Git

### AI-Assisted Development
I use AI tools (**Claude**, **ChatGPT**, **Cursor**, **Perplexity**, **Gemini**, **Copilot**) as part of a deliberate workflow — to research, compare approaches, and speed up routine tasks. Every suggestion is **reviewed, understood, and tested** before it enters my codebase. This is surfaced in the **Skills & Tools** section on the site (merged from a former “Additional Information” block).

---

## Experience (on site)

### Work
| Role | Company | Period |
|------|---------|--------|
| Web Developer | Datascope Communication Phils Incorporated | 2025 – Present |
| IT Technician | Statefields School Incorporated (IT Department) | 2024 – 2025 |
| Junior Programmer | Statefields School Incorporated (IT Department) | 2024 |
| IT Intern | Knowles Training Institute | 2024 |

### Education
| School | Period |
|--------|--------|
| De La Salle University — Dasmariñas | 2020 – 2024 |
| Far Eastern University — Alabang (STEM) | 2017 – 2020 |
| Statefields School Incorporated | 2010 – 2017 |

---

## Featured Projects

The portfolio currently highlights **two personal projects**. Each card opens in a **new tab** as a standalone demo (separate from the main portfolio chrome).

| Project | Route | Description |
|---------|-------|-------------|
| **ARKĒ — Clothing Store** | `/projects/arke-clothing` | Planned streetwear brand demo — holographic ARKĒ branding, catalog, filters, shopping bag |
| **Sera — Discord Bot** | `/projects/sera-discord-bot` | Python Discord bot — music/voice, Japanese learning toolkit, server admin tools |

To add a project: extend the `projects` array in `src/data/portfolio.ts`. For a custom demo page, add a route in `src/App.tsx` and a component under `src/pages/projects/`.

### ARKĒ store (`ArkeStore.tsx`)

- **Brand:** Pearl white, black, and animated holographic accents on logo and product surfaces
- **Features:** Category filters, product grid, cart sidebar with quantity controls
- **Product images:** AI-generated placeholders in `public/images/arke/` (replace with real photography when ready)
- **Featured card image:** `public/images/project-arke-banner.png` (brand banner, fills the card with `object-cover`)

### Sera Discord Bot (`SeraDiscordBot.tsx`)

- **Content:** Based on the Sera portfolio PDF — music, Japanese commands, server/moderation tools, tech stack
- **Palette:** 60% white, 30% blue, 10% pink (accents only)
- **Logo:** `public/images/sera-logo.png` in header and closing section
- **Featured card image:** `public/images/project-sera.jpg` (Japanese cherry blossom + blue sky, Unsplash)

---

## Routing

```
/                           → Main portfolio (HomePage)
/projects/arke-clothing     → ARKĒ storefront demo
/projects/sera-discord-bot  → Sera Discord Bot showcase
/projects/:slug             → Generic project page (fallback for future entries)
```

---

## Tech Stack (This Site)

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Framer Motion](https://www.framer.com/motion/) — section and page animations
- [Phosphor Icons](https://phosphoricons.com/)
- [React Router](https://reactrouter.com/) — homepage + standalone project pages

**Main portfolio palette:** 60% white · 30% black · 10% blue (`60-30-10` rule)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Install & run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run test:mobile  # Check ARKĒ & Sera for horizontal overflow at 320–430px (dev server required)
```

---

## Project Structure

```
portfolio/
├── public/
│   └── images/
│       ├── logo.png, profile.png, hero.jpg
│       ├── project-arke-banner.png    # ARKĒ featured card
│       ├── project-sera.jpg           # Sera featured card
│       ├── sera-logo.png              # Sera demo site logo
│       └── arke/                      # ARKĒ product photos
│           ├── arke-essential-tee.png
│           ├── arke-holo-hoodie.png
│           ├── arke-structured-cargo.png
│           ├── arke-pearl-windbreaker.png
│           ├── arke-monochrome-cap.png
│           └── arke-layered-longsleeve.png
├── src/
│   ├── components/          # Hero, About, Experience, Services, Skills, Projects, etc.
│   ├── data/portfolio.ts    # All content: personal info, skills, projects, work, education
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProjectPage.tsx  # Generic fallback project layout
│   │   └── projects/
│   │       ├── ArkeStore.tsx
│   │       ├── ArkeProductImage.tsx   # Product image + SVG fallback
│   │       ├── ArkePattern.tsx
│   │       └── SeraDiscordBot.tsx
│   ├── App.tsx              # Routes
│   └── utils/animations.ts
└── index.html               # Favicon → /images/logo.png
```

---

## Customizing Content

### Main copy & data
Edit **`src/data/portfolio.ts`** for:
- Personal info, social links, images paths
- Skills, work experience, education
- Featured projects (title, description, tags, thumbnail, `page` details, optional `liveUrl`)

### Images
| Asset | Location | Used for |
|-------|----------|----------|
| Logo | `public/images/logo.png` | Navbar, footer, favicon |
| Profile | `public/images/profile.png` | Hero, About |
| Hero | `public/images/hero.jpg` | Hero background |
| ARKĒ banner | `public/images/project-arke-banner.png` | Featured Projects card |
| Sera card | `public/images/project-sera.jpg` | Featured Projects card |
| Sera logo | `public/images/sera-logo.png` | Sera demo site |
| ARKĒ products | `public/images/arke/*.png` | ARKĒ store product grid & cart |

To swap ARKĒ product photos: replace files in `public/images/arke/` or update each product’s `image` field in `ArkeStore.tsx`.

### Adding a featured project with a custom demo
1. Add entry to `projects` in `portfolio.ts` (set `slug`, `image`, `page`, etc.).
2. Create `src/pages/projects/YourProject.tsx`.
3. Register route in `src/App.tsx` **before** the `:slug` catch-all.

### External live URL
Set `liveUrl` on a project in `portfolio.ts` — the card will open that URL in a new tab instead of `/projects/:slug`.

---

## Recent Updates

- **Featured Projects** trimmed to **ARKĒ** and **Sera** (removed Dashboard UI Kit and Mobile App Redesign placeholders).
- **ARKĒ** standalone storefront with holographic branding, shop filters, cart, and AI-generated product images.
- **Sera** standalone showcase page (music, Japanese toolkit, server tools) with white/blue/pink palette and custom logo.
- **Experience** section: combined work + education timelines; skills consolidated into **Skills & Tools** (including AI-assisted workflow).
- **Project routing:** demos open in new tabs without portfolio navbar; dedicated routes for ARKĒ and Sera.
- **Assets:** brand banner for ARKĒ card, sakura sky photo for Sera card, product image set under `public/images/arke/`.

---

## Deploy to GitHub & Vercel

Yes — this project is ready to host on **GitHub** and deploy on **Vercel** (Vite + React Router; `vercel.json` handles client-side routes like `/projects/arke-clothing`).

### 1. Push to GitHub

**Prerequisites:** [Git](https://git-scm.com/download/win) installed, and a [GitHub](https://github.com) account.

In a terminal (PowerShell or Git Bash), from the `portfolio` folder:

```bash
git init
git add .
git commit -m "Initial portfolio: ARKĒ store, Sera bot, and main site"
```

Create a new empty repository on GitHub (e.g. `portfolio` or `bringquez-portfolio`), then:

```bash
git remote add origin https://github.com/JamesBringquez/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR-REPO-NAME` with your actual repository name.

### 2. Deploy on Vercel

**Option A — Import from GitHub (recommended)**

1. Sign in at [vercel.com](https://vercel.com) (use your GitHub account).
2. **Add New… → Project** → import the repository you just pushed.
3. Vercel should auto-detect **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**.

Every push to `main` can trigger a new deployment if you leave Git integration enabled.

**Option B — Vercel CLI**

```bash
npm i -g vercel
cd portfolio
vercel
```

Follow the prompts to link the project and deploy.

### 3. After deploy

- Test the live URL: homepage, `/projects/arke-clothing`, `/projects/sera-discord-bot`.
- Optional: add the Vercel URL to `personalInfo` / README “Live site” link.
- Optional: [Custom domain](https://vercel.com/docs/domains) in the Vercel project settings.

### Notes

- **`public/images/`** must be committed so logos, banners, and product photos appear on the live site (files can be large; that is normal).
- **`node_modules`** and **`dist`** are gitignored; Vercel builds `dist` on each deploy.
- If a project route shows **404 on refresh**, confirm `vercel.json` is in the repo root.

---

## License

This project is for personal portfolio use. © James Matthew P. Bringquez
