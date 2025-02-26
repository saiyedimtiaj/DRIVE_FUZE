import HowItWork from "@/components/Main/HowItWork";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-12">
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
          <h1 className="text-4xl font-bold text-primary mb-4">How It Works</h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Experience the future of car ownership with our simple, transparent
            subscription process.
          </p>
        </div>
      </div>

      {/* Journey Section */}
      <HowItWork />
      {/* CTA Section */}
      <div className="text-center mt-32 py-12 bg-burgundy-50 rounded-lg">
        <h2 className="text-3xl font-bold text-burgundy mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have already made the switch
          to car subscription.
        </p>
        <Link href={"/subscribe"}>
          <Button className="bg-burgundy hover:bg-burgundy/90 text-white">
            Browse Our Cars
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
