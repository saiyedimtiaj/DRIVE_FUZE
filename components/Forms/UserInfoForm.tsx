"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import CRform from "../Shared/CRForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CRSelect from "../Shared/CRSelect";
import CRInput from "../Shared/CRInput";
import CRSingleFile from "../Shared/CRSingleFile";
import { useGetCurrentUser, useUpdateUserAccount } from "@/hooks/auth.hooks";

const EMPLOYMENT_STATUSES = [
  { name: "Employed Full-Time", value: "Employed Full-Time" },
  { name: "Employed Part-Time", value: "Employed Part-Time" },
  { name: "Self-Employed", value: "Self-Employed" },
  { name: "Unemployed", value: "Unemployed" },
  { name: "Student", value: "Student" },
  { name: "Retired", value: "Retired" },
];

const COUNTRIES = [
  { name: "England", value: "England" },
  { name: "Scotland", value: "Scotland" },
  { name: "Northern Ireland", value: "Northern Ireland" },
  { name: "Wales", value: "Wales" },
];

export default function UserInfo() {
  const { mutate: update, isPending } = useUpdateUserAccount();
  const { toast } = useToast();
  const [frontOfDrivingLicense, setFrontOfDrivingLicense] = useState<
    File | string
  >("");
  const [backOfDrivingLicense, setBackOfDrivingLicense] = useState<
    File | string
  >("");
  const [proofOfAddress, setProofOfAddress] = useState<File | string>("");
  const { data, isLoading } = useGetCurrentUser();

  useEffect(() => {
    setFrontOfDrivingLicense(data?.data?.frontOfDrivingLicense);
    setBackOfDrivingLicense(data?.data?.backOfDrivingLicense);
    setProofOfAddress(data?.data?.proofOfAddress);
  }, [data]);

  const handleSubmit: SubmitHandler<FieldValues> = (payload) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (frontOfDrivingLicense instanceof File) {
      formData.append("frontOfDrivingLicense", frontOfDrivingLicense);
    }
    if (backOfDrivingLicense instanceof File) {
      formData.append("backOfDrivingLicense", backOfDrivingLicense);
    }
    if (proofOfAddress instanceof File) {
      formData.append("proofOfAddress", proofOfAddress);
    }
    update(formData, {
      onSuccess: (Rdata) => {
        console.log(Rdata);
        if (Rdata.success) {
          toast({
            title: "Account Updated",
            description:
              "Your account information has been updated successfully.",
          });
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

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="pb-8">
      <Link
        href="/dashboard/my-subscription"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <CRform onSubmit={handleSubmit} defaultValues={data?.data}>
        {/* Driver Information */}
        <Card className="p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-6">Driver Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <CRSelect
                  name="gender"
                  label="Gender"
                  items={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                  ]}
                />
              </div>
              <div className="space-y-2 w-full">
                <CRInput name="firstName" label="First Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <CRInput name="lastName" label="Last Name" />
              </div>
              <div className="space-y-2 w-full">
                <CRInput name="preferredName" label="Preferred Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <CRInput name="phoneNumber" label="Phone Number" />
              </div>
              <div className="space-y-2 w-full">
                <CRInput name="email" label="Email" onlyRead />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <CRSelect
                  label="Employment Status"
                  name="employmentStatus"
                  items={EMPLOYMENT_STATUSES}
                />
              </div>
              <div className="space-y-2 w-full">
                <CRInput name="jobTitle" label="Job Title" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <CRInput name="salary" label="Salary (£/annum before tax" />
              </div>
              <div className="space-y-2 w-full">
                <CRInput name="licenseNumber" label="License Number" />
              </div>
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-4 md:p-6 mt-7">
          <h2 className="text-xl font-semibold mb-6">Address</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <CRInput name="addressLine1" label="Address Line 1" />
            </div>
            <div className="space-y-2">
              <CRInput name="addressLine2" label="Address Line 2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRInput name="townCity" label="Town/City" />
              </div>
              <div className="space-y-2">
                <CRSelect name="country" label="Country" items={COUNTRIES} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRInput name="postcode" label="Postcode" />
              </div>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-4 md:p-6 mt-7">
          <h2 className="text-xl font-semibold mb-6">Documents</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Driving License Front</Label>
                <CRSingleFile
                  image={frontOfDrivingLicense}
                  setImage={setFrontOfDrivingLicense}
                  name="frontofdrivinglicense"
                />
              </div>
              <div>
                <Label>Driving License Back</Label>
                <CRSingleFile
                  image={backOfDrivingLicense}
                  setImage={setBackOfDrivingLicense}
                  name="backofdrivinglicense"
                />
              </div>
              <div>
                <Label>Proof of Address</Label>
                <CRSingleFile
                  image={proofOfAddress}
                  setImage={setProofOfAddress}
                  name="proofofaddress"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end mt-7">
          <Button
            disabled={isPending}
            type="submit"
            className="bg-burgundy hover:bg-burgundy/90 text-white"
          >
            {isPending ? (
              <>
                <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CRform>
    </div>
  );
}
