export default function PrivacyPage() {
  return (
    <>
      <div className="pt-20 min-h-screen bg-white">
        <div className="relative overflow-hidden bg-white py-12">
          <div className="absolute inset-0">
            <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
            <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-burgundy/10 to-transparent"></div>
          </div>
          <div className="relative container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-primary/80 max-w-2xl">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-primary/80">
                <p>
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Personal identification information (name, email address,
                    phone number)
                  </li>
                  <li>
                    Driver&apos;s license and other identification documents
                  </li>
                  <li>Payment information</li>
                  <li>Vehicle preferences and usage information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-primary/80">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process your subscription and payments</li>
                  <li>Verify your identity and eligibility</li>
                  <li>Communicate with you about your subscription</li>
                  <li>Improve our services and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-primary/80">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="space-y-4 text-primary/80">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-primary/80">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@drivefuze.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
