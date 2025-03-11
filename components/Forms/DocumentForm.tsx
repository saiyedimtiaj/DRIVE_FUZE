"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/user.provider";
import { useGetSingleRequestsQuery } from "@/hooks/request.hooks";
import {
  useCreateCustomer,
  useGetByRequestCustomerCheck,
  useUpdateCustomerCheck,
} from "@/hooks/customerCheck.hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import CRSingleFile from "../Shared/CRSingleFile";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import LoaderScreen from "../Shared/Loader";

const Documents = ({ id, bookingId }: { id: string; bookingId: string }) => {
  const { data, isLoading } = useGetSingleRequestsQuery(bookingId);
  const { user } = useUser();
  const { data: customerCheckData, isLoading: isCustomerCheckLoading } =
    useGetByRequestCustomerCheck(bookingId);
  const [frontLicenseImage, setFrontLicenseImage] = useState<File | string>("");
  const [backLicenseImage, setBackLicenseImage] = useState<File | string>("");
  const [proofOfAddressImage, setProofOfAddressImage] = useState<File | string>(
    ""
  );
  const router = useRouter();
  const [frontLicenseImageAdditional, setFrontLicenseImageAdditional] =
    useState<File | string>("");
  const [backLicenseImageAdditional, setBackLicenseImageAdditional] = useState<
    File | string
  >("");
  const [proofOfAddressImageAdditional, setProofOfAddressImageAdditional] =
    useState<File | string>("");

  const { mutate: createCustomerCheck, isPending } = useCreateCustomer();
  const { mutate: updateCustomerCheck, isPending: isUpdatePanding } =
    useUpdateCustomerCheck();

  useEffect(() => {
    if (customerCheckData) {
      if (customerCheckData?.data) {
        if (customerCheckData?.data?.primaryDriverFrontOfDrivingLicense) {
          setFrontLicenseImage(
            customerCheckData?.data?.primaryDriverFrontOfDrivingLicense
          );
        }
        if (customerCheckData?.data?.primaryDriverBackOfDrivingLicense) {
          setBackLicenseImage(
            customerCheckData?.data?.primaryDriverBackOfDrivingLicense
          );
        }
        if (customerCheckData?.data?.primaryDriverProofOfAddress) {
          setProofOfAddressImage(
            customerCheckData?.data?.primaryDriverProofOfAddress
          );
        }
      }
    }
    if (data?.data?.aditionalDriver === "yes") {
      if (customerCheckData) {
        if (customerCheckData?.data) {
          if (customerCheckData?.data?.additionalDriverFrontOfDrivingLicense) {
            setFrontLicenseImageAdditional(
              customerCheckData?.data?.additionalDriverFrontOfDrivingLicense
            );
          }
          if (customerCheckData?.data?.additionalDriverBackOfDrivingLicense) {
            setBackLicenseImageAdditional(
              customerCheckData?.data?.additionalDriverBackOfDrivingLicense
            );
          }
          if (customerCheckData?.data?.additionalDriverProofOfAddress) {
            setProofOfAddressImageAdditional(
              customerCheckData?.data?.additionalDriverProofOfAddress
            );
          }
        }
      }
    }
  }, [customerCheckData, data?.data?.aditionalDriver]);

  const allDocumentsSuccessful =
    frontLicenseImage &&
    backLicenseImage &&
    proofOfAddressImage &&
    (data?.data?.aditionalDriver !== "yes" ||
      (frontLicenseImageAdditional &&
        backLicenseImageAdditional &&
        proofOfAddressImageAdditional));

  const handleSubmit = async () => {
    const payload = {
      requestId: bookingId,
      userId: user?._id,
      requestDate: new Date().toISOString(),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (frontLicenseImage)
      formData.append(
        "primaryDriverFrontOfDrivingLicense",
        frontLicenseImage as File
      );
    if (backLicenseImage)
      formData.append(
        "primaryDriverBackOfDrivingLicense",
        backLicenseImage as File
      );
    if (proofOfAddressImage)
      formData.append(
        "primaryDriverProofOfAddress",
        proofOfAddressImage as File
      );
    if (frontLicenseImageAdditional)
      formData.append(
        "additionalDriverFrontOfDrivingLicense",
        frontLicenseImageAdditional as File
      );
    if (backLicenseImageAdditional)
      formData.append(
        "additionalDriverBackOfDrivingLicense",
        backLicenseImageAdditional as File
      );
    if (proofOfAddressImageAdditional)
      formData.append(
        "additionalDriverProofOfAddress",
        proofOfAddressImageAdditional as File
      );

    createCustomerCheck(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast({
            title: "Success",
            description: data?.message,
          });
          router.push(`/subscribe/${id}/booking/${bookingId}/summary`);
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

  const handleUpdate = async () => {
    const formData = new FormData();
    if (frontLicenseImage as File)
      formData.append(
        "primaryDriverFrontOfDrivingLicense",
        frontLicenseImage as File
      );
    if (backLicenseImage as File)
      formData.append(
        "primaryDriverBackOfDrivingLicense",
        backLicenseImage as File
      );
    if (proofOfAddressImage as File)
      formData.append(
        "primaryDriverProofOfAddress",
        proofOfAddressImage as File
      );
    if (frontLicenseImageAdditional as File)
      formData.append(
        "additionalDriverFrontOfDrivingLicense",
        frontLicenseImageAdditional as File
      );
    if (backLicenseImageAdditional as File)
      formData.append(
        "additionalDriverBackOfDrivingLicense",
        backLicenseImageAdditional as File
      );
    if (proofOfAddressImageAdditional as File)
      formData.append(
        "additionalDriverProofOfAddress",
        proofOfAddressImageAdditional as File
      );

    formData.append(
      "data",
      JSON.stringify({ requestId: bookingId, userId: user?._id })
    );

    updateCustomerCheck(
      { id: customerCheckData?.data?._id, payload: formData },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({
              title: "Success",
              description: data?.message,
            });
            router.push(`/subscribe/${id}/booking/${bookingId}/summary`);
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

  if (isLoading || isCustomerCheckLoading) return <LoaderScreen />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Documents</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Driver Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Driver License Front</Label>
              <CRSingleFile
                name="driverLicenseFront"
                image={frontLicenseImage}
                setImage={setFrontLicenseImage}
              />
            </div>
            <div>
              <Label>Driver License Back</Label>
              <CRSingleFile
                name="driverLicenseBack"
                image={backLicenseImage}
                setImage={setBackLicenseImage}
              />
            </div>
            <div>
              <Label>Driver Proof Address</Label>
              <CRSingleFile
                name="driverProofAddress"
                image={proofOfAddressImage}
                setImage={setProofOfAddressImage}
              />
            </div>
          </div>
        </div>

        {data?.data?.aditionalDriver === "yes" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Additional Driver Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Additional License Front</Label>
                <CRSingleFile
                  name="additionalLicenseFront"
                  image={frontLicenseImageAdditional}
                  setImage={setFrontLicenseImageAdditional}
                />
              </div>
              <div>
                <Label>Additional License Back</Label>
                <CRSingleFile
                  name="additionalLicenseBack"
                  image={backLicenseImageAdditional}
                  setImage={setBackLicenseImageAdditional}
                />
              </div>
              <div>
                <Label>Additional Proof Address</Label>
                <CRSingleFile
                  name="additionalProofAddress"
                  image={proofOfAddressImageAdditional}
                  setImage={setProofOfAddressImageAdditional}
                />
              </div>
            </div>
          </div>
        )}

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Identity Verification</h3>
          <p className="text-muted-foreground mb-4">
            Please ensure all documents are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Clear and legible</li>
            <li>Valid and not expired</li>
            <li>Original documents (no photocopies)</li>
            <li>Complete (all edges visible)</li>
          </ul>
        </Card>

        <div className="flex justify-between pt-6">
          <Link
            href={`/subscribe/${id}/booking/${bookingId}/driver-information`}
          >
            <Button variant="outline">Back</Button>
          </Link>
          <Button
            disabled={!allDocumentsSuccessful || isPending || isUpdatePanding}
            onClick={customerCheckData?.data ? handleUpdate : handleSubmit}
            className="bg-burgundy hover:bg-burgundy/90 text-white"
          >
            {isPending || isUpdatePanding ? (
              <Loader2 className="animate-spin" />
            ) : (
              "  Continue to Contract"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
