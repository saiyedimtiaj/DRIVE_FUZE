"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import audi from "../../assets/audi-5.svg";
import bmw from "../../assets/bmw-13672.svg";
import marcedes from "../../assets/mercedes-benz-6.svg";
import Volkswagen from "../../assets/volkswagen-10.svg";
import Volvo from "../../assets/volvo-logo-1.svg";

const carLogos = [
  {
    name: "Audi",
    logo: audi,
  },
  {
    name: "BMW",
    logo: bmw,
  },
  {
    name: "Mercedes",
    logo: marcedes,
  },
  {
    name: "Volkswagen",
    logo: Volkswagen,
  },
  {
    name: "Volvo",
    logo: Volvo,
  },
];

export default function CarLogoCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (carLogos.length * 200));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto overflow-hidden bg-white py-8">
      <div className="relative">
        <div
          className="flex space-x-16 whitespace-nowrap"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: "transform 0.5s linear",
          }}
        >
          {[...carLogos, ...carLogos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="inline-flex items-center justify-center w-32 h-16 opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src={logo.logo}
                alt={`${logo.name} logo`}
                className="max-w-full max-h-full h-full object-contain"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
