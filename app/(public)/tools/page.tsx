import { prisma } from "@/lib/prisma"
import { ToolIcon } from "@/components/tool-icon"
import { Reveal } from "@/components/reveal"

export default async function ToolsPage() {
  const categories = await prisma.toolCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      tools: { orderBy: { order: "asc" } },
    },
  })

  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      <Reveal>
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-ink mb-2">
          Tools
        </h1>
        <p className="text-sm text-subtle mb-12">
          My current stack — the tools I reach for every day.
        </p>
      </Reveal>

      <div className="space-y-12">
        {categories.map((cat) => (
          <Reveal as="section" key={cat.id}>
            <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {cat.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5 hover:border-white/20 hover:shadow-[0_6px_18px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 transition-all duration-300 ease-snappy"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-black"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <ToolIcon icon={tool.icon} size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-mono font-semibold text-ink leading-none mb-0.5">
                      {tool.name}
                    </div>
                    <div className="text-xs text-subtle truncate">
                      {tool.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
