import Link from "next/link";
import { Watch, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Watch className="h-8 w-8 text-burgundy" />
              <span className="text-xl font-bold text-burgundy">Company 1</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Revolutionizing car ownership with flexible, all-inclusive
              subscriptions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/complaints"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Complaints
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Drive Fuze Limited
              <br />
              Monometer House
              <br />
              Rectory Grove
              <br />
              Leigh On Sea
              <br />
              Essex, England
              <br />
              SS9 2HL
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <a
              href="https://www.linkedin.com/company/drive-fuze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              Follow us on LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 pt-8 border-t text-xs text-center text-muted-foreground">
          <p>
            Copyright notice: 2025 Drive Fuze Limited. Drive Fuze is a
            registered trademark of Drive Fuze Ltd. All rights reserved. Drive
            Fuze Limited, Monometer House, Rectory Grove, Leigh On Sea, Essex,
            England, SS9 2HL. Company Registration Number 13840019.
          </p>
        </div>
      </div>
    </footer>
  );
}
