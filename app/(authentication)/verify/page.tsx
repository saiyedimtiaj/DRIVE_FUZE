"use client";
import { Watch } from "lucide-react";
import { Card } from "@/components/ui/card";
import VerifyForm from "@/components/Forms/VerifyForm";

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Watch className="h-12 w-12 text-burgundy" />
            </div>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
              Verify your account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Enter the code sent to your email to complete verification.
            </p>
          </div>
          <VerifyForm token={searchParams.token} />
        </Card>
      </div>
    </div>
  );
}
