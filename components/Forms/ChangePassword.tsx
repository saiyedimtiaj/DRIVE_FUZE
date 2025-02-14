"use client";

import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { useChangePassword } from "@/hooks/auth.hooks";
import { useRouter, useSearchParams } from "next/navigation";

const ChangePassword = () => {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: changePassword, isPending } = useChangePassword();
  const searchParams = useSearchParams();
  const router = useRouter();

  const confirmationLink = searchParams.get("confirmationLink"); // Properly fetch the token

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Passwords matching check
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Check if confirmationLink is available
    if (!confirmationLink) {
      toast({
        title: "Error",
        description: "Invalid or missing confirmation link.",
        variant: "destructive",
      });
      return;
    }

    // Trigger password change
    changePassword(
      { password: newPassword, token: confirmationLink },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({
              title: "Password updated",
              description: "Your password has been changed successfully.",
            });
            router.push("/sign-in");
          } else {
            toast({
              title: "Failed",
              description: data?.message || "Something went wrong.",
              variant: "destructive",
            });
          }
        },
      }
    );
  };

  return (
    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="newPassword">New password</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm new password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-burgundy hover:bg-burgundy/90 text-white flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader size={20} className="h-4 w-4 animate-spin mr-2" />
            Updating...
          </>
        ) : (
          "Update password"
        )}
      </Button>
    </form>
  );
};

export default ChangePassword;
