import { Watch } from "lucide-react";
import { Card } from "@/components/ui/card";
import ChangePassword from "@/components/Forms/ChangePassword";

function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Watch className="h-12 w-12 text-burgundy" />
            </div>
            <h2 className="mt-4 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Update Your Account Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Secure your account by updating your password. Please choose a
              strong password to keep your information safe.
            </p>
          </div>
          <ChangePassword />
        </Card>
      </div>
    </div>
  );
}

export default Page;
