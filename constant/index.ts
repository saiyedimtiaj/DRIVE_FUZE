export const fuelTypeSelectItems = [
  { name: "Electric", value: "electric" },
  { name: "Hybrid", value: "hybrid" },
  { name: "Petrol", value: "PETROL" },
];

export const statusColourShow = (status: string) => {
  if (status == "Pending") return "bg-yellow-100 text-yellow-800";
  if (status == "In Review") return "bg-blue-100 text-blue-800";
  if (status == "Approved") return "bg-green-100 text-green-800";
  if (status == "Declined") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800"; // Default class
};
