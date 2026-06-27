import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'About — THEAMA',
  description: 'The story behind THEAMA — a cinematic movie discovery platform with vintage Greek theater aesthetics.',
}

export default function AboutPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-6">
            About THEAMA
          </h1>

          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[15px] leading-[1.8]">
            <p>
              <span className="font-['Playfair_Display'] text-white text-[20px] italic">&theta;&epsilon;&alpha;&mu;&alpha;</span> — from the ancient Greek verb &ldquo;to see&rdquo; or &ldquo;to behold.&rdquo; THEAMA is a cinematic discovery platform built for those who see film as more than entertainment: as art, spectacle, and shared cultural memory.
            </p>

            <p>
              Inspired by the grandeur of vintage Greek theaters&mdash;with their marble prosceniums, crimson velvet curtains, and warm golden light&mdash;THEAMA transforms browsing for a film into an experience. Every element, from the typography to the transitions, is designed to evoke the ritual of stepping into a great cinema house.
            </p>

            <p>
              Powered by The Movie Database (TMDB), THEAMA surfaces trending films, hidden gems, and curated collections through a lens that prioritizes discovery over algorithms.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[22px] font-semibold mt-10 mb-4">
              The Vision
            </h2>

            <p>
              In an age of infinite scrolling and cold recommendation engines, THEAMA aims to restore the feeling of walking past a marquee on a Friday night&mdash;the anticipation, the glow, the promise of two hours in the dark with strangers sharing a story.
            </p>

            <p>
              This is not a database. This is a theater. Welcome to the spectacle.
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
