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
import { useCreateTestimonial } from "@/hooks/testimonial.hooks";

const categories = [
  { name: "1 Stars", value: "1" },
  { name: "2 Stars", value: "2" },
  { name: "3 Stars", value: "3" },
  { name: "4 Stars", value: "4" },
  { name: "5 Stars", value: "5" },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const CreateTestimonialModel = ({ isOpen, setIsOpen, refetch }: Props) => {
  const { mutate: createTestimonial, isPending } = useCreateTestimonial();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    createTestimonial(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast({
            title: "Testimonial Created Successfully",
            description: "Your Testimonial has been created and is now live!",
          });
          refetch();
          setIsOpen(false);
        } else {
          toast({
            title: "Failed to Create Testimonial",
            description:
              "There was an issue creating your Testimonial. Please try again.",
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
            Add Testimonial
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <CRform onSubmit={handleSubmit}>
          <ScrollArea className="h-72">
            <div className="space-y-2 px-1">
              <div className="flex items-center flex-col md:flex-row gap-2">
                <div className="w-full">
                  <CRInput label="Customer Name" name="customerName" required />
                </div>
                <div className="w-full">
                  <CRInput label="Role" name="role" required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-full">
                  <CRSelect
                    items={categories}
                    name="rating"
                    label="Rating"
                    required
                  />
                </div>
                <div className="w-full">
                  <CRInput label="Delearship" name="delearship" />
                </div>
              </div>
              <div>
                <CRTextArea required name="testimonial" label="Testimonial" />
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

export default CreateTestimonialModel;
