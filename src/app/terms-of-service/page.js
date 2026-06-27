import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Terms of Service — THEAMA',
  description: 'Terms and conditions for using THEAMA.',
}

export default function TermsOfServicePage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-3">
            Terms of Service
          </h1>
          <p className="text-[#6B4B4B] text-[13px] mb-6">Last updated: June 2026</p>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[14px] leading-[1.8]">
            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using THEAMA (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              2. Description of Service
            </h2>
            <p>
              THEAMA is a film discovery platform that provides access to movie metadata, ratings, and user-curated collections. The Service integrates with The Movie Database (TMDB) API for film data and is not endorsed or certified by TMDB.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account. You must be at least 13 years of age to use the Service.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              4. Acceptable Use
            </h2>
            <p>
              You agree not to: (a) use the Service for any unlawful purpose, (b) attempt to access another user&apos;s account, (c) scrape or systematically extract data from the Service, (d) upload malicious code or interfere with the Service&apos;s operation, or (e) use the Service in any way that could damage, disable, or impair it.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              5. Intellectual Property
            </h2>
            <p>
              The THEAMA name, logo, and visual design are proprietary. Film metadata and images are provided by TMDB and are subject to their own terms. User-generated content (ratings, reviews, collections) remains the property of the user, with a license granted to THEAMA to display it within the Service.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              6. Limitation of Liability
            </h2>
            <p>
              THEAMA is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms. We will notify users of material changes via email or through the Service.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              8. Contact
            </h2>
            <p>
              For questions about these terms, contact: legal@theama.app
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
