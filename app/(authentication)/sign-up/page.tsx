import Link from "next/link";
import { Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SignupForm from "@/components/Forms/SignupForm";

export default function SignUpPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirectUrl = searchParams?.redirect || "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-5 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Watch className="h-12 w-12 text-burgundy" />
            </div>
            <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-1 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Button variant="link" className="px-0">
                <Link
                  href={`/sign-up?redirect=${encodeURIComponent(redirectUrl)}`}
                  className="font-medium text-burgundy hover:text-burgundy/90"
                >
                  Sign in
                </Link>
              </Button>
            </p>
          </div>
          <SignupForm />
        </Card>
      </div>
    </div>
  );
}
