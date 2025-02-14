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
import CRTextArea from "../Shared/CRTextArea";
import { ScrollArea } from "../ui/scroll-area";
import CRSelect from "../Shared/CRSelect";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import { useCreateDealerSupport } from "@/hooks/dealerSupport.hooks";

const commonCarIssues = [
  { name: "System Access Issues", value: "System Access Issues" },
  { name: "Vehicle Status Updates", value: "Vehicle Status Updates" },
  { name: "Payment Processing", value: "Payment Processing" },
  { name: "Customer Management", value: "Customer Management" },
  { name: "Inventory Management", value: "Inventory Management" },
  { name: "Others", value: "Others" },
];

const issueType = [
  { name: "Technical Support", value: "Technical Support" },
  { name: "Account Management", value: "Account Management" },
  { name: "Billing Support", value: "Billing Support" },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const AddDealerSupportModal = ({ isOpen, setIsOpen, refetch }: Props) => {
  const { mutate: createTicket, isPending } = useCreateDealerSupport();
  const { user } = useUser();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    createTicket(
      { ...data, dealerId: user?._id },
      {
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
      }
    );
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

        <CRform onSubmit={handleSubmit}>
          <ScrollArea className="h-72">
            <div className="space-y-2 px-3">
              <div className="flex items-center gap-2 space-y-2">
                <div className="w-full">
                  <CRSelect
                    label="Issue"
                    required
                    name="issue"
                    items={commonCarIssues}
                  />
                </div>
                <div className="w-full">
                  <CRSelect
                    label="Type of Issue"
                    required
                    name="issueType"
                    items={issueType}
                  />
                </div>
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

export default AddDealerSupportModal;
