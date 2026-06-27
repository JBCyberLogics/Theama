import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Careers — THEAMA',
  description: 'Join the team behind THEAMA.',
}

export default function CareersPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-6">
            Careers
          </h1>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-12 flex flex-col items-center justify-center py-20 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3D0000" strokeWidth="1" className="mb-6">
              <rect x="2" y="6" width="20" height="14" rx="2" />
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            <p className="font-['Cormorant_Garamond'] italic text-[#B38080] text-[20px] mb-3">
              No open roles at this time
            </p>
            <p className="text-[#6B4B4B] text-[14px] max-w-[400px]">
              We are not currently hiring, but we are always interested in hearing from passionate people. Reach out on our social channels.
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
