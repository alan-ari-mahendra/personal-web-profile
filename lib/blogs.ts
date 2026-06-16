export type Blog = {
  title: string
  description: string
  tags: string[]
  date: string
  readingTime: string
  slug: string
  gradient: string
  published: boolean
}

export const blogs: Blog[] = [
  {
    title: "Building AI Agents That Actually Work in Production",
    description: "Most AI agent demos look great until they hit real data. Here's what I learned shipping agents at scale — retry logic, fallbacks, and knowing when to punt to a human.",
    tags: ["AI", "Agents", "Production"],
    date: "2025-11-20",
    readingTime: "8 min read",
    slug: "building-ai-agents-production",
    gradient: "from-[#0f172a] via-[#1e3a5f] to-[#0f172a]",
    published: true,
  },
  {
    title: "Why I Stopped Using Redux (And What I Use Instead)",
    description: "Redux is powerful but it's also 200 lines of boilerplate for a shopping cart. A pragmatic look at Zustand, Jotai, and server state after 3 production migrations.",
    tags: ["React", "State Management", "Frontend"],
    date: "2025-09-05",
    readingTime: "6 min read",
    slug: "stopped-using-redux",
    gradient: "from-[#1a0533] via-[#2d0a5e] to-[#1a0533]",
    published: true,
  },
  {
    title: "Next.js App Router: 6 Months In",
    description: "Honest retrospective on migrating a 40k-line codebase from Pages Router to App Router. What's genuinely better, what's a footgun, and what we'd do differently.",
    tags: ["Next.js", "TypeScript", "Lessons"],
    date: "2025-07-12",
    readingTime: "10 min read",
    slug: "nextjs-app-router-6-months",
    gradient: "from-[#0a2a1a] via-[#0f4a2e] to-[#0a2a1a]",
    published: true,
  },
  {
    title: "Prompt Engineering Is Still Engineering",
    description: "Treating prompts as throwaway strings is how you end up with a broken product at 3am. Version control, testing, and rollback strategies for LLM prompts.",
    tags: ["LLM", "Prompt Engineering", "AI"],
    date: "2025-05-28",
    readingTime: "7 min read",
    slug: "prompt-engineering-is-still-engineering",
    gradient: "from-[#1a1a0a] via-[#3a3a0f] to-[#1a1a0a]",
    published: true,
  },
  {
    title: "From 0 to Seed: What I Actually Spent Time On",
    description: "A month-by-month breakdown of building ProductA.ai from first commit to seed round. Spoiler: it wasn't coding. Distribution, user interviews, and founder therapy.",
    tags: ["Startup", "Indie Hacking", "SaaS"],
    date: "2025-03-14",
    readingTime: "12 min read",
    slug: "zero-to-seed",
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    published: true,
  },
  {
    title: "TypeScript Patterns I Wish I Knew Earlier",
    description: "Not generics 101. The patterns that actually matter in large codebases — discriminated unions, template literal types, branded types, and satisfies.",
    tags: ["TypeScript", "Patterns", "Developer Experience"],
    date: "2025-01-08",
    readingTime: "9 min read",
    slug: "typescript-patterns",
    gradient: "from-[#0f1a2e] via-[#1a2a4a] to-[#0f1a2e]",
    published: true,
  },
]
