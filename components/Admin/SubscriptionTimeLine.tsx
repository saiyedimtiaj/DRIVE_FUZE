"use client";

import { Check } from "lucide-react";

interface TimelineProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Details" },
  { id: 2, name: "Return" },
];

export default function SubscriptionTimeline({ currentStep }: TimelineProps) {
  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-burgundy transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.id < currentStep
                  ? "bg-burgundy border-burgundy text-white"
                  : step.id === currentStep
                  ? "bg-white border-burgundy text-burgundy"
                  : "bg-white border-gray-300 text-gray-300"
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.id <= currentStep ? "text-burgundy" : "text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
