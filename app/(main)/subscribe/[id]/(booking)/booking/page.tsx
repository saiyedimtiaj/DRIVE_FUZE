import DriverInfoForm from "@/components/Forms/DriverInfoForm";

export default function CheckoutFunnel({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-start flex-col md:flex-row gap-8">
      <div className="space-y-8 w-full">
        <h2 className="text-2xl font-semibold mb-6">Driver Information</h2>
        <DriverInfoForm id={params?.id} />
      </div>
    </div>
  );
}
