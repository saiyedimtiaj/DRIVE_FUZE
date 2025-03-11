"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  useGetSingleCustomerCheck,
  useUpdateRiskScore,
} from "@/hooks/customerCheck.hooks";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

export interface VerificationStatus {
  identityCheck: string;
  DVLACheck: string;
  creditCheck: string;
  drivingLicenseFront: string;
  aditionalDrivingLicenseFront?: string;
  drivingLicenseBack: string;
  aditionalDrivingLicenseBack?: string;
  proofOfAddress: string;
  aditionalProofOfAddress?: string;
  score?: number;
  status?: string;
}

export interface VerificationStatus {
  identityCheck: string;
  DVLACheck: string;
  creditCheck: string;
  drivingLicenseFront: string;
  aditionalDrivingLicenseFront?: string;
  drivingLicenseBack: string;
  aditionalDrivingLicenseBack?: string;
  proofOfAddress: string;
  aditionalProofOfAddress?: string;
  score?: number;
  status?: string;
}

export default function AssessMentDetails({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleCustomerCheck(id);
  const { mutate: update, isPending } = useUpdateRiskScore();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>({
      identityCheck: "",
      DVLACheck: "",
      creditCheck: "",
      drivingLicenseFront: "",
      drivingLicenseBack: "",
      proofOfAddress: "",
    });

  const calculateRiskScore = () => {
    let score = 0;

    if (verificationStatus.identityCheck === "Approved") score += 20;
    if (verificationStatus.DVLACheck === "Approved") score += 20;
    if (verificationStatus.creditCheck === "Approved") score += 20;

    // If additional documents exist, all must be approved for full points
    const hasAdditionalDocs =
      verificationStatus.aditionalDrivingLicenseFront &&
      verificationStatus.aditionalDrivingLicenseBack &&
      verificationStatus.aditionalProofOfAddress;

    if (hasAdditionalDocs) {
      if (
        verificationStatus.drivingLicenseFront === "Approved" &&
        verificationStatus.drivingLicenseBack === "Approved" &&
        verificationStatus.proofOfAddress === "Approved" &&
        verificationStatus.aditionalDrivingLicenseFront === "Approved" &&
        verificationStatus.aditionalDrivingLicenseBack === "Approved" &&
        verificationStatus.aditionalProofOfAddress === "Approved"
      ) {
        score += 20;
      }
    } else {
      if (
        verificationStatus.drivingLicenseFront === "Approved" &&
        verificationStatus.drivingLicenseBack === "Approved" &&
        verificationStatus.proofOfAddress === "Approved"
      ) {
        score += 20;
      }
    }

    return Math.min(100, Math.max(0, score));
  };

  const calculateStatus = () => {
    const statuses = Object.values(verificationStatus);
    if (statuses.includes("Declined")) return "Flagged";
    if (statuses.every((status) => status === "Approved")) return "Verified";
    return "Pending Review";
  };

  const handleStatusChange = (
    field: keyof VerificationStatus,
    value: string
  ) => {
    setVerificationStatus((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    const newScore = calculateRiskScore();
    update(
      {
        id: data?.data?._id,
        payload: {
          ...verificationStatus,
          score: newScore,
          status: calculateStatus(),
        },
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            toast({ title: "Success", description: data?.message });
            router.push("/admin/risk-assessment");
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

  useEffect(() => {
    if (data?.data) {
      setVerificationStatus({
        identityCheck: data.data.identityCheck || "",
        DVLACheck: data.data.DVLACheck || "",
        creditCheck: data.data.creditCheck || "",
        drivingLicenseFront: data.data.drivingLicenseFront || "",
        drivingLicenseBack: data.data.drivingLicenseBack || "",
        proofOfAddress: data.data.proofOfAddress || "",
        aditionalDrivingLicenseFront:
          data.data.aditionalDrivingLicenseFront || "",
        aditionalDrivingLicenseBack:
          data.data.aditionalDrivingLicenseBack || "",
        aditionalProofOfAddress: data.data.aditionalProofOfAddress || "",
      });
    }
  }, [data]);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="container mx-auto pb-8">
      <Link
        href="/admin/risk-assessment"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Risk Assessment
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Customer Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium space-x-2">
                  <span> {data?.data?.requestId?.customerInfo?.firstName}</span>

                  <span>{data?.data?.requestId?.customerInfo?.lastName}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">
                  {data?.data?.requestId?.customerInfo?.gender}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Name</p>
                {data?.data?.requestId?.customerInfo?.preferredName}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">License Number</p>
                {data?.data?.requestId?.customerInfo?.licenseNumber}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                {data?.data?.requestId?.customerInfo?.email}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                {data?.data?.requestId?.customerInfo?.phoneNumber}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Employment Status
                </p>
                <p className="font-medium">
                  {data?.data?.requestId?.customerInfo?.employmentStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="font-medium">
                  {data?.data?.requestId?.customerInfo?.jobTitle}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Salary</p>
                <p className="font-medium">
                  £{data?.data?.requestId?.customerInfo?.salary}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {data?.data?.requestId?.address?.addressLine1}
                </p>
              </div>
            </div>
          </Card>

          {data?.data?.requestId?.aditionalDriver === "yes" && (
            <Card className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Aditional Driver Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium space-x-2">
                    <span>
                      {" "}
                      {data?.data?.requestId?.aditionalDriverInfo?.firstName}
                    </span>

                    <span>
                      {data?.data?.requestId?.aditionalDriverInfo?.lastName}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">
                    {data?.data?.requestId?.aditionalDriverInfo?.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    License Number
                  </p>
                  {data?.data?.requestId?.aditionalDriverInfo?.licenseNumber}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  {data?.data?.requestId?.aditionalDriverInfo?.email}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  {data?.data?.requestId?.aditionalDriverInfo?.phone}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Employment Status
                  </p>
                  <p className="font-medium">
                    {
                      data?.data?.requestId?.aditionalDriverInfo
                        ?.employmentStatus
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-medium">
                    {data?.data?.requestId?.aditionalDriverInfo?.jobTitle}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Verification Checks
            </h2>

            <div className="space-y-6">
              {/* Identity Check */}
              <div className="flex md:flex-row flex-col-reverse gap-5 md:gap-0 md:items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Identity Check</label>
                  <Select
                    value={verificationStatus.identityCheck}
                    onValueChange={(value) =>
                      handleStatusChange("identityCheck", value)
                    }
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="flex items-center">
                  View Site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* DVLA Check */}
              <div className="space-y-1">
                <label className="text-sm font-medium">DVLA Check</label>
                <Select
                  value={verificationStatus.DVLACheck}
                  onValueChange={(value) =>
                    handleStatusChange("DVLACheck", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Declined">Declined</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Credit Check */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Credit Check</label>
                <Select
                  value={verificationStatus.creditCheck}
                  onValueChange={(value) =>
                    handleStatusChange("creditCheck", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Declined">Declined</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Document Verification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Driving License Front */}
              <div className="space-y-4">
                <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Driving License Front</h3>
                    <Button variant="outline" size="sm">
                      <a
                        href={data?.data?.primaryDriverFrontOfDrivingLicense}
                        download={true}
                        className="flex items-center "
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    File: driving-license-front.jpg
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={verificationStatus.drivingLicenseFront}
                    onValueChange={(value) =>
                      handleStatusChange("drivingLicenseFront", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Driving License Back */}
              <div className="space-y-4">
                <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Driving License Back</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <a
                        href={data?.data?.primaryDriverBackOfDrivingLicense}
                        download={true}
                        className="flex items-center "
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    File: driving-license-back.jpg
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={verificationStatus.drivingLicenseBack}
                    onValueChange={(value) =>
                      handleStatusChange("drivingLicenseBack", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Proof of Address */}
              <div className="space-y-4">
                <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Proof of Address</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <a
                        href={data?.data?.primaryDriverProofOfAddress}
                        download={true}
                        className="flex items-center "
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    File: proof-of-address.jpg
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={verificationStatus.proofOfAddress}
                    onValueChange={(value) =>
                      handleStatusChange("proofOfAddress", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Declined">Declined</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {data?.data?.requestId?.aditionalDriver === "yes" && (
            <Card className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Aditional Driver Document Verification
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Driving License Front */}
                <div className="space-y-4">
                  <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Driving License Front</h3>
                      <Button variant="outline" size="sm">
                        <a
                          href={
                            data?.data?.additionalDriverFrontOfDrivingLicense
                          }
                          download={true}
                          className="flex items-center "
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      File: driving-license-front.jpg
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={verificationStatus.aditionalDrivingLicenseFront}
                      onValueChange={(value) =>
                        handleStatusChange(
                          "aditionalDrivingLicenseFront",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Driving License Back */}
                <div className="space-y-4">
                  <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Driving License Back</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <a
                          href={
                            data?.data?.additionalDriverBackOfDrivingLicense
                          }
                          download={true}
                          className="flex items-center "
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      File: driving-license-back.jpg
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={verificationStatus.aditionalDrivingLicenseBack}
                      onValueChange={(value) =>
                        handleStatusChange("aditionalDrivingLicenseBack", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Proof of Address */}
                <div className="space-y-4">
                  <div className="p-3 md:p-6 border-2 border-dashed rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Proof of Address</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <a
                          href={data?.data?.additionalDriverProofOfAddress}
                          download={true}
                          className="flex items-center "
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      File: proof-of-address.jpg
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                      value={verificationStatus.aditionalProofOfAddress}
                      onValueChange={(value) =>
                        handleStatusChange("aditionalProofOfAddress", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Risk Score Summary */}
        <div className="space-y-6">
          <Card className="p-4 md:p-6">
            <h2 className="text-xl font-bold mb-6">Risk Score</h2>

            <div className="space-y-3">
              <div className="text-center">
                <Progress value={calculateRiskScore()} className="h-4 mb-5" />
                <span className="text-3xl font-bold">
                  {calculateRiskScore()}
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {data?.data?.updatedAt?.slice(0, 10)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Subscription Duration
                  </p>
                  <p className="font-medium">501 days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{calculateStatus()}</p>
                </div>
              </div>

              <Button
                className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
                onClick={handleUpdate}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Risk Assessment"
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-semibold mb-4">Risk Score Breakdown</h3>
            <div className="space-y-2 text-sm">
              <p>• Identity Check: 20 points</p>
              <p>• DVLA Check: 20 points</p>
              <p>• Credit Check: 20 points</p>
              <p>• Document Verification: 20 points</p>
              <p>• Assessment Recency: 10 points</p>
              <p>• Subscription Duration: 10 points</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
