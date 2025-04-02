"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForgotPassword } from "@/hooks/auth.hooks";
import { Loader } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setIsSubmitted(true);
            toast({
              title: "Reset link sent",
              description: "Check your email for password reset instructions.",
            });
          } else {
            toast({
              title: "Failed",
              description: data?.message,
              variant: "destructive",
            });
          }
        },
      }
    );
  };
  return (
    <div>
      {isSubmitted ? (
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Check your email
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            we have sent password reset instructions to {email}
          </p>
          <Button
            className="mt-6 w-full bg-burgundy hover:bg-burgundy/90 text-white"
            onClick={() => setIsSubmitted(false)}
          >
            Try another email
          </Button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
          >
            {isPending ? (
              <>
                <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
