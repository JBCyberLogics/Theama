import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Privacy Policy — THEAMA',
  description: 'How THEAMA collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#6B4B4B] text-[13px] mb-6">Last updated: June 2026</p>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[14px] leading-[1.8]">
            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you create an account, we collect your email address and a display name. If you authenticate via a third-party provider (Google, GitHub), we receive the basic profile information shared by that provider.
            </p>
            <p>
              We collect information about the films you rate, save to collections, and mark as watched. This data is associated with your account and used solely to power your personal experience on THEAMA.
            </p>
            <p>
              We do not collect payment information, precise location data, or browsing history outside of THEAMA.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              2. How We Use Your Data
            </h2>
            <p>
              Your data is used to: (a) operate and maintain your account, (b) personalize film recommendations and collections, (c) improve the THEAMA experience through aggregate analytics, and (d) communicate with you regarding account-related matters.
            </p>
            <p>
              We do not sell your personal information to third parties. We do not serve targeted advertising.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              3. Data Storage and Security
            </h2>
            <p>
              Your data is stored securely using Supabase, a SOC 2 compliant database platform. Communications are encrypted in transit via TLS. We implement industry-standard security practices including row-level security policies that ensure your data is only accessible to you.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              4. Third-Party Services
            </h2>
            <p>
              THEAMA uses The Movie Database (TMDB) API to retrieve film metadata. Film data queries do not include your personal information. TMDB&apos;s own privacy policy applies to data they collect independently.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              5. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by emailing privacy@theama.app. You may also delete your account directly through your profile settings, which will remove all associated data within 30 days.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              6. Contact
            </h2>
            <p>
              For privacy-related inquiries, contact: privacy@theama.app
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
