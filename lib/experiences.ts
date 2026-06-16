export type Experience = {
  period: string
  role: string
  company: string
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    period: "Sep 2022 – Apr 2024",
    role: "Lead Programmer",
    company: "Nine Dragon Labs",
    bullets: [
      "Led full-stack development for clients across 5+ countries worldwide.",
      "Managed a cross-functional team covering front-end, back-end, UI/UX, and blockchain.",
      "Delivered smart contract solutions and technology consulting for growing companies.",
    ],
    tags: ["React", "TypeScript", "Node.js", "Blockchain", "Smart Contracts", "UI/UX"],
  },
  {
    period: "May 2020 – Jul 2022",
    role: "Senior Software Engineer",
    company: "PT Nifty Teknologi Edukasi",
    bullets: [
      "Built Nifty Educate — a learning platform for preschool, kindergarten, and early elementary children.",
      "Collaborated with a team of 10+ across Creative, Education, and Business Development.",
      "Designed interactive learning-by-doing experiences to stimulate multiple types of children's intelligence.",
    ],
    tags: ["React", "Next.js", "TypeScript", "EdTech"],
  },
  {
    period: "Jan 2018 – Apr 2020",
    role: "Junior Software Engineer",
    company: "Bratamedia",
    bullets: [
      "Developed digital products for agency clients across various industries.",
      "Contributed to web design and development projects at a 10-year-old digital agency.",
    ],
    tags: ["JavaScript", "HTML", "CSS", "PHP"],
  },
]
