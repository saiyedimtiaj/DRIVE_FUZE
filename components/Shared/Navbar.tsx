"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Watch, UserCircle2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/lib/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/auth.services";
import SmDashboardSidebar from "./SmDashboardSidebar";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/sign-in";
    if (user.role === "admin") return "/admin/customers";
    if (user.role === "dealer") return "/dealer/inventory";
    return "/dashboard/my-subscription";
  };

  const handleLogout = async () => {
    logout();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Sidebar for Dashboard */}
          <div className="flex items-center gap-2">
            {/^\/(dealer|admin|dashboard)(\/|$)/.test(pathname) && (
              <div className="block lg:hidden">
                <SmDashboardSidebar />
              </div>
            )}
            <Link href="/" className="flex items-center space-x-2">
              <Watch className="h-8 w-8 text-burgundy" />
              <span className="text-xl font-bold text-burgundy">Company 1</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              "Subscribe",
              "How It Works",
              "Dealers",
              "Blog",
              "News",
              "FAQ",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-primary/80 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* User Role-Based Button */}
            <div className="md:block hidden">
              {user ? (
                pathname.includes("/dashboard") ||
                pathname.includes("/admin") ||
                pathname.includes("/dealer") ? (
                  <Button className="bg-[#800020]" onClick={handleLogout}>
                    Log Out
                  </Button>
                ) : (
                  <Link href={getDashboardLink()}>
                    <Button className="w-full bg-[#800020] text-white">
                      Dashboard
                    </Button>
                  </Link>
                )
              ) : (
                <Link href="/sign-in">
                  <Button className="hidden md:flex bg-[#800020] text-white">
                    <UserCircle2 className="h-5 w-5 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="p-4">
                <div className="flex flex-col space-y-4 mt-8">
                  {[
                    "Subscribe",
                    "How It Works",
                    "Dealers",
                    "Blog",
                    "News",
                    "FAQ",
                  ].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-lg font-medium text-primary/80 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                  {user ? (
                    pathname.includes("/dashboard") ||
                    pathname.includes("/admin") ||
                    pathname.includes("/dealer") ? (
                      <Button className="bg-[#800020]" onClick={handleLogout}>
                        Log Out
                      </Button>
                    ) : (
                      <Link href={getDashboardLink()}>
                        <Button className="w-full bg-[#800020] text-white">
                          Dashboard
                        </Button>
                      </Link>
                    )
                  ) : (
                    <Link href="/sign-in">
                      <Button className="w-full bg-[#800020] text-white">
                        <UserCircle2 className="h-5 w-5 mr-1" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
