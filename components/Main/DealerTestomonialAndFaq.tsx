"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testimonials = [
  {
    quote:
      "We've seen a significant boost in revenue with minimal effort. The platform handles everything for us!",
    author: "John Smith",
    role: "General Manager",
    dealership: "Premium Motors",
  },
  {
    quote:
      "Joining the platform has been seamless, and we've reached customers we couldn't before.",
    author: "Sarah Johnson",
    role: "Sales Director",
    dealership: "City Cars",
  },
  {
    quote:
      "The subscription model has transformed our business. Our inventory turnover has never been better.",
    author: "Michael Brown",
    role: "Owner",
    dealership: "Brown's Auto",
  },
];

const DealerTestomonialAndFaq = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  return (
    <div>
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Partners Say
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    index === activeTestimonial
                      ? "opacity-100"
                      : "opacity-0 absolute inset-0"
                  }`}
                >
                  <blockquote className="text-2xl font-medium text-center mb-8">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="text-center">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-primary/60">{testimonial.role}</p>
                    <p className="text-primary/60">{testimonial.dealership}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial
                      ? "bg-burgundy"
                      : "bg-burgundy/20"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Questions About Partnering With Us
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does car subscription generate revenue for dealers?
                </AccordionTrigger>
                <AccordionContent>
                  Car subscription generates recurring monthly revenue through
                  subscription fees. Dealers earn from vehicle usage while we
                  handle customer service, maintenance, and logistics. This
                  creates a steady income stream compared to traditional
                  one-time sales.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What kind of inventory is best for car subscription?
                </AccordionTrigger>
                <AccordionContent>
                  The best inventory for subscription includes popular models
                  with good reliability ratings and reasonable maintenance
                  costs. Both new and quality pre-owned vehicles can be
                  successful, with a sweet spot in the 1-3 year old range.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How much control do I have over pricing and terms?
                </AccordionTrigger>
                <AccordionContent>
                  You maintain full control over your subscription pricing and
                  terms. Set your own monthly rates, mileage limits, and
                  subscription durations. Our platform provides pricing guidance
                  based on market data, but the final decision is yours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealerTestomonialAndFaq;
