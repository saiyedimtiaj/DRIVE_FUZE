"use client";
import { Footer } from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import React, { ReactNode } from "react";

// Extend the global Window interface to include OpenWidget types
declare global {
  interface Window {
    __ow?: {
      organizationId: string;
      integration_name: string;
      product_name: string;
    };
    OpenWidget?: {
      init: () => void;
    };
  }
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      {/* Fallback for users with JavaScript disabled */}
    </div>
  );
};

export default Layout;
