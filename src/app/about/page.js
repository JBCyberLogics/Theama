export default function AboutPage() {
  return (
    <div className="min-h-screen pt-[72px]" style={{ backgroundColor: 'var(--surface-base)' }}>
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="font-['Playfair_Display'] text-white text-[36px] sm:text-[48px] font-bold mb-6">About Theama</h1>
        <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-relaxed">
          <p>
            Theama is a cinematic discovery platform designed for those who live for the thrill of the screen.
            We believe every film is an event, every genre a new world to explore.
          </p>
        </div>
      </div>
    </div>
  )
}
