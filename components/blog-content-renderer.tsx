import React from "react"

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  // Match **bold**, `inline code`
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={match.index} className="font-semibold text-[#111111]">{match[2]}</strong>)
    } else {
      parts.push(
        <code key={match.index} className="bg-[#F3F4F6] text-[#111111] px-1.5 py-0.5 rounded text-[0.85em] font-mono">
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

export function BlogContentRenderer({ content }: { content: string }) {
  const blocks: React.ReactNode[] = []
  const lines = content.split("\n")
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.startsWith("```")) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push(
        <pre key={key++} className="bg-[#0f172a] text-[#e2e8f0] rounded-xl p-5 overflow-x-auto text-xs font-mono leading-[1.7] my-6">
          <code>{codeLines.join("\n")}</code>
        </pre>
      )
      i++ // skip closing ```
      continue
    }

    // h2
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="text-xl font-bold text-[#111111] tracking-[-0.02em] mt-10 mb-3 leading-[1.3]">
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // h3
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="text-base font-semibold text-[#111111] tracking-[-0.01em] mt-6 mb-2 leading-[1.4]">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // List block — collect consecutive list items
    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push(
        <ul key={key++} className="my-4 space-y-1.5 pl-5">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm text-[#374151] leading-[1.7] list-disc marker:text-[#9CA3AF]">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Blank line — skip
    if (line.trim() === "") {
      i++
      continue
    }

    // Paragraph — collect consecutive non-special lines
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
      blocks.push(
        <p key={key++} className="text-sm text-[#374151] leading-[1.85] my-4">
          {parseInline(paraLines.join(" "))}
        </p>
      )
    }
  }

  return <div className="mt-8">{blocks}</div>
}
