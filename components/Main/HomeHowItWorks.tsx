"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Calendar,
  Key,
  Heart,
  RefreshCw,
  Car,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose your car",
    description: "Select your car, mileage and subscription term.",
    icon: Car,
  },
  {
    id: 2,
    title: "Get verified",
    description: "We will check your identity and reserve your vehicle.",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Booking finalised",
    description: "We will confirm your booking and finalise first payment.",
    icon: Key,
  },
  {
    id: 4,
    title: "Schedule delivery",
    description: "Select a delivery date that works for you.",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Drive and enjoy",
    description: "Enjoy your subscription car - just drive and relax!",
    icon: Heart,
  },
  {
    id: 6,
    title: "Swap or return",
    description: "Return your car and choose a new one for renewal.",
    icon: RefreshCw,
  },
];

export default function HomeHowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length ? 1 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  return (
    <div className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-primary">How It Works</h2>
          <p className="text-lg text-primary/80">
            Get on the road in six simple steps
          </p>
        </div>

        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activeStep === step.id
                      ? "border-burgundy shadow-lg transform scale-105"
                      : "hover:border-burgundy/50"
                  }`}
                  onClick={() => {
                    setActiveStep(step.id);
                    setIsAutoPlaying(false);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        activeStep === step.id
                          ? "bg-burgundy text-white"
                          : "bg-burgundy/10 text-burgundy"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-burgundy">
                          Step {step.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-primary/80">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
