export const RALLY_BASE = "/projects/rally-point-pickleball"
export const RALLY_COURTS = `${RALLY_BASE}/courts`
export const RALLY_EVENTS = `${RALLY_BASE}/events`
export const RALLY_JOIN = `${RALLY_BASE}/join`

export const RALLY_LOGO = "/images/rally-point/rally-point-logo.png"
export const RALLY_HERO = "/images/rally-point/rally-point-hero.png"
export const RALLY_COMMUNITY = "/images/rally-point/rally-point-community.png"

export const rallyInfo = {
  name: "Rally Point Pickleball Club",
  shortName: "Rally Point",
  tagline: "Where players meet, play, and grow together.",
  location: "Filinvest City, Alabang",
  city: "Muntinlupa, Metro Manila",
  country: "Philippines",
  draftNote: "Draft concept — community website for local pickleball players.",
}

export const rallyStats = [
  { value: "6", label: "Courts" },
  { value: "120+", label: "Active players" },
  { value: "3×", label: "Weekly open play" },
  { value: "2019", label: "Est." },
] as const

export type RallyCourt = {
  id: number
  name: string
  type: "Outdoor" | "Covered"
  surface: string
  status: "Open" | "Reserved" | "Maintenance"
  hours: string
}

export const courts: RallyCourt[] = [
  {
    id: 1,
    name: "Court 1 — Sunrise",
    type: "Outdoor",
    surface: "Sport acrylic · blue",
    status: "Open",
    hours: "6:00 AM – 9:00 PM",
  },
  {
    id: 2,
    name: "Court 2 — Palm",
    type: "Outdoor",
    surface: "Sport acrylic · blue",
    status: "Open",
    hours: "6:00 AM – 9:00 PM",
  },
  {
    id: 3,
    name: "Court 3 — Breeze",
    type: "Outdoor",
    surface: "Sport acrylic · green",
    status: "Reserved",
    hours: "6:00 AM – 9:00 PM",
  },
  {
    id: 4,
    name: "Court 4 — Valley",
    type: "Covered",
    surface: "Sport acrylic · green",
    status: "Open",
    hours: "6:00 AM – 10:00 PM",
  },
  {
    id: 5,
    name: "Court 5 — Pavilion A",
    type: "Covered",
    surface: "Sport acrylic · blue",
    status: "Open",
    hours: "6:00 AM – 10:00 PM",
  },
  {
    id: 6,
    name: "Court 6 — Pavilion B",
    type: "Covered",
    surface: "Sport acrylic · blue",
    status: "Maintenance",
    hours: "Reopens Jun 15",
  },
]

export type RallyEvent = {
  id: number
  title: string
  date: string
  time: string
  type: "Open Play" | "Clinic" | "Social" | "Tournament"
  spots: string
  description: string
}

export const events: RallyEvent[] = [
  {
    id: 1,
    title: "Saturday Open Play",
    date: "Every Saturday",
    time: "7:00 – 11:00 AM",
    type: "Open Play",
    spots: "Drop-in welcome",
    description:
      "All skill levels welcome. Rotate in, meet new partners, and play casual games across open courts.",
  },
  {
    id: 2,
    title: "Beginner's Clinic",
    date: "Jun 14, 2026",
    time: "5:30 – 7:00 PM",
    type: "Clinic",
    spots: "12 spots left",
    description:
      "Learn grips, serve basics, and court positioning with volunteer coaches. Paddles available on-site.",
  },
  {
    id: 3,
    title: "Sunset Social Rally",
    date: "Jun 21, 2026",
    time: "5:00 – 8:00 PM",
    type: "Social",
    spots: "Free for members",
    description:
      "Round-robin games followed by merienda at the pavilion. Bring a friend — newcomers get a free guest pass.",
  },
  {
    id: 4,
    title: "Alabang Summer Doubles",
    date: "Jul 5, 2026",
    time: "8:00 AM – 2:00 PM",
    type: "Tournament",
    spots: "Registration opens Jun 1",
    description:
      "Mixed doubles bracket for intermediate players. Local prizes, community vibes, and post-match lunch.",
  },
]

export const joinSteps = [
  {
    step: "01",
    title: "Sign up online",
    description: "Create a free Rally Point profile with your skill level and preferred play times.",
  },
  {
    step: "02",
    title: "Book a court or event",
    description: "Reserve covered courts during peak hours or RSVP to open play and clinics.",
  },
  {
    step: "03",
    title: "Show up & rally",
    description: "Check in at the pavilion desk, meet the community, and hit the courts.",
  },
] as const

export const rallyAmenities = [
  "Paddle rental & ball shop",
  "Covered pavilion seating",
  "Hydration station",
  "Locker cubbies",
  "Free parking",
  "Shower access (members)",
] as const
