type Tool = {
  name: string
  description: string
  emoji: string
  bg: string
}

type Category = {
  label: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    label: "Dev Tools",
    tools: [
      { name: "Cursor", description: "AI-first code editor", emoji: "⌨️", bg: "#F3F4F6" },
      { name: "Warp", description: "Modern terminal", emoji: "🖥️", bg: "#F3F4F6" },
      { name: "Git", description: "Version control", emoji: "🌿", bg: "#F3F4F6" },
      { name: "GitHub", description: "Code hosting & CI", emoji: "🐙", bg: "#F3F4F6" },
      { name: "Linear", description: "Issue tracking", emoji: "📐", bg: "#F3F4F6" },
      { name: "Figma", description: "UI design & prototyping", emoji: "🎨", bg: "#F3F4F6" },
    ],
  },
  {
    label: "AI Tools",
    tools: [
      { name: "Claude", description: "Anthropic — my daily driver LLM", emoji: "🤖", bg: "#FEF3C7" },
      { name: "ChatGPT", description: "OpenAI GPT-4o", emoji: "💬", bg: "#DCFCE7" },
      { name: "Cursor AI", description: "In-editor AI pair programmer", emoji: "✨", bg: "#EDE9FE" },
      { name: "v0 by Vercel", description: "UI generation from prompts", emoji: "▲", bg: "#F0F9FF" },
      { name: "Perplexity", description: "AI-powered search", emoji: "🔍", bg: "#FFF7ED" },
    ],
  },
  {
    label: "Frameworks & Languages",
    tools: [
      { name: "Next.js", description: "React framework for production", emoji: "▲", bg: "#F3F4F6" },
      { name: "TypeScript", description: "Typed JavaScript at scale", emoji: "🔷", bg: "#EFF6FF" },
      { name: "Python", description: "AI/ML & backend scripting", emoji: "🐍", bg: "#DCFCE7" },
      { name: "FastAPI", description: "High-perf Python API framework", emoji: "⚡", bg: "#FEF9C3" },
      { name: "Tailwind CSS", description: "Utility-first CSS", emoji: "🎨", bg: "#F0FDFA" },
      { name: "Prisma", description: "Type-safe ORM for Node.js", emoji: "🗃️", bg: "#F3F4F6" },
    ],
  },
]

export default function ToolsPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-2">
        Tools
      </h1>
      <p className="text-sm text-[#6B7280] mb-12">
        My current stack — the tools I reach for every day.
      </p>

      <div className="space-y-12">
        {categories.map((cat) => (
          <section key={cat.label}>
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {cat.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5 hover:border-[#D1D5DB] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ backgroundColor: tool.bg }}
                  >
                    {tool.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#111111] leading-none mb-0.5">
                      {tool.name}
                    </div>
                    <div className="text-xs text-[#6B7280] truncate">
                      {tool.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
