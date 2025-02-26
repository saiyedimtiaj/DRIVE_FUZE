import DealerTestomonialAndFaq from "@/components/Main/DealerTestomonialAndFaq";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  ArrowRight,
  Building2,
  Users,
  Car,
  Sparkles,
  Shield,
  Banknote,
} from "lucide-react";
import Image from "next/image";

const dealerLogos = [
  {
    name: "Perry's",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300",
  },
  {
    name: "Auto World",
    logo: "https://images.unsplash.com/photo-1562519819-016930ada31b?q=80&w=300",
  },
  {
    name: "Luxury Cars Ltd",
    logo: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=300",
  },
];

export default function DealersPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
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
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Partner with Us – Drive the Future of Car Subscription
            </h1>
            <p className="text-xl text-primary/80 mb-8">
              Unlock new revenue streams and connect with modern, digital-savvy
              customers. Let your brand take center stage in the car
              subscription market.
            </p>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 bg-burgundy-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Partner with Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8">
              <Building2 className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">Your Brand</h3>
              <p className="text-primary/80">
                The customer experiences your brand, keeping you in the
                spotlight throughout their journey.
              </p>
            </Card>
            <Card className="p-8">
              <Users className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">Your Customers</h3>
              <p className="text-primary/80">
                You maintain the customer relationship while we handle the
                back-end processes.
              </p>
            </Card>
            <Card className="p-8">
              <Car className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">
                Your Subscription Product
              </h3>
              <p className="text-primary/80">
                You determine the pricing, terms, and conditions for your
                vehicles.
              </p>
            </Card>
          </div>

          {/* Logo Carousel */}
          <div className="text-center">
            <p className="text-lg font-medium mb-8">
              Trusted by Leading Dealerships
            </p>
            <div className="flex justify-center items-center gap-12">
              {dealerLogos.map((dealer, index) => (
                <div
                  key={index}
                  className="w-32 h-32 relative grayscale hover:grayscale-0 transition-all"
                >
                  <Image
                    src={dealer.logo}
                    alt={dealer.name}
                    className="object-contain w-full h-full"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Car Subscription is the Future
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <Sparkles className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">Market Growth</h3>
              <p className="text-primary/80 mb-4">
                The car subscription market is expected to grow 20x by 2030,
                capturing 40% of automotive transactions.
              </p>
              <div className="h-24 bg-burgundy/10 rounded-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-burgundy">20x</span>
              </div>
            </Card>
            <Card className="p-8">
              <Banknote className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">New Revenue Streams</h3>
              <p className="text-primary/80">
                Turn unused inventory into income and attract a new generation
                of car buyers.
              </p>
            </Card>
            <Card className="p-8">
              <Shield className="h-12 w-12 text-burgundy mb-6" />
              <h3 className="text-xl font-bold mb-4">Customer Flexibility</h3>
              <p className="text-primary/80">
                Subscriptions are the 4th option alongside cash purchases,
                financing, and leasing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-burgundy-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works – From Start to Success
          </h2>
          <div className="max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-start space-x-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {step === 1 && "Sign Up as a Dealer Partner"}
                    {step === 2 && "List Your Inventory"}
                    {step === 3 && "Set Your Subscription Terms"}
                    {step === 4 && "We Handle Customer Service"}
                    {step === 5 && "Earn Monthly Income"}
                  </h3>
                  <p className="text-primary/80">
                    {step === 1 &&
                      "Complete our simple onboarding process to join our network."}
                    {step === 2 &&
                      "Add your vehicles to our platform with detailed information."}
                    {step === 3 &&
                      "Define your pricing and subscription conditions."}
                    {step === 4 &&
                      "We take care of billing, support, and logistics."}
                    {step === 5 &&
                      "Watch your recurring revenue grow month after month."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DealerTestomonialAndFaq />

      {/* Footer CTA */}
      <section className="py-20 bg-burgundy-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don&apos;t Miss Out – Join the Future of Car Subscription Today!
          </h2>
          <Button
            size="lg"
            className="bg-burgundy hover:bg-burgundy/90 text-white"
          >
            Sign Up as a Partner
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
