import DealerLayout from "@/components/Navigation/DealerLayout";
import { getNewAccessToken } from "@/services/auth.services";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const ass = await getNewAccessToken();
  console.log(ass);
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <DealerLayout />
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;
