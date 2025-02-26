import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { useUser } from "@/lib/user.provider";

const SmDashboardSidebar = () => {
  const { user } = useUser();

  // Define navigation links based on user roles
  const navLinks =
    user?.role === "admin"
      ? [
          { label: "Customers", href: "/admin/customers" },
          { label: "Inventory", href: "/admin/inventory" },
          { label: "Transactions", href: "/admin/transactions" },
          { label: "Subscriptions", href: "/admin/subscriptions" },
          { label: "Dealers", href: "/admin/dealers" },
          { label: "Dealer-Support", href: "/admin/dealer-support" },
          { label: "Risk Assessment", href: "/admin/risk-assessment" },
          { label: "CarCare", href: "/admin/carcare" },
          { label: "Blog", href: "/admin/blog" },
          { label: "News", href: "/admin/news" },
          { label: "Testimonials", href: "/admin/testimonials" },
        ]
      : user?.role === "dealer"
      ? [
          { label: "Inventory", href: "/dealer/inventory" },
          { label: "Fulfillment", href: "/dealer/fulfillment" },
          { label: "Subscriptions", href: "/dealer/subscriptions" },
          { label: "Support", href: "/dealer/support" },
        ]
      : [
          { label: "My Subscription", href: "/dashboard/my-subscription" },
          {
            label: "Subscription Request",
            href: "/dashboard/subscription-request",
          },
          { label: "Support", href: "/dashboard/support" },
          { label: "Insurance", href: "/dashboard/insurance" },
        ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <div className="flex flex-col space-y-4 mt-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-lg font-medium text-primary/80 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmDashboardSidebar;
