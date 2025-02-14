"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCreateUser } from "@/hooks/auth.hooks";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { mutate: signUp, isPending } = useCreateUser();
  const route = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    const formData = {
      firstName,
      lastName,
      email,
      password,
    };
    signUp(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Success",
            description: data?.message,
          });
          route.push(`/verify?token=${data?.data}`);
        } else {
          toast({
            title: "Failed",
            description: data?.message,
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <form className="space-y-2.5 mt-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input name="firstName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input name="lastName" required className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input name="email" type="email" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          name="confirmPassword"
          type="password"
          required
          className="mt-1"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-burgundy hover:bg-burgundy/90 text-white flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
