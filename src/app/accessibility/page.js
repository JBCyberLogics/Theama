import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Accessibility — THEAMA',
  description: 'THEAMA accessibility features and commitment to inclusive design.',
}

export default function AccessibilityPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-6">
            Accessibility
          </h1>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[14px] leading-[1.8]">
            <p>
              THEAMA is committed to providing an inclusive experience for all users, regardless of ability. We believe the spectacle of cinema should be accessible to everyone.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              What We&apos;ve Done
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#B3B3B3] text-[14px] leading-[1.8]">
              <li>Semantic HTML structure with proper heading hierarchy</li>
              <li>ARIA labels on interactive elements and icons</li>
              <li>Sufficient color contrast throughout the interface</li>
              <li>Keyboard-navigable menus and dialogs</li>
              <li>Focus indicators on all interactive elements</li>
              <li>Alt text on all movie poster images</li>
              <li>Reduced motion support via prefers-reduced-motion media query</li>
            </ul>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              What We&apos;re Working On
            </h2>
            <p>
              We are actively working toward WCAG 2.1 AA compliance. Our current focus areas include: screen reader announcements for dynamic content, captions for any video content, and improved focus management in modal dialogs.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              Feedback
            </h2>
            <p>
              If you encounter accessibility barriers or have suggestions for improvement, please contact us at accessibility@theama.app. We take all feedback seriously and aim to respond within one week.
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
