import { Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const CRMultiFile = ({
  images,
  setImages,
  required = false,
}: {
  images: (File | string)[]; // Accept mixed type array
  setImages: Dispatch<SetStateAction<(File | string)[]>>;
  required?: boolean;
}) => {
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []) as File[];

    // Check for image limit
    if (images.length + newFiles.length > 6) {
      toast({
        title: "Error",
        description: "Maximum of 6 photos allowed",
        variant: "destructive",
      });
      return;
    }

    // Update image state
    setImages((prev) => [...prev, ...newFiles]);
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Drag-and-Drop Box */}
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          required={required}
        />
        <Label htmlFor="images" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 10MB each
          </p>
        </Label>
      </div>

      {/* Image Previews */}
      {images?.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images?.map((file, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg"
            >
              <Image
                src={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
                width={500}
                height={500}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-1.5"
                onClick={() => handleRemoveImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CRMultiFile;
