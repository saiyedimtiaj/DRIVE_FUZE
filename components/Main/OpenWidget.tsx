"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

const OpenWidget = () => {
  const pathname = usePathname();

  useEffect(() => {
    const excludePaths = ["/admin", "/dealer", "/dashboard"];

    // If the current pathname matches any of the excluded paths, don't render the widget
    if (excludePaths.some((path) => pathname.includes(path))) {
      return; // Return early, not rendering the widget.
    }

    // Define the __ow configuration BEFORE loading the script
    if (!window.__ow) {
      window.__ow = {
        organizationId: "8c8584ec-70d6-4862-9427-789449578c2a",
        integration_name: "manual_settings",
        product_name: "openwidget",
      };
    }

    // Check if the script is already loaded
    if (!document.getElementById("openwidget-script")) {
      const script = document.createElement("script");
      script.id = "openwidget-script";
      script.src = "https://cdn.openwidget.com/openwidget.js";
      script.async = true;

      script.onload = () => {
        // Initialize OpenWidget AFTER the script is loaded
        if (window.OpenWidget) {
          window.OpenWidget.init();
        }
      };

      document.head.appendChild(script);
    }
  }, [pathname]);

  return (
    <>
      <noscript>
        You need to{" "}
        <a
          href="https://www.openwidget.com/enable-javascript"
          rel="noopener noreferrer nofollow"
        >
          enable JavaScript
        </a>{" "}
        to use the communication tool powered by{" "}
        <a
          href="https://www.openwidget.com/"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          OpenWidget
        </a>
      </noscript>
    </>
  );
};

export default OpenWidget;
