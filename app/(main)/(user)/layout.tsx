import UserLayout from "@/components/Navigation/UserLayout";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-20 min-h-screen bg-white container mx-auto px-4">
      <UserLayout />
      <div>{children}</div>
    </div>
  );
};

export default layout;
