import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function Home() {
  return (
    <>
      <div className="relative px-14 pt-28 max-w-[920px] w-full mx-auto md:px-14 max-md:px-7 max-sm:px-5">
        <BackgroundBeamsWithCollision className="absolute inset-0 bg-transparent">
          <span></span>
        </BackgroundBeamsWithCollision>
        {/* Hero */}

        <h1 className="text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-[#111111] mb-1.5 flex items-center gap-2.5 flex-wrap max-md:text-4xl">
          <PointerHighlight
            rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10 pr-1">Hey, I&apos;m Alan </span>
          </PointerHighlight>
        </h1>
        <h2 className="text-3xl font-normal text-[#6B7280] tracking-[-0.01em] mb-[30px]">
          AI Engineer
        </h2>

        {/* X Widget */}
        <div className="flex flex-row group justify-between items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md active:shadow-inner transition-all duration-300 group w-full px-4 py-3 mb-8 max-w-[920px]">
          <div className="flex items-center gap-2.5 text-sm font-medium text-[#111111]">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            Connect with me on X
          </div>
          <button className="bg-[#111111] text-white text-sm font-semibold px-4 py-1 rounded-xl cursor-pointer flex-shrink-0 group-hover:scale-105 transition duration-300">
            Follow
          </button>
        </div>

        {/* Bio */}
        <p className="text-base text-[#111111] mb-2.5 leading-[1.65]">
          I turn fuzzy ideas into live Products <em>(quickly)</em> full-stack AI
          Builder.
        </p>
        <p className="text-sm text-[#6B7280] mb-[22px] leading-[1.6]">
          alan.dev is my personal website where I publish projects, apps, and
          practical AI engineering notes.
        </p>

        <p className="text-base text-[#111111] leading-[1.85] mb-[22px]">
          Currently working as a Founding Engineer at{" "}
          <a
            href="#"
            className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
          >
            startup.ai
          </a>
          <br />I have built multiple products in past 5 years.&nbsp;{" "}
          <a
            href="#"
            className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
          >
            Raised $100K funding
          </a>
          <br />
          for my startup{" "}
          <a
            href="#"
            className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
          >
            ProductA.ai
          </a>
          , built{" "}
          <a
            href="#"
            className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
          >
            ProductB
          </a>
          ,{" "}
          <a
            href="#"
            className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
          >
            ProductC
          </a>
          .
        </p>

        <p className="text-base text-[#111111] mb-1.5 leading-[1.65]">
          You can talk to me about{" "}
          <strong className="font-semibold">
            AI, new ideas, life, or anything else.
          </strong>
        </p>
        <p className="text-base text-[#111111] mb-9">
          Say Hi on&nbsp;
          <a href="#" className="font-bold">
            X
          </a>
        </p>

        {/* Featured Blog Card */}
        <a
          href="#"
          className="group flex bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden max-w-[920px] hover:border-[#D1D5DB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out cursor-pointer relative hover:scale-105"
        >
          {/* Thumbnail */}
          <div className="w-[140px] min-h-[130px] flex-shrink-0 overflow-hidden relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] group-hover:scale-110 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:rotate-6 group-hover:scale-105"
              style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 70%, #8b5cf6 0%, transparent 50%)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center group-hover:rotate-6 group-hover:scale-105">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-white/20 group-hover:text-white/40 transition-colors duration-300">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-[#9CA3AF] mb-1.5">
              Check this out
            </div>
            <div className="text-base font-bold text-[#111111] tracking-[-0.015em] leading-[1.3] mb-2">
              Setting Up Mac for Development [May 2026]
            </div>
            <div className="text-sm text-[#6B7280] leading-[1.5] flex-1 mb-3">
              The current toolkit and the AI coding stack I&apos;d put on a
              fresh Mac today. A year after my 2025 setup.
            </div>
            <div className="text-sm font-medium text-[#111111] flex items-center gap-1">
              Read more
              <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </div>

          {/* Expand icon */}
          <svg
            className="absolute bottom-2.5 right-3 text-[#9CA3AF] opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </a>
      </div>
    </>
  );
}
