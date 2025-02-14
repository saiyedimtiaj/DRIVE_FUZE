//@typescript-eslint/no-explicit-any
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export const CHARGE_CATEGORIES = [
  { id: "alloy", name: "Alloy Wheel Damage", baseCharge: 100 },
  { id: "fuel", name: "Fuel Charges", baseCharge: 2.2 },
  { id: "valeting", name: "Valeting", baseCharge: 40 },
  { id: "late", name: "Late Return Fees", baseCharge: null },
  { id: "mileage", name: "Excess Mileage", baseCharge: 0.35 },
  { id: "body", name: "Body Damage", baseCharge: null },
  { id: "accessories", name: "Missing Accessories", baseCharge: null },
  { id: "interior", name: "Interior Damage", baseCharge: null },
  { id: "tyre", name: "Tyre Damage", baseCharge: null },
  { id: "mechanical", name: "Mechanical Damage", baseCharge: null },
];

interface ReturnChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: any;
}

export function ReturnChargeModal({
  isOpen,
  onClose,
  onSave,
}: ReturnChargeModalProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [evidence, setEvidence] = useState<File[]>([]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const selectedCategory = CHARGE_CATEGORIES.find((c) => c.id === value);
    if (selectedCategory?.baseCharge) {
      setAmount(selectedCategory.baseCharge);
    }
  };

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidence(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (!category || !description || !amount) return;

    onSave({
      category,
      description,
      amount: Number(amount),
      evidence,
    });

    // Reset form
    setCategory("");
    setDescription("");
    setAmount("");
    setEvidence([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Return Charge</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CHARGE_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                    {category.baseCharge &&
                      ` (£${category.baseCharge}${
                        category.id === "mileage"
                          ? "/mile"
                          : category.id === "fuel"
                          ? "/litre"
                          : ""
                      })`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter details about the damage or charge"
            />
          </div>

          <div className="space-y-2">
            <Label>Amount (£)</Label>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : "")
              }
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <Label>Evidence</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleEvidenceUpload}
            />
            {evidence.length > 0 && (
              <div className="text-sm text-muted-foreground mt-1">
                {evidence.length} file(s) selected
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!category || !description || !amount}
            className="bg-burgundy hover:bg-burgundy/90 text-white"
          >
            Add Charge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
