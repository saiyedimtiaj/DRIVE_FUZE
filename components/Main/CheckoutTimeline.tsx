"use client";

import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const steps = [
  { id: 1, name: "Driver Information" },
  { id: 2, name: "Documents" },
  { id: 3, name: "Summary" },
  { id: 4, name: "Payment" },
];

export function CheckoutTimeline() {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (pathname.includes("information")) setCurrentStep(1);
    if (pathname.includes("document")) setCurrentStep(2);
    if (pathname.includes("summary")) setCurrentStep(3);
    if (pathname.includes("checkout")) setCurrentStep(4);
  }, [pathname, currentStep]);
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
              className={`md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
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
              className={`mt-2 text-[12px] text-center block md:text-sm mr-2 md:mr-0 font-medium ${
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
