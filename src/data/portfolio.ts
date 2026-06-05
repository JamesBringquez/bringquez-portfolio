export const personalInfo = {
  name: "James Matthew P. Bringquez",
  firstName: "James",
  title: "Web Developer & Designer",
  tagline: "Crafting digital experiences at the intersection of code and design.",
  email: "jamesbringquez@gmail.com",
  location: "Philippines",
  social: {
    github: "https://github.com/JamesBringquez",
    linkedin: "https://www.linkedin.com/in/james-matthew-bringquez/",
    vercel: "https://vercel.com/james-matthew-bringquezs-projects",
    facebook: "https://www.facebook.com/JamtasticBringquez/",
    instagram: "https://www.instagram.com/jamesbringquezz/",
  },
}

/** ARKĒ brand social links */
export const arkeBrand = {
  social: {
    facebook: "https://www.facebook.com/JamtasticBringquez/",
    instagram: "https://www.instagram.com/jamesbringquezz/",
  },
}

/** Replace files in public/images/ with your own photos (keep the same filenames). */
export const images = {
  logo: "/images/logo.png",
  profile: "/images/profile.png",
  hero: "/images/hero.jpg",
}

export const experience = {
  years: 1,
  months: 2,
  shortLabel: "1 yr 2 mo",
  fullLabel: "1 year & 2 months",
  field: "Web Development",
}

export const aiAssistedDev = {
  title: "AI-Assisted Development",
  description:
    "I use AI tools as part of a deliberate workflow — to research solutions, compare approaches, and speed up repetitive tasks. Every output is read, understood, and tested before it enters my codebase.",
  principles: [
    {
      title: "Review Before Implementing",
      description: "No copy-paste without understanding. I verify logic, structure, and fit first.",
    },
    {
      title: "Validate Every Change",
      description: "AI suggestions are treated as drafts — I debug, refine, and adapt them to the project.",
    },
    {
      title: "Stay in Control",
      description: "Tools assist the process; architectural and implementation decisions remain mine.",
    },
  ],
  tools: ["Claude", "ChatGPT", "Cursor", "Perplexity", "Gemini", "Copilot"],
}

export const roles = [
  {
    title: "Web Developer",
    description:
      "Building responsive, performant websites with clean code and modern frameworks.",
    icon: "Code" as const,
  },
  {
    title: "Web Designer",
    description:
      "Designing visually compelling layouts that balance aesthetics with usability.",
    icon: "Palette" as const,
  },
  {
    title: "Front-end Developer",
    description:
      "Translating designs into pixel-perfect, interactive user interfaces.",
    icon: "Browser" as const,
  },
  {
    title: "UI/UX Explorer",
    description:
      "Venturing into user research, wireframing, and experience-driven design.",
    icon: "FigmaLogo" as const,
  },
]

/** Display order for Skills & Tools section */
export const skillCategories = [
  "Framework",
  "Programming",
  "Styling",
  "Database",
  "Platforms",
  "Design",
  "Tools",
  "Technical Support",
  "Spoken Languages",
  "Certifications",
  "Soft Skills",
] as const

export const skills = [
  { name: "React", category: "Framework" },
  { name: "TypeScript", category: "Programming" },
  { name: "JavaScript", category: "Programming" },
  { name: "C# / ASP.NET", category: "Programming" },
  { name: "HTML", category: "Programming" },
  { name: "jQuery", category: "Programming" },
  { name: "CSS", category: "Styling" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Bootstrap", category: "Styling" },
  { name: "MySQL", category: "Database" },
  { name: "MSSQL", category: "Database" },
  { name: "WordPress", category: "Platforms" },
  { name: "Wix", category: "Platforms" },
  { name: "Figma", category: "Design" },
  { name: "Responsive Design", category: "Design" },
  { name: "UI/UX Principles", category: "Design" },
  { name: "Git", category: "Tools" },
  { name: "Desktop Application Support", category: "Technical Support" },
  { name: "Technical Support", category: "Technical Support" },
  { name: "Computer Hardware Troubleshooting", category: "Technical Support" },
  { name: "English", category: "Spoken Languages" },
  { name: "Tagalog", category: "Spoken Languages" },
  { name: "Web Developer Certification (Simplilearn)", category: "Certifications" },
  { name: "Effectivity", category: "Soft Skills" },
  { name: "Adaptability", category: "Soft Skills" },
  { name: "Problem-solving", category: "Soft Skills" },
]

/**
 * Featured Projects
 *
 * Each project opens in a new browser tab — separate from the portfolio.
 *
 * Option A — Your project is hosted elsewhere (recommended for live sites):
 *   Set `liveUrl` to your deployed project URL (e.g. https://myapp.vercel.app)
 *
 * Option B — Showcase page on this site:
 *   Leave `liveUrl` empty and fill in `page` details.
 *   It opens at /projects/your-slug in a new tab with its own layout.
 */
export interface Project {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  category: string
  color: string
  /** Thumbnail shown on portfolio and project page — path under public/ */
  image: string
  /** Banner fit in Featured Projects card (default: cover) */
  imageFit?: "cover" | "contain"
  /** Deployed project URL — opens in a new browser tab when set */
  liveUrl?: string
  /** Standalone project page content (used when liveUrl is not set) */
  page?: {
    overview: string
    role?: string
    timeline?: string
    features?: string[]
    githubUrl?: string
    demoUrl?: string
  }
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "arke-clothing",
    title: "ARKĒ — Clothing Store",
    description:
      "My planned clothing label — born from late-night sketches and a simple idea: everyday streetwear that feels intentional. I designed the ARKĒ identity (pearl, black, holo accents) and built the full storefront demo myself — collections, cart, lookbook, and all.",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "Personal Project",
    color: "from-neutral-100 via-white to-neutral-200",
    image: "/images/project-arke-banner.png",
    page: {
      overview:
        "ARKĒ is my planned online clothing store — a premium streetwear brand with a clean black-and-white identity and animated holographic accents on the logo and product surfaces. The demo includes category filtering, a shopping bag, and a fully responsive storefront built with React and Tailwind CSS.",
      role: "Web Developer & Designer",
      timeline: "2026 · In Development",
      features: [
        "Brand identity with holographic ARKĒ logo animation",
        "Clothing catalog with category filters",
        "Shopping bag with quantity controls",
        "Responsive storefront UI built with React & Tailwind",
      ],
    },
  },
  {
    id: 2,
    slug: "sera-discord-bot",
    title: "Sera — Discord Bot",
    description:
      "A Discord bot I built for servers I actually hang out in — voice music when friends join a channel, Japanese practice commands I use myself, and staff tools that make running a community less chaotic. Python, discord.py, and a lot of trial and error.",
    tags: ["Python", "discord.py", "FFmpeg"],
    category: "Personal Project",
    color: "from-white via-blue-100/80 to-pink-100/60",
    image: "/images/project-sera-banner.png",
    page: {
      overview:
        "Sera is a custom Discord bot built with Python and discord.py. It combines voice music playback (yt-dlp + FFmpeg), a Japanese learning toolkit with translation and romaji, and server tools for voice management, announcements, and DM inbox relay — designed for real communities with slash commands, rich embeds, and staff permission controls.",
      role: "Developer",
      timeline: "Personal Project",
      features: [
        "Music & voice: YouTube, SoundCloud, Spotify queue with !play commands",
        "Japanese: /jp-word, /jp-quiz, /jp-translate, culture, calendar & live cameras",
        "Server tools: voice join/leave, inbox relay, modal announcements, DM admin",
        "Modular cog architecture with .env config and optional DeepL translation",
      ],
    },
  },
]

