import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { useUser } from "@/lib/user.provider";
import { TMessages } from "@/type";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import {
  useChangeSupportStatus,
  useDealerSupportSendMessage,
  useGetSingleDealerSupport,
} from "@/hooks/dealerSupport.hooks";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultId: string;
};

const DealerSendMessageModal = ({ isOpen, setIsOpen, defaultId }: Props) => {
  const { user } = useUser();
  const [replyMessage, setReplyMessage] = useState("");
  const { mutate, isPending } = useDealerSupportSendMessage();
  const { data, refetch, isLoading } = useGetSingleDealerSupport(defaultId);
  const { mutate: statusChange, isPending: isStatusPanding } =
    useChangeSupportStatus();

  const sendMessage = () => {
    const payload = {
      name: user?.role === "dealer" ? user?.lastName : "Admin",
      role: user?.role as string,
      time: new Date(),
      message: replyMessage,
    };
    mutate(
      { id: defaultId, payload: payload },
      {
        onSuccess: () => {
          refetch();
          setReplyMessage("");
        },
      }
    );
  };

  const handleStatus = () => {
    statusChange(defaultId, {
      onSuccess: (data) => {
        refetch();
        setIsOpen(false);
        toast({
          title: data?.success ? "Success" : "Failde",
          description: data?.message,
          variant: data?.success ? "default" : "destructive",
        });
      },
    });
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-full max-w-lg bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Support Ticket Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className="h-72 px-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Issue</p>
              <p className="font-medium">{data?.data?.issue}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Date of Issue</p>
              <p className="font-medium">
                {new Date(data?.data?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-muted-foreground">Issue Type</p>
              <p className="font-medium">{data?.data?.issueType}</p>
            </div>
            <div className="">
              <p className="text-sm text-muted-foreground">Priority Level</p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  data?.data?.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : data?.data?.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {data?.data?.priority}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm text-muted-foreground">Additional Notes</p>
            <p className="mt-1">{data?.data?.note}</p>
          </div>

          <div className="space-y-4 mt-4">
            <h3 className="font-semibold">Message History</h3>
            <ScrollArea className="space-y-4 h-[300px]">
              {data?.data?.messages?.map((message: TMessages) => (
                <div
                  key={message.time}
                  className={`p-4 rounded-lg my-3 ${
                    message.role === "dealer"
                      ? "bg-burgundy/10 ml-8"
                      : "bg-gray-100 mr-8"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-xs">{message.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.time).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm">{message.message}</p>
                </div>
              ))}
            </ScrollArea>
          </div>

          {data?.data?.status !== "resolve" && (
            <div className="space-y-4 px-1 mt-4">
              <Textarea
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="min-h-[40px]"
              />
              <div className="flex justify-end gap-3">
                {user?.role === "admin" && (
                  <Button
                    disabled={isStatusPanding}
                    onClick={handleStatus}
                    type="button"
                  >
                    Mark Resolve
                  </Button>
                )}
                <Button
                  onClick={sendMessage}
                  disabled={!replyMessage.trim() || isPending}
                  className="bg-burgundy hover:bg-burgundy/90 text-white"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : user?.role === "admin" ? (
                    "Send Reply"
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DealerSendMessageModal;
