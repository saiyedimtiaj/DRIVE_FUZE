"use client";
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CRform from "../Shared/CRForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetCurrentUser, useUpdateDealer } from "@/hooks/auth.hooks";
import CRInput from "../Shared/CRInput";
import CRSelect from "../Shared/CRSelect";
import LoaderScreen from "../Shared/Loader";

const BUSINESS_TYPES = [
  { name: "Franchise Dealer", value: "Franchise Dealer" },
  { name: "Independent Dealer", value: "Independent Dealer" },
  { name: "Other", value: "Other" },
];

const COUNTRIES = [
  { name: "England", value: "England" },
  { name: "Scotland", value: "Scotland" },
  { name: "Northern Ireland", value: "Northern Ireland" },
  { name: "Wales", value: "Wales" },
];

export default function DealerUpdateInfo() {
  const { data, isLoading } = useGetCurrentUser();
  const { mutate: update, isPending } = useUpdateDealer();
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<FieldValues> = (formData) => {
    update(
      { dealerId: data?.data?._id, payload: formData },
      {
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
      }
    );
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <Link
        href="/dealer/inventory"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your dealer account information and preferences
        </p>
      </div>

      <CRform onSubmit={handleSubmit}>
        {/* Business Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CRInput
              name="firstName"
              label="Dealer First Name"
              defaultValue={data?.data?.firstName}
            />
            <CRSelect
              name="businessType"
              label="Business Type"
              items={BUSINESS_TYPES}
              defaultValue={data?.data?.businessType}
            />
            <CRInput
              name="lastName"
              label="Dealer Last Name"
              defaultValue={data?.data?.lastName}
            />
            <CRInput
              name="companyRegNumber"
              label="Company Registration Number"
              defaultValue={data?.data?.companyRegNumber}
            />
            <CRInput
              name="fcaRegNumber"
              label="FCA Registration Number"
              defaultValue={data?.data?.fcaRegNumber}
            />
            <CRInput
              name="vatNumber"
              label="VAT Number"
              defaultValue={data?.data?.vatNumber}
            />
          </div>
        </Card>

        {/* Primary Contact */}
        <Card className="p-6 mt-7">
          <h2 className="text-xl font-semibold mb-4">Primary Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CRInput
              name="primaryRole"
              label="Role"
              defaultValue={data?.data?.primaryRole}
            />
            <CRInput
              name="email"
              label="Email"
              type="email"
              onlyRead
              defaultValue={data?.data?.email}
            />
            <CRInput
              name="phone"
              label="Phone"
              defaultValue={data?.data?.phone}
            />
          </div>
        </Card>

        {/* Secondary Contact */}
        <Card className="p-6 mt-7">
          <h2 className="text-xl font-semibold mb-4">Secondary Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CRInput
              name="secondaryRole"
              defaultValue={data?.data?.secondaryRole}
              label="Role"
            />
            <CRInput
              name="secondaryEmail"
              defaultValue={data?.data?.secondaryEmail}
              label="Email"
              type="email"
            />
            <CRInput
              name="secondaryPhone"
              defaultValue={data?.data?.secondaryPhone}
              label="Phone"
            />
          </div>
        </Card>

        {/* Business Address */}
        <Card className="p-6 mt-7">
          <h2 className="text-xl font-semibold mb-4">Business Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CRInput
              name="street"
              label="Street Address"
              defaultValue={data?.data?.street}
            />
            <CRInput name="city" label="City" defaultValue={data?.data?.city} />
            <CRInput
              name="postcode"
              label="Postcode"
              defaultValue={data?.data?.postcode}
            />
            <CRSelect
              name="country"
              defaultValue={data?.data?.country}
              label="Country"
              items={COUNTRIES}
            />
          </div>
        </Card>

        {/* Operating Hours */}
        <Card className="p-6 mt-7">
          <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
          <CRInput
            name="operatingHours"
            defaultValue={data?.data?.operatingHours}
            label="Hours of Operation"
            placeholder="e.g., Mon-Fri, 9:00 AM - 5:00 PM"
          />
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