/** Returns the URL that opens in a new browser tab for a project */
export function getProjectUrl(project: Project): string {
  if (project.liveUrl) return project.liveUrl
  return `/projects/${project.slug}`
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const education = [
  {
    id: 1,
    degree: "University",
    school: "De La Salle University — Dasmariñas",
    location: "Dasmariñas, Cavite · Philippines",
    period: "2020 – 2024",
    highlights: [
      "Director of Accounting — Lasallian CodeSpace",
      "3rd Year, 1st Sem Dean's List Awardee",
      "Special Awards — Director of Accounting",
    ],
  },
  {
    id: 2,
    degree: "Senior High School — STEM Strand",
    school: "Far Eastern University — Alabang",
    location: "Muntinlupa · Philippines",
    period: "2017 – 2020",
    highlights: ["STEM Strand Student"],
  },
  {
    id: 3,
    degree: "Grade School",
    school: "Statefields School Incorporated",
    location: "Philippines",
    period: "2010 – 2017",
    highlights: [
      "Bravo 2 Officer — Junior Prefect Officer",
      "Exemplary Award (Blue Honors) — Grade 5 to Grade 10",
    ],
  },
]

export const workExperience = [
  {
    id: 1,
    role: "Web Developer",
    company: "Datascope Communication Phils Incorporated",
    location: "Philippines",
    period: "2025 – Present",
    type: "Full-time",
    highlights: [
      "Redesigned and enhanced the Document Management System (DMS) with a focus on user experience and interface clarity",
      "Developed responsive front-end components using HTML, CSS, and JavaScript",
      "Collaborated on improving system workflows for more intuitive document navigation and interaction",
      "Optimized UI performance while integrating with back-end systems using C# and SQL",
    ],
  },
  {
    id: 2,
    role: "IT Technician",
    company: "Statefields School Incorporated (IT Department)",
    location: "Philippines",
    period: "2024 – 2025",
    type: "Full-time",
    highlights: [
      "Provided user-focused technical support to improve overall system usability and efficiency",
      "Assisted users in resolving hardware and software issues with clear communication and guidance",
      "Maintained desktop systems to ensure smooth and uninterrupted user experience",
      "Supported device setup and configuration, enhancing accessibility for end-users",
    ],
  },
  {
    id: 3,
    role: "Junior Programmer",
    company: "Statefields School Incorporated (IT Department)",
    location: "Philippines",
    period: "2024",
    type: "Full-time",
    highlights: [
      "Managed the front-end of the school's portal using C# ASPX",
      "Redesigned the login system design of the Student Portal using C#, HTML, and CSS",
      "Handled the database of the student portal for the grading system using MySQL",
      "Monitored and tested the use of the Student-Teacher Evaluation System using C#",
    ],
  },
  {
    id: 4,
    role: "IT Intern",
    company: "Knowles Training Institute",
    location: "Philippines",
    period: "2024",
    type: "Internship",
    highlights: [
      "Developed user-focused front-end interfaces to improve overall website usability and accessibility",
      "Implemented a structured login interface aligned with user experience best practices",
      "Assisted in deploying and optimizing the website to ensure smooth user interaction",
    ],
  },
]

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]
