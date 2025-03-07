"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import Link from "next/link";
import { useCreateCarCare } from "@/hooks/carcare.hooks";
import { useUser } from "@/lib/user.provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CRMultiFile from "../Shared/CRMultiFile";

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

const issueTypes = [
  { name: "Car Care", value: "carcare" },
  { name: "General Support", value: "generalsupport" },
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
  const { control, handleSubmit, watch } = useForm();
  const selectedType = watch("typeOfIssue", "carcare");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const payload = { ...data, userId: user?._id };
    formData.append("data", JSON.stringify(payload));
    images.forEach((image) => formData.append("images", image));

    createCarCare(formData, {
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: data?.success
            ? "Ticket Created Successfully"
            : "Failed to Create Ticket",
          description: data?.message,
          variant: data?.success ? "default" : "destructive",
        });
        if (data?.success) {
          refetch();
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
            Add New Ticket
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ScrollArea className="h-72">
            <div className="space-y-2 px-3">
              {/* Type of Issue */}
              <Controller
                control={control}
                name="typeOfIssue"
                rules={{ required: true }}
                defaultValue="carcare"
                render={({ field }) => (
                  <div>
                    <Label>Type of Issue</Label>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              {/* Issue */}
              <Controller
                control={control}
                name="issue"
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <Label>Issue</Label>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonCarIssues.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              {selectedType === "carcare" && (
                <>
                  {/* Location */}
                  <Controller
                    control={control}
                    rules={{ required: selectedType === "carcare" }}
                    name="location"
                    render={({ field }) => (
                      <div>
                        <Link href="https://what3words.com/outcasts.dozens.starters">
                          <Button
                            variant="link"
                            type="button"
                            className="p-0 -mb-2"
                          >
                            Location (what3words or home)
                          </Button>
                        </Link>
                        <Input
                          required={selectedType === "carcare"}
                          {...field}
                        />
                      </div>
                    )}
                  />

                  {/* Date of Issue */}
                  <Controller
                    control={control}
                    name="issueDate"
                    rules={{ required: selectedType === "carcare" }}
                    render={({ field }) => (
                      <div>
                        <Label>Date of Issue</Label>
                        <Input
                          required={selectedType === "carcare"}
                          type="date"
                          {...field}
                        />
                      </div>
                    )}
                  />

                  {/* Damage Description */}
                  <Controller
                    control={control}
                    name="damageDescription"
                    rules={{ required: selectedType === "carcare" }}
                    render={({ field }) => (
                      <div>
                        <Label>Damage Description (N/A if none)</Label>
                        <Input
                          required={selectedType === "carcare"}
                          {...field}
                        />
                      </div>
                    )}
                  />

                  {/* Priority Level */}
                </>
              )}

              <Controller
                control={control}
                name="priority"
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <Label>Priority Level</Label>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {["High", "Medium", "Low"].map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              {/* Additional Notes */}
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea required {...field} />
                  </div>
                )}
              />

              {/* Upload Photos */}
              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <CRMultiFile images={images} setImages={setImages} />
              </div>
            </div>
          </ScrollArea>

          {/* Submit & Cancel Buttons */}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarCareModal;
