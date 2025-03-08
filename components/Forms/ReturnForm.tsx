import Image from "next/image";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React, { useState } from "react";
import { TReturnDetails } from "@/type";

type Props = {
  returnDetails: TReturnDetails;
  setReturnDetails: React.Dispatch<React.SetStateAction<TReturnDetails>>;
  startingMileage: number;
  images: File[] | undefined;
  setImages: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  pdiDocument: File | null;
  setPdiDocument: React.Dispatch<React.SetStateAction<File | null>>;
};

const ReturnForm = ({
  returnDetails,
  setReturnDetails,
  startingMileage,
  images,
  setImages,
  pdiDocument,
  setPdiDocument,
}: Props) => {
  const [currentReturnPhoto, setCurrentReturnPhoto] = useState(0);

  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setImages((prev) => (prev ? [...prev, ...newPhotos] : newPhotos));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setImages((prev) => {
      if (!prev) return [];
      return prev.filter((_, i) => i !== index);
    });
  };

  const calculateMileageDifference = () => {
    if (returnDetails.currentMileage === null) return null;
    return returnDetails.currentMileage - startingMileage;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">At Return</h3>
      <div className="space-y-6">
        <div>
          <Label className="text-muted-foreground">Return Date & Time</Label>
          <Input
            required
            type="datetime-local"
            value={returnDetails.date}
            onChange={(e) =>
              setReturnDetails((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-muted-foreground">Return PDI Document</Label>
          <div className="mt-2">
            <Input
              required
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPdiDocument(e.target.files[0]);
                }
              }}
            />
            {pdiDocument && (
              <p className="text-sm text-muted-foreground mt-1">
                Uploaded: {pdiDocument.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">Return Photos</Label>
          {images && images.length > 0 ? (
            <>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mt-2 mb-4">
                <Image
                  src={URL?.createObjectURL(images[currentReturnPhoto])}
                  alt="Car return photo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden ${
                      currentReturnPhoto === index ? "ring-2 ring-burgundy" : ""
                    }`}
                    onClick={() => setCurrentReturnPhoto(index)}
                  >
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto(index);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-2">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotosUpload}
                required
              />
            </div>
          )}
        </div>

        <div>
          <Label className="text-muted-foreground">Dealer Comments</Label>
          <Input
            required
            value={returnDetails.dealerComments}
            onChange={(e) =>
              setReturnDetails((prev) => ({
                ...prev,
                dealerComments: e.target.value,
              }))
            }
            placeholder="Add comments about the return condition"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-muted-foreground">Customer Comments</Label>
          <Input
            required
            value={returnDetails.customerComments}
            onChange={(e) =>
              setReturnDetails((prev) => ({
                ...prev,
                customerComments: e.target.value,
              }))
            }
            placeholder="Customer comments about the return"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Current Mileage</Label>
            <Input
              required
              type="number"
              value={returnDetails.currentMileage || ""}
              onChange={(e) =>
                setReturnDetails((prev) => ({
                  ...prev,
                  currentMileage: parseInt(e.target.value),
                }))
              }
              className="mt-1"
            />
            {calculateMileageDifference() !== null && (
              <p className="text-sm text-muted-foreground mt-1">
                Total miles driven:{" "}
                {calculateMileageDifference()?.toLocaleString()}
              </p>
            )}
          </div>
          <div>
            <Label className="text-muted-foreground">Fuel Level</Label>
            <Select
              required
              value={returnDetails.fuelLevel}
              onValueChange={(value) =>
                setReturnDetails((prev) => ({
                  ...prev,
                  fuelLevel: value,
                }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select fuel level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Empty">Empty</SelectItem>
                <SelectItem value="Quarter">Quarter</SelectItem>
                <SelectItem value="Half">Half</SelectItem>
                <SelectItem value="Three Quarters">Three Quarters</SelectItem>
                <SelectItem value="Full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReturnForm;
