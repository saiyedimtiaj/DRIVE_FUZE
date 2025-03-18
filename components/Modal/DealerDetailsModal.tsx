/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export function DealerDetailsModal({
  dealer,
  isOpen,
  onClose,
}: {
  dealer: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!dealer) return null;

  console.log(dealer);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-4 md:p-6 max-h-[80vh] overflow-hidden flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Dealer Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] mt-2">
          <div className="space-y-6">
            <Card className="p-3 md:p-6">
              <h3 className="font-semibold mb-4">Business Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="font-medium">{dealer?.businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Company Registration
                  </p>
                  <p className="font-medium">{dealer?.companyRegNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">VAT Number</p>
                  <p className="font-medium">{dealer?.vatNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    FCA Registration
                  </p>
                  <p className="font-medium">{dealer?.fcaRegNumber}</p>
                </div>
              </div>
            </Card>

            <Card className="p-3 md:p-6">
              <h3 className="font-semibold mb-4">Address</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-muted-foreground">Street:</span>{" "}
                  {dealer?.street}
                </p>
                <p>
                  <span className="text-muted-foreground">City:</span>{" "}
                  {dealer?.city}
                </p>
                <p>
                  <span className="text-muted-foreground">Postcode:</span>{" "}
                  {dealer?.postcode}
                </p>
                <p>
                  <span className="text-muted-foreground">Country:</span>{" "}
                  {dealer?.country}
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6 mt-6">
            <Card className="p-3 md:p-6">
              <h3 className="font-semibold mb-4">Primary Contact</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-muted-foreground">Name:</span>{" "}
                  {dealer?.firstName + " " + dealer.lastName}
                </p>
                <p>
                  <span className="text-muted-foreground">Role:</span>{" "}
                  {dealer?.role}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {dealer?.email}
                </p>
                <p>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {dealer?.phone}
                </p>
              </div>
            </Card>

            <Card className="p-3 md:p-6">
              <h3 className="font-semibold mb-4">Secondary Contact</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-muted-foreground">Role:</span>{" "}
                  {dealer?.secondaryRole}
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {dealer?.secondaryEmail}
                </p>
                <p>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {dealer?.secondaryPhone}
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6 mt-6">
            <Card className="p-3 md:p-6">
              <h3 className="font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Inventory
                  </p>
                  <p className="text-2xl font-bold">{dealer.activeCarCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Subscriptions
                  </p>
                  <p className="text-2xl font-bold">
                    {dealer.activeSubscriptionCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">
                    {new Date(dealer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
