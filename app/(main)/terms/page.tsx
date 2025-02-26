export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="relative overflow-hidden bg-white py-12">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
          <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-burgundy/10 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Please read these terms carefully before using our car subscription
            service.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              1. Subscription Agreement
            </h2>
            <div className="space-y-4 text-primary/80">
              <p>
                By subscribing to Company 1, you agree to these terms and
                conditions. The subscription agreement begins on the delivery
                date and continues until terminated in accordance with these
                terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. Eligibility Requirements
            </h2>
            <div className="space-y-4 text-primary/80">
              <p>To be eligible for our service, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 25 years old</li>
                <li>Hold a valid UK driving license for at least 12 months</li>
                <li>Have no more than 6 points on your license</li>
                <li>Have no CCJs within the last 5 years</li>
                <li>Pass our credit and identity checks</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
            <div className="space-y-4 text-primary/80">
              <p>
                Monthly payments are due on the same day each month. The
                subscription fee includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vehicle usage</li>
                <li>Comprehensive insurance</li>
                <li>Road tax</li>
                <li>Maintenance and servicing</li>
                <li>MOT</li>
                <li>Breakdown cover</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Vehicle Usage</h2>
            <div className="space-y-4 text-primary/80">
              <p>
                The vehicle must be used in accordance with our usage
                guidelines, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adhering to the agreed mileage limit</li>
                <li>Using the vehicle only within the UK</li>
                <li>Maintaining the vehicle in good condition</li>
                <li>Reporting any damage or issues promptly</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
            <p className="text-primary/80">
              Either party may terminate the subscription with 30 days&apos;
              notice. Early termination fees may apply. We reserve the right to
              terminate immediately for breach of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact</h2>
            <p className="text-primary/80">
              For any questions about these terms, please contact us at
              terms@drivefuze.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
