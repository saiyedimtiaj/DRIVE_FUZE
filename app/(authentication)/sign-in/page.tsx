import Link from "next/link";
import { Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SigninForm from "@/components/Forms/SigninForm";

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirectUrl = searchParams?.redirect || "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Watch className="h-12 w-12 text-burgundy" />
            </div>
            <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-center text-sm text-gray-600">
              <Button variant="link">
                <Link
                  href={`/sign-up?redirect=${encodeURIComponent(redirectUrl)}`}
                  className="font-medium text-burgundy hover:text-burgundy/90"
                >
                  create a new account
                </Link>
              </Button>
            </p>
            <SigninForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
