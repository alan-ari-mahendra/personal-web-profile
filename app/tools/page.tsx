import { prisma } from "@/lib/prisma"
import { ToolIcon } from "@/components/tool-icon"

export default async function ToolsPage() {
  const categories = await prisma.toolCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      tools: { orderBy: { order: "asc" } },
    },
  })

  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-2">
        Tools
      </h1>
      <p className="text-sm text-[#6B7280] mb-12">
        My current stack — the tools I reach for every day.
      </p>

      <div className="space-y-12">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {cat.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5 hover:border-[#D1D5DB] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <ToolIcon icon={tool.icon} size={18} />
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
