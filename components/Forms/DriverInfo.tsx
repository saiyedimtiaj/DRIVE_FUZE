"use client";
import React from "react";
import CRform from "../Shared/CRForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CRSelect from "../Shared/CRSelect";
import CRInput from "../Shared/CRInput";
import { Button } from "../ui/button";
import {
  useGetSingleRequestsQuery,
  useUpdateRequest,
} from "@/hooks/request.hooks";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import LoaderScreen from "../Shared/Loader";
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

const DriverInfo = () => {
  const { id, bookingId } = useParams();
  const router = useRouter();
  const { isPending, mutate: updateRequest } = useUpdateRequest();
  const { data, isLoading } = useGetSingleRequestsQuery(bookingId as string);

  const handleSubmit: SubmitHandler<FieldValues> = (payload) => {
    updateRequest(
      { id: bookingId as string, payload },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data?.success) {
            toast({
              title: "Success",
              description: data?.message,
            });
            router.push(`/subscribe/${id}/booking/${data?.data?._id}/document`);
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

  if (isLoading) return <LoaderScreen />;

  return (
    <CRform onSubmit={handleSubmit} defaultValues={data?.data}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <CRSelect
              name="customerInfo.gender"
              label="Gender"
              items={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
              ]}
              required
            />
          </div>
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.firstName"
              label="First Name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <CRInput name="customerInfo.lastName" label="Last Name" required />
          </div>
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.preferredName"
              label="Preferred Name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.phoneNumber"
              label="Phone Number"
              required
            />
          </div>
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.email"
              label="Email"
              required
              onlyRead
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <CRSelect
              label="Employment Status"
              name="customerInfo.employmentStatus"
              items={EMPLOYMENT_STATUSES}
              required
            />
          </div>
          <div className="space-y-2 w-full">
            <CRInput name="customerInfo.jobTitle" label="Job Title" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.salary"
              label="Salary (£/annum before tax"
              required
            />
          </div>
          <div className="space-y-2 w-full">
            <CRInput
              name="customerInfo.licenseNumber"
              label="License Number"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <CRInput
              name="address.addressLine1"
              label="Address Line 1"
              required
            />
          </div>
          <div className="space-y-2">
            <CRInput
              name="address.addressLine2"
              label="Address Line 2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <CRInput name="address.townCity" label="Town/City" required />
            </div>
            <div className="space-y-2">
              <CRSelect
                name="address.country"
                label="Country"
                items={COUNTRIES}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <CRInput name="address.postcode" label="Postcode" required />
            </div>
          </div>
        </div>
      </div>

      {data?.data?.aditionalDriver && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Additional Driver Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRSelect
                  name="aditionalDriverInfo.gender"
                  label="Gender"
                  items={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                  ]}
                  //   required={aditionalDriver ? true : false}
                />
              </div>
              <div className="space-y-2">
                <CRInput
                  //   required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.firstName"
                  label="First Name"
                  placeholder="First Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRInput
                  // required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
              <CRInput
                // required={aditionalDriver ? true : false}
                name="aditionalDriverInfo.licenseNumber"
                label="License Number"
                placeholder="License Number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRInput
                  //   required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.phone"
                  label="Phone Number"
                  placeholder="Phone Number"
                />
              </div>
              <div className="space-y-2">
                <CRInput
                  // required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.email"
                  label="Email Address"
                  type="email"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRSelect
                  label="Employment Status"
                  name="aditionalDriverInfo.employmentStatus"
                  items={EMPLOYMENT_STATUSES}
                  //   required={aditionalDriver ? true : false}
                />
              </div>
              <div className="space-y-2">
                <CRInput
                  //   required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.jobTitle"
                  label="Job Title"
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <CRInput
                  // required={aditionalDriver ? true : false}
                  name="aditionalDriverInfo.salary"
                  label="Salary (£/annum before tax)"
                  placeholder="Salary"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Button className="mt-5" disabled={isPending} type="submit">
        {isPending ? (
          <>
            <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
            Pending...
          </>
        ) : (
          "Continue to Documents"
        )}
      </Button>
    </CRform>
  );
};

export default DriverInfo;
