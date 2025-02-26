"use client";

import { Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

type CRSingleFileProps = {
  image: File | string;
  setImage: Dispatch<SetStateAction<File | string>>;
  defaultImage?: string;
  name?: string;
};

const CRSingleFile = ({
  image,
  setImage,
  name = "image",
}: CRSingleFileProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (!newImage) return;

    if (newImage.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Maximum image size is 10MB.",
        variant: "destructive",
      });
      return;
    }

    setImage(newImage);
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const imageSrc =
    image instanceof File ? URL.createObjectURL(image) : (image as string);

  return (
    <div className="">
      {!image && (
        <div className="border-2 border-dashed rounded-lg p-14 text-center">
          <input
            id={name}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <Label htmlFor={name} className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </Label>
        </div>
      )}

      {image && (
        <div className="relative aspect-square border-2 border-dashed rounded-lg h-56 w-full">
          <Image
            width={500}
            height={500}
            src={imageSrc}
            alt="Preview"
            className="object-cover w-full h-56 p-2 md:p-4 rounded-lg"
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-1.5"
            onClick={handleRemoveImage}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default CRSingleFile;
