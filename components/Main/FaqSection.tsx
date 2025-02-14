"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  faqCategories: {
    subscription: {
      name: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
    security: {
      name: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
    collateral: {
      name: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
};

const FaqSection = ({ faqCategories }: Props) => {
  const [activeCategory, setActiveCategory] = useState("subscription");
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Menu */}
        <div className="md:w-1/4">
          <div className="sticky top-24 space-y-2">
            {Object.entries(faqCategories).map(([key, category]) => (
              <Button
                key={key}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-montserrat",
                  activeCategory === key
                    ? "bg-primary/10 text-primary"
                    : "text-primary/60"
                )}
                onClick={() => setActiveCategory(key)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="md:w-3/4">
          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold text-primary mb-6">
              {faqCategories[activeCategory as keyof typeof faqCategories].name}
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqCategories[
                activeCategory as keyof typeof faqCategories
              ].questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-montserrat text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary/80 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
