import Image from "next/image";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { IReturnDetails } from "@/type";
import { useState } from "react";

const SubReturrnDetails = ({ data }: { data: { data: IReturnDetails } }) => {
  const [currentDeliveryPhoto, setCurrentDeliveryPhoto] = useState(0);
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">At Return</h3>
      <div className="space-y-6">
        <div>
          <Label className="text-muted-foreground">Return Date & Time</Label>
          <p className="font-medium mt-1">
            {new Date(data?.data?.date).toLocaleString()}
          </p>
        </div>

        <div>
          <Label className="text-muted-foreground">Return PDI Document</Label>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-2"
          >
            <a
              href={data?.data?.pdiDocument as string}
              className="text-burgundy hover:text-burgundy/80 font-medium flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              return-pdi-document.pdf
            </a>
          </Button>
        </div>

        <div>
          <Label className="text-muted-foreground">Return Photos</Label>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mt-2 mb-4">
            <Image
              src={data?.data?.photos?.[currentDeliveryPhoto]}
              alt="Car delivery photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {data?.data?.photos.map((photo, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden ${
                  currentDeliveryPhoto === index ? "ring-2 ring-burgundy" : ""
                }`}
                onClick={() => setCurrentDeliveryPhoto(index)}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">Dealer Comments</Label>
          <p className="mt-1">{data?.data?.dealerComments}</p>
        </div>

        <div>
          <Label className="text-muted-foreground">Customer Comments</Label>
          <p className="mt-1">
            <p className="mt-1">{data?.data?.customerComments}</p>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Current Mileage</Label>
            <p className="font-medium mt-1">
              {data?.data?.currentMileage?.toLocaleString()} miles
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">Fuel Level</Label>
            <p className="font-medium mt-1">{data?.data?.fuelLevel}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SubReturrnDetails;
