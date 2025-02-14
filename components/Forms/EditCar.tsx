"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { Card } from "../ui/card";
import CRInput from "../Shared/CRInput";
import CRSelect from "../Shared/CRSelect";
import { fuelTypeSelectItems } from "@/constant";
import { Button } from "../ui/button";
import CRform from "../Shared/CRForm";
import { toast } from "@/hooks/use-toast";
import { useGetSingleCars, useUpdateCar } from "@/hooks/car.hooks";
import { useEffect, useState } from "react";
import CRMultiFile from "../Shared/CRMultiFile";
import { Loader } from "lucide-react";
import CRTextEditor from "../Shared/CRTextEditor";
import { useParams, useRouter } from "next/navigation";
import LoaderScreen from "../Shared/Loader";

const EditCar = () => {
  const { id } = useParams();
  const [images, setImages] = useState<(File | string)[]>([]);
  const { mutate: updateCar, isPending } = useUpdateCar();
  const { data, isLoading } = useGetSingleCars(id as string);
  const route = useRouter();

  useEffect(() => {
    setImages(data?.data?.images);
  }, [data]);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.set("data", JSON.stringify(data));

    const existingImags: string[] = [];

    images.forEach((image) => {
      if (typeof image === "string") {
        existingImags.push(image);
      } else if (image instanceof File) {
        formData.append("images", image);
      }
    });

    if (existingImags.length > 0) {
      formData.set("existingImags", JSON.stringify(existingImags));
    }
    updateCar(
      { id: id as string, payload: formData },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data?.success) {
            toast({
              title: "Success",
              description: data?.message,
            });
            route.push("/dealer/inventory");
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
      <div className="space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="w-full mb-4">
            <CRInput
              name="registrationNumber"
              disabled
              label="Registration Number*"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <CRInput name="model" label="Vehicle Name*" />
            </div>
            <div className="space-y-2">
              <CRInput name="brand" label="Brand*" />
            </div>
            <div className="space-y-2">
              {" "}
              <CRInput label="Variant*" name="variant" placeholder="Liv" />
            </div>
            <div className="space-y-2">
              <CRInput label="Year*" name="yearOfManufacture" />
            </div>
            <div className="space-y-2">
              <CRSelect
                label="Fuel type"
                name="fuelType"
                placeholder="Fuel type"
                items={fuelTypeSelectItems}
              />
            </div>
            <div className="space-y-2">
              <CRInput label="Price*" name="price" type="number" />
            </div>
            <div className="space-y-2">
              <CRInput label="Mileage*" name="mileage" type="number" />
            </div>
            <div className="space-y-2">
              <CRInput label="Location*" name="location" />
            </div>
          </div>
        </Card>

        {/* Technical Specifications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <CRInput label="colour" name="colour" />
            </div>
            <div className="space-y-2">
              <CRInput label="C02 emissions (g/km)" name="co2Emissions" />
            </div>
            <div className="space-y-2">
              <CRInput label="Gearbox" name="gearbox" />
            </div>
            <div className="space-y-2">
              <CRInput
                label="Engine size (cc)"
                name="engineCapacity"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <CRInput
                label="Electric Range (km)"
                name="electricRange"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <CRInput label="Drive Train" name="driveTrain" />
            </div>
            <div className="space-y-2">
              <CRInput label="Euro Status" name="euroStatus" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-3 mt-5">
            Upload Vehicle Images
          </h2>
          <CRMultiFile images={images} setImages={setImages} />
        </Card>

        {/* Vehicle Description */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Description</h2>
          <div className="h-[200px]">
            <CRTextEditor name="details" />
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <>
                <Loader size={25} className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Submit for Review"
            )}
          </Button>
        </div>
      </div>
    </CRform>
  );
};

export default EditCar;
