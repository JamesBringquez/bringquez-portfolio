export type ArkeMilestone = {
  year: string
  title: string
  description: string
}

export type ArkeValue = {
  title: string
  description: string
}

export const arkeHistory = {
  tagline: "Built from a sketchbook, shaped by everyday wear.",
  intro:
    "ARKĒ began as a personal answer to a simple frustration: streetwear that looked premium in photos but fell apart in real rotation. What started as late-night sketches and fabric swatches on a desk grew into a full label — one built around restraint, structure, and a signature holographic accent that only appears when the light hits just right.",
  nameOrigin:
    "The name ARKĒ draws from the idea of an ark — something that carries essentials forward. The macron over the E is deliberate: a mark of precision in a brand that treats every seam, hem, and proportion as part of the story.",
  milestones: [
    {
      year: "2024",
      title: "The first notebook",
      description:
        "ARKĒ started as a side project — rough logo explorations, mood boards pinned to a wall, and a short list of pieces that felt missing from daily wardrobes: clean tees that held shape, cargos with real structure, outerwear that worked in tropical evenings without looking casual-sloppy.",
    },
    {
      year: "2025",
      title: "Identity takes form",
      description:
        "The black-and-white foundation locked in. Holographic accents became the signature — not loud graphics, but controlled light on select surfaces. Sample runs began for the Essential Tee and Structured Cargo, with fit tested across months of real wear before anything went near a storefront.",
    },
    {
      year: "Early 2026",
      title: "The storefront opens",
      description:
        "ARKĒ Clothing Co. launched online with a curated first drop: six core pieces spanning tops, bottoms, outerwear, and accessories. Category filtering, a shopping bag, and responsive layouts were built to feel like a real store — because for ARKĒ, the digital experience is part of the brand, not an afterthought.",
    },
    {
      year: "2026",
      title: "Spring / Summer collection",
      description:
        "The current season expands the rotation with the Holo Signature Hoodie and Pearl Windbreaker — statement pieces that share the same quiet DNA as the essentials. Free shipping over ₱5,000, straightforward returns, and sizing guidance reflect how ARKĒ wants people to shop: confidently, without friction.",
    },
  ] satisfies ArkeMilestone[],
  philosophy: [
    {
      title: "Neutral first",
      description:
        "Pearl white and black anchor every piece. Color lives in texture, cut, and the holo finish — not in trends that expire after one season.",
    },
    {
      title: "Fit always",
      description:
        "Modern proportions with room to move. Pieces are cut for layering, commuting, and long days — sharp without feeling stiff.",
    },
    {
      title: "Two marks, one system",
      description:
        "The stealth ARKĒ mark lives on black fabric only — tonal gray letters that reveal holo accents in motion. On white and pearl pieces, the light mark takes over: crisp black letterforms with the same holographic A-stem and E-bar.",
    },
    {
      title: "Designed to repeat",
      description:
        "Every item is meant for rotation, not one-time wear. ARKĒ builds wardrobes, not hauls.",
    },
  ] satisfies ArkeValue[],
  closing:
    "ARKĒ is still young — a planned label moving from concept to collection. The store you are browsing is a living demo of that vision: elevated everyday streetwear with a point of view, built for the in-between moments that make up most of life.",
}
