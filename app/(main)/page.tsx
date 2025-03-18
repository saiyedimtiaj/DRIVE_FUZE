import AllCars from "@/components/Main/AllCars";
import CarLogoCarousel from "@/components/Main/CarLogoCarousel";
import HomeHero from "@/components/Main/HomeHero";
import HomeHowItWorks from "@/components/Main/HomeHowItWorks";
import { Check, X } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <HomeHero />
      <section className="py-16 bg-gradient-to-b from-white to-burgundy/5 relative overflow-hidden">
        <div className="absolute inset-0 wave-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Subscribe, relax and drive with one monthly package
            </h2>
            <p className="text-lg text-primary/80 max-w-2xl mx-auto">
              Experience the future of car ownership with our all-inclusive
              subscription model
            </p>
          </div>

          {/* Scrollable container for responsive comparison grid */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-auto">
            <div className="w-[600px] md:w-full grid grid-cols-4 gap-4 p-6">
              {/* Headers */}
              <div className="text-center">
                <span className="text-xl font-bold text-burgundy">
                  Company 1
                </span>
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-primary/80">
                  Leasing
                </span>
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-primary/80">PCP</span>
              </div>

              {/* No deposit */}
              <div className="font-medium"></div>
              <div className="text-center">
                <Check className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>

              {/* Insurance & tax */}
              <div className="font-medium">No deposit</div>
              <div className="text-center">
                <Check className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>

              {/* Maintenance */}
              <div className="font-medium">
                Car insurance and road tax included
              </div>
              <div className="text-center">
                <Check className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="font-medium">Free maintenance</div>

              {/* Commitment */}
              <div className="text-center">
                <Check className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="text-center">
                <X className="h-6 w-6 text-red-600 mx-auto" />
              </div>
              <div className="font-medium">No long term commitment</div>
            </div>
          </div>
        </div>
      </section>
      <CarLogoCarousel />
      <HomeHowItWorks />
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 mesh-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Find your perfect car
            </h2>
            <p className="text-lg text-primary/80">
              Browse our selection of premium vehicles and find the perfect
              match for your lifestyle
            </p>
          </div>
          <AllCars limit="4" />
        </div>
      </section>
    </div>
  );
};

export default page;
