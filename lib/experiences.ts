export type Experience = {
  period: string
  role: string
  company: string
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    period: "Sep 2025 – May 2026",
    role: "Lead Developer",
    company: "Bratamedia · Full-time · Indonesia, On-site",
    bullets: [
      "Brata Media is a digital agency founded over 10 years ago, serving clients across various industries.",
      "Led end-to-end development of client web products using Laravel and React.js.",
      "Coordinated with design and product teams to deliver scalable digital solutions.",
    ],
    tags: ["Laravel", "React.js", "PHP", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "MySQL"],
  },
  {
    period: "May 2024 – Dec 2025",
    role: "Freelance Developer",
    company: "Upwork · Full-time · Remote",
    bullets: [
      "Delivered full-stack web projects for international clients across SaaS, CRM, LMS, and e-commerce domains.",
      "Worked asynchronously with distributed teams across AEST, SGT, and CET time zones.",
      "Built production-ready applications from scratch — architecture, backend, and deployed UI.",
    ],
    tags: ["React.js", "Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Laravel", "Tailwind CSS"],
  },
  {
    period: "Jan 2023 – Apr 2024",
    role: "Junior Software Engineer (Internship)",
    company: "Nine Dragon Labs · Full-time · On-site",
    bullets: [
      "Ninedragonlabs is a software development company founded 5 years ago, serving clients across more than 5 countries worldwide.",
      "Assisted in the development of client websites and internal tools using Laravel and jQuery.",
      "Maintained and debugged existing legacy code, significantly reducing technical debt and system downtime.",
      "Learned foundational backend logic, templating, and version control within agile sprint-based workflows.",
    ],
    tags: ["JavaScript", "React.js", "Laravel", "jQuery", "PHP", "Git"],
  },
]
