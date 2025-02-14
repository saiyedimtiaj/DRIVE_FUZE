import Link from "next/link";
import { Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ForgotPassword from "@/components/Forms/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
            <div className="flex justify-center">
              <Watch className="h-12 w-12 text-burgundy" />
            </div>
            <h2 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Reset your password
            </h2>
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Button variant="link" className="px-0 py-0">
                <Link
                  href="/sign-in"
                  className="font-medium text-burgundy hover:text-burgundy/90"
                >
                  Sign in
                </Link>
              </Button>
            </p>
          </div>
          <ForgotPassword />
        </Card>
      </div>
    </div>
  );
}
