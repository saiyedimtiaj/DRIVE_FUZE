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
import { useCreateBlog } from "@/hooks/blog.hooks";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react"; // Loading spinner
import { Label } from "../ui/label";
import CRTextEditor from "../Shared/CRTextEditor";
import CRSingleFile from "../Shared/CRSingleFile";
import { useState } from "react";

const categories = [
  { name: "Industry Insights", value: "Industry Insights" },
  { name: "Car Guide", value: "Car Guide" },
  { name: "Benefits", value: "Benefits" },
  { name: "Tips & Tricks", value: "Tips & Tricks" },
  { name: "Company Updates", value: "Company Updates" },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const CreateBlogModel = ({ isOpen, setIsOpen, refetch }: Props) => {
  const [image, setImage] = useState<File | string>("");
  const { mutate: createBlog, isPending } = useCreateBlog();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!image) {
      toast({
        title: "failed",
        description: "Image is required",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", image);

    createBlog(formData, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Blog Created Successfully",
            description: "Your blog has been created and is now live!",
          });
          refetch();
          setIsOpen(false);
        } else {
          toast({
            title: "Failed to Create Blog",
            description:
              "There was an issue creating your blog. Please try again.",
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
            Add New Blog
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <CRform onSubmit={handleSubmit}>
          <ScrollArea className="h-72">
            <div className="space-y-2 px-1">
              <div>
                <CRInput label="Blog Title" name="title" required />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full">
                  <CRSelect
                    items={categories}
                    name="category"
                    label="Category"
                    required
                  />
                </div>
                <div className="w-full">
                  <CRInput required name="author" label="Author" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <CRInput
                    required
                    name="readTime"
                    label="Read Time"
                    placeholder="eg:5 min "
                  />
                </div>
              </div>
              <div>
                <CRTextArea required name="excerpt" label="Excerpt" />
              </div>
              <div>
                <Label>Content</Label>
                <CRTextEditor name="content" />
              </div>
              <div className="pt-[70px]">
                <Label>Image</Label>
                <CRSingleFile image={image} setImage={setImage} />
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

export default CreateBlogModel;
