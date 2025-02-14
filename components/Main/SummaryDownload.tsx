"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useParams, useRouter } from "next/navigation";

const SummaryDownload = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const { id, bookingId } = useParams();

  // Function to download the PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const leftMargin = 10;
    const topMargin = 20;
    const lineHeight = 10; // Distance between lines
    const sectionSpacing = 10; // Distance between sections

    let currentY = topMargin; // Tracks the current Y position

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Car Subscription Agreement", leftMargin, currentY);

    // Subtitle
    currentY += lineHeight + 5; // Additional padding after the title
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      'This Car Subscription Agreement ("Agreement") is entered into between Timepiece Vault ("Company") and the undersigned subscriber ("Subscriber").',
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 1
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("1. Subscription Terms", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "The subscription period begins on the delivery date and continues on a month-to-month basis until terminated in accordance with this Agreement.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 2
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("2. Monthly Payments", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Subscriber agrees to pay the monthly subscription fee of £299 on the same day each month.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 3
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("3. Vehicle Usage", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "The vehicle may be driven up to 1,000 miles per month. Additional mileage will be charged at £0.20 per mile.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 4
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("4. Insurance Coverage", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Comprehensive insurance is included in the subscription. Subscriber is responsible for any deductibles in the event of a claim.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 5
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("5. Maintenance", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Regular maintenance and servicing are included in the subscription. Subscriber must follow the recommended maintenance schedule.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Section 6
    currentY += lineHeight + sectionSpacing;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("6. Termination", leftMargin, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Either party may terminate this Agreement with 30 days written notice. Early termination fees may apply.",
      leftMargin,
      currentY,
      { maxWidth: 190 }
    );

    // Save the PDF
    doc.save("Car_Subscription_Agreement.pdf");
  };

  const handleNext = () => {
    router.push(`/subscribe/${id}/booking/${bookingId}/checkout`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Contract Review</h2>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="mr-auto"
          >
            Download PDF
          </Button>
        </div>

        {/* download PDF */}
        <div className="container mx-auto py-4">
          <div className="p-6 border rounded shadow">
            <div
              className="h-[400px] overflow-y-auto pr-4"
              style={{
                scrollbarWidth: "thin" /* For Firefox */,
                scrollbarColor: "#6b7280 #f3f4f6" /* For Firefox */,
              }}
            >
              <style jsx>{`
                /* Custom scrollbar styles for WebKit browsers */
                .scrollable::-webkit-scrollbar {
                  width: 8px;
                }
                .scrollable::-webkit-scrollbar-thumb {
                  background-color: #6b7280; /* Thumb color */
                  border-radius: 4px;
                }
                .scrollable::-webkit-scrollbar-track {
                  background-color: #f3f4f6; /* Track color */
                }
              `}</style>

              <div className="space-y-4 scrollable">
                <h3 className="text-xl font-semibold">
                  Car Subscription Agreement
                </h3>
                <p>
                  This Car Subscription Agreement (&quot;Agreement&quot;) is
                  entered into between Timepiece Vault (&quot;Company&quot;) and
                  the undersigned subscriber (&quot;Subscriber&quot;).
                </p>

                <h4 className="text-lg font-semibold">1. Subscription Terms</h4>
                <p>
                  The subscription period begins on the delivery date and
                  continues on a month-to-month basis until terminated in
                  accordance with this Agreement.
                </p>

                <h4 className="text-lg font-semibold">2. Monthly Payments</h4>
                <p>
                  Subscriber agrees to pay the monthly subscription fee of £
                  {/* {carData.price} */}
                  on the same day each month.
                </p>

                <h4 className="text-lg font-semibold">3. Vehicle Usage</h4>
                <p>
                  The vehicle may be driven up to 1,000 miles per month.
                  Additional mileage will be charged at £0.20 per mile.
                </p>

                <h4 className="text-lg font-semibold">4. Insurance Coverage</h4>
                <p>
                  Comprehensive insurance is included in the subscription.
                  Subscriber is responsible for any deductibles in the event of
                  a claim.
                </p>

                <h4 className="text-lg font-semibold">5. Maintenance</h4>
                <p>
                  Regular maintenance and servicing are included in the
                  subscription. Subscriber must follow the recommended
                  maintenance schedule.
                </p>

                <h4 className="text-lg font-semibold">6. Termination</h4>
                <p>
                  Either party may terminate this Agreement with 30 days written
                  notice. Early termination fees may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Agreement Acknowledgement
          </h3>
          <p className="text-muted-foreground mb-4">
            Please ensure all documents are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>Clear and legible</li>
            <li>Valid and not expired</li>
            <li>Original documents (no photocopies)</li>
            <li>Complete (all edges visible)</li>
          </ul>
        </Card>

        <div className="flex items-center space-x-2 mt-6">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground">
            By ticking this box, I acknowledge and agree to the terms and
            conditions outlined above.
          </Label>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline">Back</Button>
          <Button
            className="bg-burgundy hover:bg-burgundy/90 text-white"
            disabled={!termsAccepted}
            onClick={handleNext}
          >
            Continue to Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDownload;
