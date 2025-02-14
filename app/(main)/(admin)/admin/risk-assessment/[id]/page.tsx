import AssessMentDetails from "@/components/Admin/AssessMentDetails";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <AssessMentDetails id={params.id} />
    </div>
  );
};

export default page;
