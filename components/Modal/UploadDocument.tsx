import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageUpload: (image: File | null) => void;
};

const UploadDocument = ({ isOpen, setIsOpen, handleImageUpload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      handleImageUpload(selectedFile); // Pass the file object for upload
      setIsOpen(false); // Close the modal
      setSelectedFile(null); // Clear the selected file
    }
  };

  const handleRemoveClick = () => {
    setSelectedFile(null); // Remove the selected file
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null); // Reset if modal is closed without uploading
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {selectedFile ? (
            <div className="space-y-2 relative">
              <Image
                width={500}
                height={600}
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Preview"
                className="w-full h-40 object-contain border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleRemoveClick}
                className="absolute top-1 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition"
              >
                <FiX size={18} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <UploadCloud className="text-gray-400 w-12 h-12 mb-2" />
              <span className="text-sm text-gray-600">
                Click to browse file
              </span>
              <span className="text-xs text-gray-500">JPG, JPEG, or PNG</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <Button
            className="w-full mt-4"
            onClick={handleUploadClick}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocument;
