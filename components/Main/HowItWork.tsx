"use client";
import React, { useEffect, useRef } from "react";
import { Card } from "../ui/card";
import {
  Calendar,
  Car,
  CheckCircle2,
  Heart,
  Key,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose your car",
    description:
      "Browse our extensive collection of premium vehicles and select the one that matches your lifestyle.",
    icon: Car,
    details: [
      "Wide range of premium vehicles",
      "Flexible subscription terms",
      "Transparent pricing",
      "No hidden fees",
    ],
  },
  {
    id: 2,
    title: "Get verified",
    description:
      "Quick and easy verification process to ensure a smooth subscription experience.",
    icon: CheckCircle2,
    details: [
      "Simple identity verification",
      "Fast credit checks",
      "Secure document upload",
      "Quick approval process",
    ],
  },
  {
    id: 3,
    title: "Booking finalised",
    description:
      "Complete your subscription agreement and make your first payment.",
    icon: Key,
    details: [
      "Digital subscription agreement",
      "Flexible payment options",
      "Clear terms and conditions",
      "Instant confirmation",
    ],
  },
  {
    id: 4,
    title: "Schedule delivery",
    description:
      "Choose a convenient delivery time and location for your new car.",
    icon: Calendar,
    details: [
      "Flexible delivery slots",
      "Doorstep delivery",
      "Professional handover",
      "Vehicle orientation",
    ],
  },
  {
    id: 5,
    title: "Drive and enjoy",
    description:
      "Hit the road with complete peace of mind - everything is taken care of.",
    icon: Heart,
    details: [
      "Comprehensive insurance included",
      "Maintenance covered",
      "Road tax included",
      "24/7 support",
    ],
  },
  {
    id: 6,
    title: "Swap or return",
    description:
      "Flexibility to change your car or end your subscription when you need.",
    icon: RefreshCw,
    details: [
      "Easy vehicle swaps",
      "Flexible subscription terms",
      "Simple return process",
      "No long-term commitment",
    ],
  },
];

const HowItWork = () => {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    stepsRef.current.forEach((step) => {
      if (step) {
        step.classList.add(
          "opacity-0",
          "translate-y-10",
          "transition-all",
          "duration-1000"
        );
        observer.observe(step);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative container mx-auto px-4 py-16">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-burgundy/20" />

      {steps.map((step, index) => {
        const Icon = step.icon;
        const isEven = index % 2 === 0;

        return (
          <div
            key={step.id}
            ref={(el) => {
              stepsRef.current[index] = el; // Assign the element to the ref array
            }}
            className={`relative flex items-center mb-32 last:mb-0 ${
              isEven ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Step Number */}
            <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-burgundy text-white flex items-center justify-center font-bold z-10">
              {step.id}
            </div>

            {/* Content */}
            <div className={`w-1/2 ${isEven ? "pr-16" : "pl-16"}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 rounded-lg bg-burgundy">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-primary/80 mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-burgundy mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HowItWork;
