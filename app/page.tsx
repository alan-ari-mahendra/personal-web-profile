import { LiveClock } from "@/components/live-clock";

export default function Home() {
  return (
    <>
      <main className="flex-1 px-14 pt-[54px] pb-12 max-w-[760px] md:px-14 max-md:px-7 max-sm:px-5">
        {/* Hero */}
        <h1 className="text-[56px] font-bold tracking-[-0.04em] leading-[1.05] text-[#111111] mb-1.5 flex items-center gap-2.5 flex-wrap max-md:text-[40px]">
          Hey, I&apos;m Alan{" "}
        </h1>
        <h2 className="text-[22px] font-normal text-[#6B7280] tracking-[-0.01em] mb-[30px]">
          AI Engineer
        </h2>

        {/* X Widget */}
        <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-3 mb-8 max-w-[620px]">
          <div className="flex items-center gap-2.5 text-[14px] font-medium text-[#111111]">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            Connect with me on X
          </div>
          <button className="bg-[#111111] text-white text-[13px] font-semibold px-[18px] py-[7px] rounded-[7px] cursor-pointer hover:opacity-75 transition-opacity duration-100 flex-shrink-0">
            Follow
          </button>
        </div>

        {/* Bio */}
        <p className="text-[15.5px] text-[#111111] mb-2.5 leading-[1.65]">
          I turn fuzzy ideas into live Products <em>(quickly)</em> full-stack AI Builder.
        </p>
        <p className="text-[13.5px] text-[#6B7280] mb-[22px] leading-[1.6]">
          alan.dev is my personal website where I publish projects, apps, and practical AI engineering notes.
        </p>

        <p className="text-[15px] text-[#111111] leading-[1.85] mb-[22px]">
          Currently working as a Founding Engineer at{" "}
          <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
            startup.ai
          </a>
          <br />
          I have built multiple products in past 5 years.&nbsp;{" "}
          <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
            Raised $100K funding
          </a>
          <br />
          for my startup{" "}
          <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
            ProductA.ai
          </a>
          , built{" "}
          <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
            ProductB
          </a>
          ,{" "}
          <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
            ProductC
          </a>
          .
        </p>

        <p className="text-[15px] text-[#111111] mb-1.5 leading-[1.65]">
          You can talk to me about <strong className="font-semibold">AI, new ideas, life, or anything else.</strong>
        </p>
        <p className="text-[15px] text-[#111111] mb-9">
          Say Hi on&nbsp;
          <a href="#" className="font-bold">X</a>
        </p>

        {/* Featured Blog Card */}
        <a
          href="#"
          className="group flex bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden max-w-[650px] hover:border-[#9CA3AF] transition-colors duration-150 cursor-pointer relative"
        >
          {/* Thumbnail */}
          <div className="w-[140px] min-h-[130px] flex-shrink-0 bg-[#1C1917] flex items-stretch">
            <svg
              viewBox="0 0 140 140"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full block"
            >
              <rect width="140" height="140" fill="#1C1917" />
              <rect x="0" y="90" width="140" height="50" fill="#292524" />
              <rect x="18" y="14" width="104" height="68" rx="5" fill="#0C0A09" stroke="#44403C" strokeWidth="1.5" />
              <rect x="22" y="18" width="96" height="60" rx="3" fill="#0A0F1A" />
              <rect x="26" y="23" width="50" height="2" rx="1" fill="#7dd3fc" opacity="0.5" />
              <rect x="26" y="29" width="72" height="2" rx="1" fill="#4ade80" opacity="0.4" />
              <rect x="26" y="35" width="38" height="2" rx="1" fill="#7dd3fc" opacity="0.4" />
              <rect x="26" y="41" width="60" height="2" rx="1" fill="#f8fafc" opacity="0.15" />
              <rect x="26" y="47" width="45" height="2" rx="1" fill="#f8fafc" opacity="0.15" />
              <rect x="26" y="53" width="80" height="2" rx="1" fill="#f8fafc" opacity="0.1" />
              <rect x="26" y="59" width="30" height="2" rx="1" fill="#fbbf24" opacity="0.5" />
              <rect x="58" y="59" width="6" height="10" rx="1" fill="#fbbf24" opacity="0.8" />
              <rect x="62" y="82" width="16" height="9" fill="#3F3F3F" />
              <rect x="50" y="90" width="40" height="3" rx="1.5" fill="#3F3F3F" />
              <rect x="24" y="100" width="88" height="22" rx="4" fill="#2D2926" />
              <rect x="28" y="104" width="80" height="2.5" rx="1" fill="#1C1A17" opacity="0.7" />
              <rect x="28" y="109" width="80" height="2.5" rx="1" fill="#1C1A17" opacity="0.7" />
              <rect x="28" y="114" width="55" height="2.5" rx="1" fill="#1C1A17" opacity="0.7" />
              <rect x="116" y="96" width="18" height="22" rx="4" fill="#78350F" />
              <rect x="118" y="98" width="14" height="14" rx="2" fill="#92400E" />
              <path d="M134 102 Q140 105 134 108" stroke="#78350F" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Body */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9CA3AF] mb-1.5">
              Check this out
            </div>
            <div className="text-[15.5px] font-bold text-[#111111] tracking-[-0.015em] leading-[1.3] mb-2">
              Setting Up Mac for Development [May 2026]
            </div>
            <div className="text-[13px] text-[#6B7280] leading-[1.5] flex-1 mb-3">
              The current toolkit and the AI coding stack I&apos;d put on a fresh Mac today. A year after my 2025 setup.
            </div>
            <div className="text-[13.5px] font-medium text-[#111111] group-hover:underline underline-offset-[2px]">
              Read more →
            </div>
          </div>

          {/* Expand icon */}
          <svg
            className="absolute bottom-2.5 right-3 text-[#9CA3AF] opacity-50"
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
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] px-14 py-[14px] flex items-center justify-between max-md:px-7 max-sm:px-5">
        <a
          href="#"
          className="text-[13px] text-[#111111] font-medium hover:underline underline-offset-[2px]"
        >
          Reach out →
        </a>
        <span className="text-[13px] text-[#6B7280]">Made by Alan | © 2026</span>
        <LiveClock />
      </footer>
    </>
  );
}
