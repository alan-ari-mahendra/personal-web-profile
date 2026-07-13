import React from "react"
import { codeToHtml } from "shiki"

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={match.index} className="font-semibold text-ink">{match[2]}</strong>)
    } else {
      parts.push(
        <code key={match.index} className="bg-surface-2 text-ink px-1.5 py-0.5 rounded text-[0.85em] font-mono">
          {match[3]}
        </code>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) {
    parts.push(text.slice(last))
  }
  return parts
}

type Block =
  | { type: "code"; lang: string; code: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; text: string }

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = []
  const lines = content.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text"
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push({ type: "code", lang, code: codeLines.join("\n") })
      i++
      continue
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) })
      i++
      continue
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) })
      i++
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: "ul", items })
      continue
    }

    if (line.trim() === "") {
      i++
      continue
    }

    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("```")
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ") })
    }
  }

  return blocks
}

async function highlightCode(code: string, lang: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang,
      theme: "one-dark-pro",
    })
  } catch {
    // fallback for unknown languages
    return await codeToHtml(code, { lang: "text", theme: "one-dark-pro" })
  }
}

export async function BlogContentRenderer({ content }: { content: string }) {
  const blocks = parseBlocks(content)
  const rendered: React.ReactNode[] = []

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]

    if (block.type === "code") {
      const html = await highlightCode(block.code, block.lang)
      rendered.push(
        <div
          key={i}
          className="my-6 rounded-xl overflow-hidden text-xs font-mono leading-[1.7] [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:!bg-[#282c34]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    } else if (block.type === "h2") {
      rendered.push(
        <h2 key={i} className="text-xl font-bold text-ink tracking-[-0.02em] mt-10 mb-3 leading-[1.3]">
          {block.text}
        </h2>
      )
    } else if (block.type === "h3") {
      rendered.push(
        <h3 key={i} className="text-base font-semibold text-ink tracking-[-0.01em] mt-6 mb-2 leading-[1.4]">
          {block.text}
        </h3>
      )
    } else if (block.type === "ul") {
      rendered.push(
        <ul key={i} className="my-4 space-y-1.5 pl-5">
          {block.items.map((item, idx) => (
            <li key={idx} className="text-sm text-ink/80 leading-[1.7] list-disc marker:text-subtle">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      )
    } else if (block.type === "p") {
      rendered.push(
        <p key={i} className="text-sm text-ink/80 leading-[1.85] my-4">
          {parseInline(block.text)}
        </p>
      )
    }
  }

  return <div className="mt-8">{rendered}</div>
}
