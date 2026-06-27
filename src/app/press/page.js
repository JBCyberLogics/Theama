import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Press — THEAMA',
  description: 'Press resources and media inquiries for THEAMA.',
}

export default function PressPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-6">
            Press
          </h1>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[15px] leading-[1.8]">
            <p>
              For press inquiries, media kits, or to schedule an interview with the THEAMA team, please reach out to us through the channels below.
            </p>

            <div className="mt-8 p-6" style={{ backgroundColor: '#141414', border: '1px solid #1A1A1A', borderRadius: '4px' }}>
              <h3 className="font-['Playfair_Display'] text-white text-[18px] font-semibold mb-3">
                Media Contact
              </h3>
              <p className="text-[#808080] text-[14px] mb-1">
                press@theama.app
              </p>
              <p className="text-[#6B4B4B] text-[13px]">
                We aim to respond within 48 hours.
              </p>
            </div>

            <p className="mt-6 text-[#6B4B4B] text-[14px] italic">
              A press kit with logos, screenshots, and brand guidelines is in preparation.
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
