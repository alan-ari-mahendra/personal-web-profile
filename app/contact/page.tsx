import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"

export default function ContactPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-2">
        Contact
      </h1>
      <p className="text-sm text-[#6B7280] mb-10">
        Got an idea, a question, or just want to say hi — I&apos;m always happy to chat.
      </p>

      {/* Social links */}
      <SocialLinks
        className="flex flex-wrap gap-2 mb-10"
        itemClassName="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-white text-sm font-medium text-[#111111] hover:border-[#D1D5DB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 text-[#374151]"
      />

      <hr className="border-[#E5E7EB] mb-10" />

      {/* Form section */}
      <div className="max-w-[560px]">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Send a message
        </h2>
        <ContactForm />
      </div>
    </div>
  )
}
