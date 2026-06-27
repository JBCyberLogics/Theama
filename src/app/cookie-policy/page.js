import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Cookie Policy — THEAMA',
  description: 'How THEAMA uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <StageLayout transparentNav={false}>
      <div className="pt-[72px] min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <h1 className="font-['Playfair_Display'] text-white text-[36px] font-bold mb-3">
            Cookie Policy
          </h1>
          <p className="text-[#6B4B4B] text-[13px] mb-6">Last updated: June 2026</p>
          <div className="w-12 h-[2px]" style={{ backgroundColor: '#DC143C' }} />

          <div className="mt-8 space-y-6 text-[#B3B3B3] text-[14px] leading-[1.8]">
            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files stored on your device by your web browser. They are used to remember your preferences, maintain session state, and improve your experience on the Service.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              2. How We Use Cookies
            </h2>
            <p>
              THEAMA uses the following types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#B3B3B3] text-[14px] leading-[1.8]">
              <li><strong className="text-white">Essential cookies:</strong> Required for authentication and session management. Without these, the Service cannot function properly.</li>
              <li><strong className="text-white">Preference cookies:</strong> Remember your display preferences, such as dark mode and filter selections.</li>
              <li><strong className="text-white">Analytics cookies:</strong> Help us understand how the Service is used so we can improve it. We use privacy-respecting analytics that do not track you across other websites.</li>
            </ul>
            <p className="mt-4">
              We do <em>not</em> use advertising cookies, tracking cookies from third-party advertisers, or any cookie that profiles you for commercial purposes.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              3. Third-Party Cookies
            </h2>
            <p>
              TMDB API integration does not set cookies on your device. Supabase (our authentication provider) may set essential session cookies for authentication purposes. These are first-party cookies and are not used for tracking.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              4. Managing Cookies
            </h2>
            <p>
              Most web browsers allow you to control cookies through their settings. Please note that disabling essential cookies may prevent you from signing in or using core features of THEAMA.
            </p>

            <h2 className="font-['Playfair_Display'] text-white text-[20px] font-semibold mb-3 mt-8">
              5. Contact
            </h2>
            <p>
              For questions about our cookie usage, contact: privacy@theama.app
            </p>
          </div>
        </div>
      </div>
    </StageLayout>
  )
}
