import AdminLayout from "@/components/Navigation/AdminLayout";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <AdminLayout />
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;
