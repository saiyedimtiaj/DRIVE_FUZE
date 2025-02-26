"use client";

import FaqSection from "@/components/Main/FaqSection";

const faqCategories = {
  subscription: {
    name: "Subscription Process",
    questions: [
      {
        question: "How does the subscription process work?",
        answer:
          "Our subscription process follows these steps:\n\n1. Browse our curated collection\n2. Select your desired timepiece\n3. Complete identity verification\n4. Provide collateral information\n5. Sign subscription agreement\n6. Receive your watch within 2-3 business days",
      },
      {
        question: "What are the subscription terms?",
        answer:
          "We offer flexible terms ranging from 6 to 24 months. Monthly payments are based on the watch's value and subscription duration. Early termination is available with a 60-day notice.",
      },
      {
        question: "Can I switch watches during my subscription?",
        answer:
          "Yes, after 6 months of continuous subscription, you can switch to a different timepiece. A small transfer fee may apply based on the new watch's value.",
      },
    ],
  },
  security: {
    name: "Security & Authentication",
    questions: [
      {
        question: "How are the watches authenticated?",
        answer:
          "Each timepiece undergoes a rigorous authentication process:\n\n• Serial number verification\n• Movement authenticity check\n• Original documentation validation\n• Certified expert inspection\n• Digital certification creation",
      },
      {
        question: "What security measures protect my subscription?",
        answer:
          "We implement comprehensive security measures including insurance coverage, secure storage facilities, and tracked shipping with real-time monitoring.",
      },
      {
        question: "How do you handle watch maintenance?",
        answer:
          "Regular maintenance is included in your subscription. This covers:\n\n• Annual servicing\n• Water resistance testing\n• Movement accuracy checks\n• Professional cleaning",
      },
    ],
  },
  collateral: {
    name: "Collateral & Payment",
    questions: [
      {
        question: "What type of collateral is required?",
        answer:
          "We accept various forms of collateral:\n\n• Property deeds\n• Vehicle titles\n• Investment portfolios\n• Precious metals\n• Fine art collections\n\nThe collateral value should typically exceed the watch's retail value.",
      },
      {
        question: "How are payments structured?",
        answer:
          "Monthly payments are automatically processed via credit card or bank transfer. The payment amount remains fixed throughout your subscription term unless you upgrade or modify your subscription.",
      },
      {
        question: "Is there an option to purchase?",
        answer:
          "Yes, after 12 months of subscription, you have the option to purchase the timepiece. A portion of your subscription payments will be credited toward the purchase price.",
      },
    ],
  },
};

export default function FAQPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
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
          <h1 className="text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Find detailed answers about our car subscription service.
          </p>
        </div>
      </div>
      <FaqSection faqCategories={faqCategories} />
    </div>
  );
}
