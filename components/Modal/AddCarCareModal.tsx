import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CRform from "../Shared/CRForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CRInput from "../Shared/CRInput";
import CRTextArea from "../Shared/CRTextArea";
import { ScrollArea } from "../ui/scroll-area";
import CRSelect from "../Shared/CRSelect";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react"; // Loading spinner
import { Label } from "../ui/label";
import Link from "next/link";
import { useState } from "react";
import CRMultiFile from "../Shared/CRMultiFile";
import { useCreateCarCare } from "@/hooks/carcare.hooks";
import { useUser } from "@/lib/user.provider";

const commonCarIssues = [
  { name: "Engine warning light on", value: "Engine warning light on" },
  { name: "Strange noise", value: "Strange noise" },
  { name: "Battery issues", value: "Battery issues" },
  { name: "Brake problems", value: "Brake problems" },
  {
    name: "Air conditioning not working",
    value: "Air conditioning not working",
  },
  { name: "Steering issues", value: "Steering issues" },
  { name: "Transmission problems", value: "Transmission problems" },
  { name: "Others", value: "Others" },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const AddCarCareModal = ({ isOpen, setIsOpen, refetch }: Props) => {
  const { mutate: createCarCare, isPending } = useCreateCarCare();
  const [images, setImages] = useState<(File | string)[]>([]);
  const { user } = useUser();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const payload = { ...data, userId: user?._id };
    formData.append("data", JSON.stringify(payload));

    for (const image of images) {
      formData.append("images", image);
    }

    createCarCare(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Ticket Created Successfully",
            description: data?.message,
          });
          refetch();
          setIsOpen(false);
        } else {
          toast({
            title: "Failed to Create Ticket",
            description: data?.message,
            variant: "destructive",
          });
          setIsOpen(false);
        }
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-full max-w-lg bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add New News
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <CRform onSubmit={handleSubmit}>
          <ScrollArea className="h-72">
            <div className="space-y-2 px-3">
              <div className="space-y-2">
                <CRSelect
                  label="Issue"
                  required
                  name="issue"
                  items={commonCarIssues}
                />
              </div>

              <div className="space-y-2">
                <Link href={`https://what3words.com/outcasts.dozens.starters`}>
                  <Button variant="link" className="p-0 -mb-2">
                    Location (what3words or home)
                  </Button>
                </Link>
                <CRInput
                  required
                  name="location"
                  label="location"
                  isNeedLabelShow={false}
                />
              </div>

              <div className="space-y-2">
                <CRInput
                  required
                  type="date"
                  name="issueDate"
                  label="Date of Issue"
                />
              </div>

              <div className="space-y-2">
                <CRInput
                  required
                  placeholder="Describe any damage"
                  name="damageDescription"
                  label="Damage Description (N/A if none)"
                />
              </div>

              <div className="space-y-2">
                <CRSelect
                  required
                  name="priority"
                  label="Priority Lavel"
                  items={[
                    { name: "High", value: "High" },
                    { name: "Medium", value: "Medium" },
                    { name: "Low", value: "Low" },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <CRTextArea
                  required
                  name="note"
                  placeholder="Provide any additional details"
                  label="Additional Notes"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <CRMultiFile images={images} setImages={setImages} />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex mt-4 flex-row items-center gap-4">
            <Button type="submit" className="bg-burgundy" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 bg-gray-500"
            >
              Cancel
            </Button>
          </DialogFooter>
        </CRform>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarCareModal;
