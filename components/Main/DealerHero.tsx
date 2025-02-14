"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

const DealerHero = () => {
  const scrollToForm = () => {
    document
      .getElementById("dealer-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex gap-4">
      <Button
        size="lg"
        onClick={scrollToForm}
        className="bg-burgundy hover:bg-burgundy/90 text-white"
      >
        Join Now
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() =>
          document
            .getElementById("benefits")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Learn More About the Benefits
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default DealerHero;
