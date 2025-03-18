import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/lib/user.provider";
import { TCareCare, TMessages } from "@/type";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import {
  useChangeCarCareStatus,
  useCreateCarCareSendMessage,
  useGetSingleCarCare,
} from "@/hooks/carcare.hooks";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue: TCareCare;
};

const SupportViewModal = ({ isOpen, setIsOpen, defaultValue }: Props) => {
  const { user } = useUser();
  const [replyMessage, setReplyMessage] = useState("");
  const { mutate, isPending } = useCreateCarCareSendMessage();
  const { data, refetch, isLoading } = useGetSingleCarCare(defaultValue?._id);
  const { mutate: statusChange, isPending: isStatusPending } =
    useChangeCarCareStatus();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.data?.messages]);

  const sendMessage = () => {
    const payload = {
      name: user?.role === "user" ? user?.lastName : "Admin",
      role: user?.role as string,
      time: new Date(),
      message: replyMessage,
    };
    mutate(
      { id: defaultValue?._id, payload: payload },
      {
        onSuccess: () => {
          refetch();
          setReplyMessage("");
        },
      }
    );
  };

  const handleStatus = () => {
    statusChange(defaultValue?._id, {
      onSuccess: (data) => {
        refetch();
        setIsOpen(false);
        toast({
          title: data?.success ? "Success" : "Failed",
          description: data?.message,
          variant: data?.success ? "default" : "destructive",
        });
      },
    });
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-full max-w-lg bg-white py-6 px-0 md:p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Support Ticket Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className="max-h-60 px-3">
          {/* Ticket Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.data?.location && (
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{data?.data?.location}</p>
              </div>
            )}
            {data?.data?.issueDate && (
              <div>
                <p className="text-sm text-muted-foreground">Date of Issue</p>
                <p className="font-medium">
                  {new Date(data?.data?.issueDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {data?.data?.damageDescription && (
              <div>
                <p className="text-sm text-muted-foreground">Damage</p>
                <p className="font-medium">{data?.data?.damageDescription}</p>
              </div>
            )}
            <div>
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

          <div className="mt-5 mb-4">
            <p className="text-sm text-muted-foreground">Additional Notes</p>
            <p className="mt-1">{data?.data?.note}</p>
          </div>

          {/* Photos Section */}
          {data?.data?.images?.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Photos</p>
              <div className="grid grid-cols-3 gap-4">
                {data?.data?.images?.map(
                  (photo: { url: string }, index: number) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={photo.url}
                        alt={`Issue photo ${index + 1}`}
                        className="object-cover rounded-lg w-full h-full"
                        fill
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Messages Section */}
          <div className="space-y-4 mt-3">
            <h3 className="font-semibold">Message History</h3>
            {data?.data?.messages?.map((message: TMessages) => (
              <div
                key={message.time}
                className={`p-3 md:p-4 rounded-lg my-3 max-w-[90%] md:max-w-[80%] ${
                  user?.role == message.role && "ml-auto"
                } ${
                  message.role === "admin"
                    ? "bg-gray-800 text-white self-end"
                    : "bg-gray-200 text-black self-start "
                }`}
                style={{
                  alignSelf:
                    message.role === "admin" ? "flex-end" : "flex-start",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-xs">{message.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(message.time).toLocaleString()}
                  </p>
                </div>
                <p className="text-xs md:text-sm">{message.message}</p>
              </div>
            ))}
          </div>

          {/* Reply Section */}
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
                    disabled={isStatusPending}
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
                    "  Send Message"
                  ) : (
                    "  Send Reply"
                  )}
                </Button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SupportViewModal;
