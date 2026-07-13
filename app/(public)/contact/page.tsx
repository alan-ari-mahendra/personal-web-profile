import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import { Reveal } from "@/components/reveal"

export default function ContactPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <Reveal>
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-ink mb-2">
          Contact
        </h1>
        <p className="text-sm text-subtle mb-10">
          Got an idea, a question, or just want to say hi — I&apos;m always happy to chat.
        </p>
      </Reveal>

      {/* Social links */}
      <Reveal delay={0.05}>
        <SocialLinks
          className="flex flex-wrap gap-2 mb-10"
          itemClassName="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:border-white/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.24)] transition-all duration-200"
        />
      </Reveal>

      <hr className="border-line mb-10" />

      {/* Form section */}
      <Reveal delay={0.1} className="max-w-[560px]">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Send a message
        </h2>
        <ContactForm />
      </Reveal>
    </div>
  )
}
