"use client";

import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserCircle2 } from "lucide-react";

const UserDashboardInfo = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between mb-4">
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-primary">
          Welcome back, {user?.firstName}
        </h1>
        <p className="text-sm md:text-base">
          Here&apos;s what&apos;s happening with your subscriptions
        </p>
      </div>
      <Link href="/dashboard/account">
        <div className="space-x-2">
          <Button variant="outline" className="mr-2">
            <UserCircle2 className="mr-2 h-4 w-4" />
            Account
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default UserDashboardInfo;
