export type Project = {
  title: string
  description: string
  tags: string[]
  status: "active" | "archived"
  links: { label: string; href: string }[]
  gradient: string
}

export const projects: Project[] = [
  {
    title: "ProductA.ai",
    description: "AI-powered platform that helps teams automate repetitive workflows. Built from 0 to seed funding in 8 months.",
    tags: ["AI", "SaaS", "Agents"],
    status: "active",
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
  },
  {
    title: "ProductB",
    description: "Full-stack web app for [describe what it does]. Built with Next.js, TypeScript, and deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Open Source"],
    status: "active",
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a0533] via-[#2d0a5e] to-[#1a0533]",
  },
  {
    title: "ProductC",
    description: "CLI tool for [describe purpose]. One command setup, works with any Node.js project.",
    tags: ["CLI", "Node.js", "Open Source"],
    status: "active",
    links: [
      { label: "npm", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#0a2a1a] via-[#0f4a2e] to-[#0a2a1a]",
  },
  {
    title: "AI Tool",
    description: "Web-based AI tool that [describe capability]. Free tier available, no signup required.",
    tags: ["AI", "LLM", "Productivity"],
    status: "active",
    links: [
      { label: "Visit", href: "#" },
    ],
    gradient: "from-[#1a1a0a] via-[#3a3a0f] to-[#1a1a0a]",
  },
  {
    title: "Old Project",
    description: "SaaS product for [describe]. Ran for 2 years, reached profitability. Shut down to focus on new ventures.",
    tags: ["SaaS", "Chrome Extension"],
    status: "active",
    links: [
      { label: "Archive", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
  },
  {
    title: "Side Project",
    description: "Experimental project exploring [topic]. Never shipped publicly but learned a lot about [skill].",
    tags: ["Personal", "Experiment"],
    status: "active",
    links: [
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
  },
]
