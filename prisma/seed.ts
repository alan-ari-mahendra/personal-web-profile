import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { experiences } from "../lib/experiences"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const projects = [
  {
    title: "ProductA.ai",
    description: "AI-powered platform that helps teams automate repetitive workflows. Built from 0 to seed funding in 8 months.",
    tags: ["AI", "SaaS", "Agents"],
    status: "active" as const,
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
    thumbnail: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=800&q=80",
  },
  {
    title: "ProductB",
    description: "Full-stack web app for [describe what it does]. Built with Next.js, TypeScript, and deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Open Source"],
    status: "active" as const,
    links: [
      { label: "Visit", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a0533] via-[#2d0a5e] to-[#1a0533]",
    thumbnail: "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=800&q=80",
  },
  {
    title: "ProductC",
    description: "CLI tool for [describe purpose]. One command setup, works with any Node.js project.",
    tags: ["CLI", "Node.js", "Open Source"],
    status: "active" as const,
    links: [
      { label: "npm", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#0a2a1a] via-[#0f4a2e] to-[#0a2a1a]",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
  },
  {
    title: "AI Tool",
    description: "Web-based AI tool that [describe capability]. Free tier available, no signup required.",
    tags: ["AI", "LLM", "Productivity"],
    status: "active" as const,
    links: [
      { label: "Visit", href: "#" },
    ],
    gradient: "from-[#1a1a0a] via-[#3a3a0f] to-[#1a1a0a]",
    thumbnail: "https://plus.unsplash.com/premium_photo-1764695595385-ed92175c3857?w=800&q=80",
  },
  {
    title: "Old Project",
    description: "SaaS product for [describe]. Ran for 2 years, reached profitability. Shut down to focus on new ventures.",
    tags: ["SaaS", "Chrome Extension"],
    status: "active" as const,
    links: [
      { label: "Archive", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    thumbnail: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=800&q=80",
  },
  {
    title: "Side Project",
    description: "Experimental project exploring [topic]. Never shipped publicly but learned a lot about [skill].",
    tags: ["Personal", "Experiment"],
    status: "active" as const,
    links: [
      { label: "GitHub", href: "#" },
    ],
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661434779070-cf8fc0e253ab?w=800&q=80",
  },
]

const blogs = [
  {
    title: "Building AI Agents That Actually Work in Production",
    description: "Most AI agent demos look great until they hit real data. Here's what I learned shipping agents at scale — retry logic, fallbacks, and knowing when to punt to a human.",
    tags: ["AI", "Agents", "Production"],
    date: "2025-11-20",
    readingTime: "8 min read",
    slug: "building-ai-agents-production",
    gradient: "from-[#0f172a] via-[#1e3a5f] to-[#0f172a]",
    published: true,
    thumbnail: "https://images.unsplash.com/photo-1591267990439-bc68529677c3?w=800&q=80",
    content: `## The Demo Problem

Every AI agent demo I've seen looks flawless. Clean inputs, predictable outputs, no edge cases. Then you ship it and reality hits: malformed JSON from the LLM, tool calls that timeout, users who type things nobody anticipated.

I've shipped three agent systems to production in the last year. Here's what actually matters.

## Retry Logic Is Not Optional

Your LLM will occasionally return garbage. Not because of a bug — because probabilistic models produce probabilistic outputs. Build retries in from day one.

\`\`\`typescript
async function callWithRetry(prompt: string, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const result = await llm.call(prompt)
      if (isValidOutput(result)) return result
    } catch (e) {
      if (attempt === maxAttempts - 1) throw e
      await sleep(1000 * Math.pow(2, attempt))
    }
  }
}
\`\`\`

The exponential backoff matters. Hammering a rate-limited API three times in 100ms accomplishes nothing.

## Validate Everything

Don't trust the model's output. Parse it. Schema-validate it. Reject it if it doesn't match what you expect and retry.

\`\`\`typescript
import { z } from "zod"

const AgentOutput = z.object({
  action: z.enum(["search", "summarize", "answer"]),
  confidence: z.number().min(0).max(1),
  result: z.string(),
})
\`\`\`

If the model can't produce valid output after 3 attempts, fall back gracefully. Show the user a "I couldn't complete that" message rather than crashing.

## Know When to Punt

This is the hardest lesson. Not every task should be handled autonomously. Build explicit "escalate to human" paths for:

- Confidence below your threshold
- Tool calls that would affect irreversible state (send email, charge card, delete data)
- Any ambiguity in user intent that context doesn't resolve

An agent that knows its limits is infinitely more valuable than one that confidently produces wrong answers.

## Observability From Day One

Log every LLM call: prompt, response, latency, token count. You'll need this when something goes wrong at 2am. I use a simple wrapper that writes to a structured log:

\`\`\`typescript
{
  ts: "2025-11-15T14:22:01Z",
  model: "claude-3-5-sonnet",
  prompt_tokens: 847,
  completion_tokens: 312,
  latency_ms: 1840,
  success: true,
  retry_count: 0
}
\`\`\`

## The Actual Lesson

AI agents aren't magic — they're distributed systems with a probabilistic component. Apply the same engineering discipline you'd apply to any unreliable external service: retries, validation, fallbacks, observability.

The demos make it look easy. The engineering is where the real work is.`,
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
    thumbnail: "https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?w=800&q=80",
    content: `## Redux Isn't Bad. It's Just Heavy.

I used Redux for 4 years across 6 production apps. It's predictable, debuggable, and the DevTools are genuinely excellent. But every time I start a new project, I don't reach for it anymore.

Here's why — and what I use instead.

## The Boilerplate Tax

A basic Redux setup for a feature requires: an action type constant, an action creator, a reducer case, a selector, a mapStateToProps, and a useDispatch call. For a shopping cart. Six files touched to add one piece of state.

Redux Toolkit helped significantly. But even with RTK, you're still writing more than you need to.

## What I Migrated To

### Zustand for Global UI State

For state that's genuinely global — current user, theme, modal visibility — Zustand is the answer.

\`\`\`typescript
const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  theme: "light",
  toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
}))
\`\`\`

That's it. No actions. No reducers. No selectors. Just state and functions that update it. The bundle is 1.1kb.

### TanStack Query for Server State

This was the bigger unlock. Most of what I was putting in Redux was server state — data fetched from an API. Redux handles that awkwardly. TanStack Query handles it brilliantly:

\`\`\`typescript
const { data: user, isLoading } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,
})
\`\`\`

Caching, background refetching, loading states, error states — all built in. I deleted ~40% of my Redux store the day I migrated.

### Jotai for Local-ish State

When state is shared between a few components but not globally, Jotai's atom model is perfect. No Provider ceremony, just atoms:

\`\`\`typescript
const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

## When I'd Still Use Redux

Large teams where the strict action/reducer pattern prevents accidental state mutations. Apps with complex cross-cutting state logic where time-travel debugging actually matters. That's a narrow slice.

## The Rule I Now Follow

- Server data: TanStack Query
- Global UI state: Zustand
- Component-level shared state: Jotai or React Context
- Local component state: useState

Redux doesn't appear on that list. Not because it's bad — but because each of the above tools does its specific job better.`,
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
    thumbnail: "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?w=800&q=80",
    content: `## We Did the Migration. Here's the Honest Take.

Six months ago we migrated a 40k-line Next.js codebase from Pages Router to App Router. This is not a tutorial. It's a retrospective — what's genuinely better, what burned us, and what we'd do differently.

## What's Actually Better

### Layouts That Don't Re-Render

The single biggest win. With Pages Router, layouts re-rendered on every navigation. With App Router, nested layouts persist. No more flash of unstyled sidebar. No more scroll position resets.

### Colocation

Data fetching lives next to the component that uses it. No more hunting through getServerSideProps then component then prop drilling chain. Server Components changed how I think about data flow.

### Streaming

Complex pages that previously blocked on slow data fetches now stream. Wrap the slow part in Suspense and ship a skeleton instantly. Users perceive the app as faster even when the data takes the same time.

## The Footguns

### "use client" Boundary Confusion

This was the biggest source of bugs. Developers would add "use client" to a component and not realize it opted out the entire subtree from server rendering. We now have a lint rule: any "use client" addition requires a code review comment explaining why.

### Caching Behavior

The App Router's default caching is aggressive. Fetches are cached by default. Cookies aren't included by default. We spent two weeks debugging why authenticated data was being served to the wrong users before we understood the caching semantics fully.

\`\`\`typescript
// Cached by default — probably wrong for auth data
const data = await fetch("/api/user")

// Opt out of caching
const data = await fetch("/api/user", { cache: "no-store" })
\`\`\`

### Third-Party Libraries

A meaningful percentage of popular React libraries assume Client Components. Some don't work in Server Components at all. Audit your dependencies before migrating — not after.

## What We'd Do Differently

Migrate incrementally. App Router and Pages Router can coexist in the same project. We tried to do it all at once, which created a 3-week period where the app was partially broken. Route by route is slower but saner.

Write migration tests first. For each route, document its current behavior (response shape, auth requirements, caching semantics) before touching it. Run those assertions post-migration.

## Bottom Line

App Router is the right direction. The mental model is better. The performance primitives are better. The developer experience — once you understand the caching model — is better.

But it's a paradigm shift, not an upgrade. Budget accordingly.`,
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
    thumbnail: "https://images.unsplash.com/photo-1670057037226-b3d65909424f?w=800&q=80",
    content: `## The Prompt Is Code

I've watched three startups break production because someone edited a prompt directly in the database at 11pm to "just fix a small thing." Prompts are strings. Strings feel casual. That's the trap.

Prompts are code. They need version control, tests, review, and rollback strategies.

## Version Control Your Prompts

Store prompts in your repo, not in a database or env var. Every change gets a diff, a commit message, and a reviewer.

\`\`\`
prompts/
  summarize-article/
    v1.txt
    v2.txt
    changelog.md
  extract-entities/
    v1.txt
\`\`\`

The changelog matters more than you think. "Why did we add this sentence to the prompt?" is a question you'll ask six months from now.

## Test Your Prompts

A prompt change that improves one case can regress five others. Build a test suite of input/expected-output pairs and run it before merging.

\`\`\`typescript
const cases = [
  { input: "Apple released iPhone 17", expected: ["Apple", "iPhone 17"] },
  { input: "Elon Musk tweeted about Tesla", expected: ["Elon Musk", "Tesla"] },
]

for (const { input, expected } of cases) {
  const result = await extractEntities(input)
  assert.deepEqual(result.sort(), expected.sort())
}
\`\`\`

LLMs are non-deterministic, so set temperature to 0 for tests and run each case 3 times to catch flaky behavior.

## Feature Flags for Prompts

Don't ship a new prompt to 100% of users immediately. Treat it like a feature flag:

- Ship to 5% of traffic
- Compare output quality metrics
- Ramp if metrics hold
- Rollback immediately if they don't

You need this infrastructure before you need it. The middle of an incident is the wrong time to build rollback tooling.

## The Metrics That Matter

What does "better" mean for your prompt? Define it before you start iterating:

- Accuracy: Does the output match a golden set?
- Format compliance: Is the JSON valid? Does it have all required fields?
- Latency: Did the new prompt add 500ms to every request?
- Cost: Longer prompts = more tokens = higher bills

I track all four for every prompt change. Usually there are tradeoffs — a more accurate prompt might cost 30% more. Making that tradeoff consciously is engineering. Making it accidentally is how you get surprised by your API bill.

## The Mindset Shift

Prompts feel like writing. They're actually configuration — configuration that controls a complex stochastic system. Treat them with the same rigor you'd apply to infrastructure config: review, test, version, monitor.

The teams that do this ship better AI products and sleep better.`,
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
    thumbnail: "https://images.unsplash.com/photo-1533901567451-7a6e68d6cd8f?w=800&q=80",
    content: `## The Lie I Believed

I thought building a startup was mostly building. Write code, ship features, iterate fast. That's what the Twitter threads say. That's what the YC application tips imply.

It's mostly not true. Here's what I actually spent time on, month by month.

## Month 1-2: The Prototyping Phase (70% Code, 30% Talking)

I built a working prototype in 6 weeks. This is the phase that looks most like what I expected — actual engineering.

But the 30% talking was more valuable than the 70% coding. I did 40 user interviews in 8 weeks. Not "can I show you something?" demos — genuine conversations about how people currently solve the problem I wanted to address. What I heard in those conversations shaped the product more than any technical decision.

The mistake I almost made: building the "obviously right" version of the product based on my intuition. What users actually wanted was different in three important ways from what I assumed.

## Month 3-4: First Revenue (30% Code, 70% Distribution)

Getting the first 10 paying customers took 3x longer than building the product. I tried:

- Cold outreach (1% conversion)
- Twitter/X posts (2 customers, 1 cancelled)
- Posting in relevant Slack communities (best ROI)
- Founder network referrals (highest quality customers)

The lesson: distribution is a product you build in parallel. I should have started building distribution channels in month 1, not month 3.

## Month 5-6: Scaling (20% Code, 50% Sales, 30% Operations)

At this point I was mostly on calls. Investor calls. Customer calls. Prospective customer calls. This was the most uncomfortable phase — I'm an engineer, not a salesperson.

The mental model that helped: sales is just user research with a transaction at the end. You're learning what people need, demonstrating how you solve it, and letting them decide. When I reframed it that way, the calls got easier.

## The Seed Round

We closed seed funding 8 months after the first commit. Here's what actually mattered to investors:

- Revenue trajectory, not absolute numbers. Growing from $500/month to $8k/month in 4 months matters more than $8k ARR.
- Retention. We had 94% monthly retention. That single metric opened more conversations than anything else.
- Why us. Not "why this market" — why are we the people to win it? This took me weeks to articulate clearly.

## What I'd Tell Month-1 Me

Start talking to users on day 1, not after you have something to show. Your intuition about what to build is probably 60% right. User conversations get you to 90%.

Build distribution before you need it. The best time to grow a Twitter following, a newsletter, or a community is before you're trying to sell something.

Hire for your weaknesses early. I'm a builder. I needed a seller. I waited 6 months too long to acknowledge that.

## The Honest Part

It was harder than I expected and more rewarding than I expected in equal measure. The variance on both sides is higher than any job I've had. Some weeks felt like everything was working. Some weeks felt like I was building something nobody wanted.

Both feelings were useful data.`,
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
    thumbnail: "https://images.unsplash.com/photo-1724166551426-77aa7328d053?w=800&q=80",
    content: `## Beyond Generics

Most TypeScript tutorials teach generics, utility types, and basic interfaces. That's the foundation. What I wish I'd learned earlier are the patterns that make large codebases provably correct — where the type system does the work instead of runtime checks.

## Discriminated Unions

The most underused pattern in TypeScript. Instead of optional fields that may or may not be present:

\`\`\`typescript
// Bad: optional fields make every consumer defensive
type Result = {
  data?: User
  error?: string
  loading?: boolean
}

// Good: discriminated union — compiler knows which case you're in
type Result =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string }
\`\`\`

With the discriminated union, TypeScript narrows the type inside each branch. No undefined checks needed.

\`\`\`typescript
function render(result: Result) {
  if (result.status === "success") {
    return result.data.name // TypeScript knows data exists here
  }
}
\`\`\`

## Template Literal Types

Combine string literals to express constrained string formats at the type level:

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`
// Valid: "onClick", "onChange", "onSubmit"
// Invalid: "click", "handleClick"

type RouteKey = \`/\${string}\`
// Ensures all route strings start with /
\`\`\`

I use this for API endpoint types, event names, and CSS custom property names. Catches typos at compile time instead of runtime.

## Branded Types

Prevent mixing semantically different values that have the same underlying type:

\`\`\`typescript
type UserId = string & { readonly __brand: "UserId" }
type PostId = string & { readonly __brand: "PostId" }

function createUserId(id: string): UserId {
  return id as UserId
}

function getPost(userId: UserId, postId: PostId) { }

// Fails at compile time — no more mixed-up ID arguments:
getPost(postId, userId) // Error: PostId not assignable to UserId
\`\`\`

Before branded types, mixing up IDs in the wrong argument position was a runtime bug. Now it's a compile error.

## The satisfies Operator

TypeScript 4.9 added satisfies — one of my favorite additions. It validates that a value matches a type without widening it:

\`\`\`typescript
type Config = Record<string, string | number>

// With "as": type is Config — you lose the specific keys
const config = {
  timeout: 5000,
  host: "localhost",
} as Config

// With "satisfies": type is { timeout: number, host: string }
const config = {
  timeout: 5000,
  host: "localhost",
} satisfies Config

config.timeout.toFixed() // Works — TypeScript knows it's a number, not string | number
\`\`\`

## Const Assertions

Prevent TypeScript from widening literal types:

\`\`\`typescript
// Without: type is string[]
const routes = ["/home", "/about", "/contact"]

// With: type is readonly ["/home", "/about", "/contact"]
const routes = ["/home", "/about", "/contact"] as const

type Route = typeof routes[number] // "/home" | "/about" | "/contact"
\`\`\`

Now you have a type automatically kept in sync with your array. No manual union type to maintain.

## The Underlying Principle

Each of these patterns moves validation from runtime to compile time. Runtime errors are caught in production. Compile errors are caught in your editor.

The goal is to make illegal states unrepresentable — to design your types so that code producing invalid state simply doesn't compile. That's where TypeScript earns its reputation.`,
  },
]

const toolCategories = [
  {
    label: "Dev Tools",
    order: 0,
    tools: [
      { name: "Cursor", description: "AI-first code editor", icon: "lucide:code-2", bg: "#F3F4F6", order: 0 },
      { name: "Warp", description: "Modern terminal", icon: "lucide:terminal", bg: "#F3F4F6", order: 1 },
      { name: "Git", description: "Version control", icon: "si:git", bg: "#F9EDE8", order: 2 },
      { name: "GitHub", description: "Code hosting & CI", icon: "si:github", bg: "#F3F4F6", order: 3 },
      { name: "Linear", description: "Issue tracking", icon: "si:linear", bg: "#F3F4F6", order: 4 },
      { name: "Figma", description: "UI design & prototyping", icon: "si:figma", bg: "#F3F4F6", order: 5 },
    ],
  },
  {
    label: "AI Tools",
    order: 1,
    tools: [
      { name: "Claude", description: "Anthropic — my daily driver LLM", icon: "si:anthropic", bg: "#FEF3C7", order: 0 },
      { name: "ChatGPT", description: "OpenAI GPT-4o", icon: "lucide:bot", bg: "#F3F4F6", order: 1 },
      { name: "Cursor AI", description: "In-editor AI pair programmer", icon: "lucide:sparkles", bg: "#EDE9FE", order: 2 },
      { name: "v0 by Vercel", description: "UI generation from prompts", icon: "si:vercel", bg: "#F3F4F6", order: 3 },
      { name: "Perplexity", description: "AI-powered search", icon: "si:perplexity", bg: "#F0F9FF", order: 4 },
    ],
  },
  {
    label: "Frameworks & Languages",
    order: 2,
    tools: [
      { name: "Next.js", description: "React framework for production", icon: "si:nextdotjs", bg: "#F3F4F6", order: 0 },
      { name: "TypeScript", description: "Typed JavaScript at scale", icon: "si:typescript", bg: "#EFF6FF", order: 1 },
      { name: "Python", description: "AI/ML & backend scripting", icon: "si:python", bg: "#EEFBF0", order: 2 },
      { name: "FastAPI", description: "High-perf Python API framework", icon: "si:fastapi", bg: "#EDFAF6", order: 3 },
      { name: "Tailwind CSS", description: "Utility-first CSS", icon: "si:tailwindcss", bg: "#F0FDFA", order: 4 },
      { name: "Prisma", description: "Type-safe ORM for Node.js", icon: "si:prisma", bg: "#F3F4F6", order: 5 },
    ],
  },
]

async function main() {
  console.log("Seeding projects...")
  for (const project of projects) {
    const existing = await prisma.project.findFirst({ where: { title: project.title } })
    await prisma.project.upsert({
      where: { id: existing?.id ?? "" },
      update: {
        description: project.description,
        tags: project.tags,
        status: project.status,
        links: project.links,
        gradient: project.gradient,
        thumbnail: project.thumbnail,
      },
      create: {
        title: project.title,
        description: project.description,
        tags: project.tags,
        status: project.status,
        links: project.links,
        gradient: project.gradient,
        thumbnail: project.thumbnail,
      },
    })
  }

  console.log("Seeding blogs...")
  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        description: blog.description,
        tags: blog.tags,
        date: new Date(blog.date),
        readingTime: blog.readingTime,
        gradient: blog.gradient,
        published: blog.published,
        thumbnail: blog.thumbnail,
        content: blog.content,
      },
      create: {
        title: blog.title,
        description: blog.description,
        tags: blog.tags,
        date: new Date(blog.date),
        readingTime: blog.readingTime,
        slug: blog.slug,
        gradient: blog.gradient,
        published: blog.published,
        thumbnail: blog.thumbnail,
        content: blog.content,
      },
    })
  }

  console.log("Seeding experiences...")
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i]
    const existing = await prisma.experience.findFirst({ where: { role: exp.role, company: exp.company } })
    await prisma.experience.upsert({
      where: { id: existing?.id ?? "" },
      update: {
        period: exp.period,
        bullets: exp.bullets,
        tags: exp.tags,
        order: i,
      },
      create: {
        period: exp.period,
        role: exp.role,
        company: exp.company,
        bullets: exp.bullets,
        tags: exp.tags,
        order: i,
      },
    })
  }

  console.log("Seeding tool categories and tools...")
  for (const cat of toolCategories) {
    const existing = await prisma.toolCategory.findFirst({ where: { label: cat.label } })
    const category = await prisma.toolCategory.upsert({
      where: { id: existing?.id ?? "" },
      update: { label: cat.label, order: cat.order },
      create: { label: cat.label, order: cat.order },
    })
    for (const tool of cat.tools) {
      const existingTool = await prisma.tool.findFirst({
        where: { name: tool.name, categoryId: category.id },
      })
      await prisma.tool.upsert({
        where: { id: existingTool?.id ?? "" },
        update: {
          description: tool.description,
          icon: tool.icon,
          bg: tool.bg,
          order: tool.order,
        },
        create: {
          name: tool.name,
          description: tool.description,
          icon: tool.icon,
          bg: tool.bg,
          order: tool.order,
          categoryId: category.id,
        },
      })
    }
  }

  console.log("Seeding social links...")
  const socialLinkData = [
    { label: "X.com",     url: "#", iconType: "LUCIDE" as const, iconValue: "X",        order: 0 },
    { label: "LinkedIn",  url: "#", iconType: "LUCIDE" as const, iconValue: "Link",     order: 1 },
    { label: "GitHub",    url: "#", iconType: "LUCIDE" as const, iconValue: "GitFork",  order: 2 },
    { label: "Medium",    url: "#", iconType: "LUCIDE" as const, iconValue: "BookOpen", order: 3 },
    { label: "Instagram", url: "#", iconType: "LUCIDE" as const, iconValue: "Camera",   order: 4 },
  ]
  for (const link of socialLinkData) {
    const existing = await prisma.socialLink.findFirst({ where: { label: link.label } })
    await prisma.socialLink.upsert({
      where: { id: existing?.id ?? "" },
      update: { url: link.url, iconType: link.iconType, iconValue: link.iconValue, order: link.order },
      create: link,
    })
  }

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
