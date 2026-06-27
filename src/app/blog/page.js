import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Blog — THEAMA',
  description: 'Notes, essays, and dispatches from the world of cinema.',
}

export default function BlogPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-6">
            Blog
          </h1>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-12 flex flex-col items-center justify-center py-20 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3D0000" strokeWidth="1" className="mb-6">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[20px] mb-3">
              Curtain rising soon
            </p>
            <p className="text-[#6B4B4B] text-[14px] max-w-[400px]">
              Our journal of film criticism, curator interviews, and behind-the-scenes dispatches is in preparation. Performances begin shortly.
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
