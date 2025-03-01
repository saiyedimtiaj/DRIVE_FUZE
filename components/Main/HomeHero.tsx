import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import WordEffect from "./WordEffect";
import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-between bg-gradient-to-br from-white via-burgundy/5 to-burgundy/10">
      <div className="absolute inset-0">
        <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
        <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-burgundy/10 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-16">
        {/* Text Section */}
        <div className="lg:w-2/5 relative z-10 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-[27px] text-start sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-6 pt-10 leading-tight">
            Car subscription is:
            <WordEffect />
          </h1>
          <p className="text-lg sm:text-xl text-primary/80 mb-8 max-w-2xl mx-auto lg:mx-0">
            Insurance, Road Tax, MOT, and Maintenance all inclusive in your no
            deposit, monthly car subscription
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/subscribe">
              <Button
                size="lg"
                className="text-lg px-8 bg-[#800020] hover:bg-[#800020]/90 text-white"
              >
                Choose your car
              </Button>
            </Link>
            <Link href={"/how-it-works"}>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section - With adjusted proportions */}
        <div className="lg:w-3/5 relative z-20 w-full px-4 lg:px-0 space-y-6 lg:pl-12">
          <div className="relative lg:ml-auto lg:w-[75%] max-w-[600px] mx-auto">
            <div className="absolute inset-0 bg-[#800020]/10 rounded-lg transform rotate-3"></div>
            <div className="relative w-full">
              <Image
                src="https://mediaservice.audi.com/media/fast/H4sIAAAAAAAA_1vzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCEtzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grT-CmTb9qYsOWhue_imCNSvOqOLmGm4EVqItxB5BgngIk-MKBBKcdA5gEmbcTRFSC-Ez2zAwMrBVARiQDCPDxlRblFCQWJebqlWemlGQIahgQCYTZXVxDHD19ggG4bb1C6QAAAA"
                alt="Car subscription image"
                className="rounded-lg shadow-xl w-full h-auto relative z-10"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="relative lg:ml-auto lg:w-[75%] max-w-[600px] mx-auto">
            <div className="absolute inset-0 bg-burgundy/10 rounded-lg transform -rotate-2"></div>
            <div className="relative w-full">
              <Image
                width={500}
                height={500}
                src="https://media-assets.mazda.eu/image/upload/q_auto,f_auto/mazdauk/globalassets/cars/mazda-mx-30/clearcut_cc/mx-30_drb3_djasbad_46g_d2e_ext_high_transparentpng2.png?rnd=492942"
                alt="Car subscription image"
                className="rounded-lg shadow-xl w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
