import Documents from "@/components/Forms/DocumentForm";

const page = ({ params }: { params: { id: string; bookingId: string } }) => {
  return (
    <div>
      <Documents id={params.id} bookingId={params.bookingId} />
    </div>
  );
};

export default page;
