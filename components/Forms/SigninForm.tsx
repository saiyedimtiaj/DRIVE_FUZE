"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUserLogin } from "@/hooks/auth.hooks";
import { useUser } from "@/lib/user.provider";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

const SigninForm = () => {
  const { mutate: login, isPending } = useUserLogin();
  const { setIsLoading } = useUser();
  const { toast } = useToast();
  const route = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  console.log(redirectUrl);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;

    const payload = { email, password };
    login(payload, {
      onSuccess: (data) => {
        setIsLoading(true);
        if (data?.success) {
          toast({
            title: "Success",
            description: data?.message,
          });
          route.push(redirectUrl || "/");
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
    <>
      <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input name="email" type="email" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required className="mt-1" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Button variant="link">
              <Link
                href="/forgot-password"
                className="font-medium text-burgundy hover:text-burgundy/90"
              >
                Forgot your password?
              </Link>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-burgundy hover:bg-burgundy/90 text-white flex items-center justify-center"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
