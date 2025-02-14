import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TUser } from "@/type";
import { useGetAllCustomers, useUpdateToDealer } from "@/hooks/auth.hooks";
import LoaderScreen from "../Shared/Loader";
import { toast } from "@/hooks/use-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const UserToDealerUpdate = ({ isOpen, setIsOpen, refetch }: Props) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<TUser[]>([]);
  const { data, isLoading } = useGetAllCustomers();
  const { mutate, isPending } = useUpdateToDealer();

  const handleSearch = () => {
    const results = data?.data?.filter((user: TUser) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredUsers(results);
  };

  const handleUpdateToDealer = (user: TUser) => {
    console.log(user?._id);
    mutate(user?._id, {
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: data?.sucsess ? "Sucessfull" : "Failed",
          description: data?.message,
          variant: data?.success ? "default" : "destructive",
        });
        refetch();
        setIsOpen(false);
      },
    });
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-full max-w-lg bg-white p-6 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Search User and Update to Dealer
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Search for a user by their email and update their role to Dealer.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search by Email
            </label>
            <div className="flex space-x-2 mt-2">
              <Input
                id="search"
                placeholder="Enter email address"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={handleSearch} className="px-4">
                Search
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {filteredUsers.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Search Results:</h4>
              <ul className="space-y-2">
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {user.firstName + " " + user.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateToDealer(user)}
                      disabled={user.role === "Dealer" || isPending}
                      className="text-sm"
                    >
                      {user.role === "Dealer"
                        ? "Already Dealer"
                        : "Make Dealer"}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No Results */}
          {filteredUsers.length === 0 && searchEmail && (
            <p className="text-sm text-red-500">
              No users found with this email.
            </p>
          )}

          {/* Close Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserToDealerUpdate;
