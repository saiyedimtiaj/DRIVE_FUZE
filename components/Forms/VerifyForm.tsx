"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyAccount } from "@/hooks/auth.hooks";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VerifyForm = ({ token }: { token: string }) => {
  const { mutate: verify, isPending } = useVerifyAccount();
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleComplete = (value: string) => {
    setCode(value);
  };

  const handleVerify = () => {
    verify(
      { activateCode: code, token },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({
              title: "Success",
              description: data?.message,
            });
            router.push(`/sign-in`);
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
    <div className="space-y-6 mt-5">
      <div className="flex justify-center">
        <InputOTP
          maxLength={4}
          value={code}
          onChange={(value) => setCode(value)}
          onComplete={handleComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center">
        <Button
          type="submit"
          className="w-full bg-burgundy hover:bg-burgundy/90 text-white flex items-center justify-center"
          disabled={isPending || code.length !== 4}
          onClick={handleVerify}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VerifyForm;
