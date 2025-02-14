import CarDetails from "@/components/Main/CarDetails";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <CarDetails id={params.id} />
    </div>
  );
};

export default page;
