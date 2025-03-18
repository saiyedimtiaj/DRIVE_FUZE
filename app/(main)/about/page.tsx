import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Target, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
          <div
            className="absolute right-0 w-3/4 h-full"
            style={{
              background:
                "linear-gradient(to left, rgba(128, 0, 32, 0.1), transparent)",
            }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            About Company 1
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Revolutionizing car ownership with flexible, all-inclusive
            subscriptions that put you in the driver&apos;s seat.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-primary/80">
            To transform the car ownership experience by providing flexible,
            hassle-free subscriptions that adapt to modern lifestyles. We
            believe in making premium cars accessible without the long-term
            commitments and hidden costs of traditional ownership.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-primary/80">
              Every decision we make starts with our customers&apos; needs and
              preferences.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-primary/80">
              Clear pricing, no hidden fees, and straightforward terms you can
              trust.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Target className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-primary/80">
              Continuously improving our service to deliver the best car
              subscription experience.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Sparkles className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-primary/80">
              Premium vehicles maintained to the highest standards for your
              safety and comfort.
            </p>
          </Card>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-6 text-primary/80">
            <p>
              Founded in 2022, Company 1 emerged from a simple observation:
              traditional car ownership doesn&apos;t align with modern
              lifestyles. We saw a need for flexibility, simplicity, and
              transparency in the automotive industry.
            </p>
            <p>
              Our team of automotive and technology experts came together with a
              shared vision: to create a car subscription service that
              eliminates the hassles of traditional ownership while providing
              the freedom and flexibility that today&apos;s drivers demand.
            </p>
            <p>
              Today, Company 1 is at the forefront of the car subscription
              revolution, offering a curated selection of premium vehicles with
              all-inclusive monthly subscriptions. We handle everything from
              insurance and maintenance to road tax and MOT, so you can focus on
              what matters most - enjoying your drive.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-burgundy-50 rounded-lg">
          <h2 className="text-3xl font-bold text-burgundy mb-4">
            Ready to Join the Future of Car Ownership?
          </h2>
          <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
            Experience the freedom of flexible car subscription with Company 1.
          </p>
          <Link href={"/subscribe"}>
            <Button className="bg-burgundy hover:bg-burgundy/90 text-white">
              Browse Our Cars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
