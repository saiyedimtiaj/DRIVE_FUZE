"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import DataTable from "../Shared/Table";
import { TDealerSupport } from "@/type";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import { useGetAllDealerSupport } from "@/hooks/dealerSupport.hooks";
import AddDealerSupportModal from "../Modal/AddDealerSupportModal";
import DealerSendMessageModal from "../Modal/DealerSendMessageModal";
import LoaderScreen from "../Shared/Loader";

const statusColors: { [key: string]: string } = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

function DealerSupport() {
  const { data, isLoading, refetch } = useGetAllDealerSupport();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // State to control modal visibility
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");
  const { user } = useUser();

  const columns: ColumnDef<TDealerSupport>[] = [
    ...(user?.role === "admin"
      ? [
          {
            accessorKey: "Customer Name",
            header: "Customer Name",
            cell: ({ row }: { row: Row<TDealerSupport> }) => (
              <div className="capitalize">
                {row.original.dealerId?.firstName}{" "}
                {" " + row.original.dealerId?.lastName}
              </div>
            ),
          },
          {
            accessorKey: "Email",
            header: "Email",
            cell: ({ row }: { row: Row<TDealerSupport> }) => (
              <div className="capitalize">{row.original.dealerId?.email}</div>
            ),
          },
        ]
      : []),
    {
      accessorKey: "issue",
      header: "Issue",
      cell: ({ row }) => <div className="capitalize">{row.original.issue}</div>,
    },
    {
      accessorKey: "Type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.issueType}</div>
      ),
    },
    {
      accessorKey: "Priority",
      header: "Priority",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            row.original?.priority === "High"
              ? "bg-red-100 text-red-800"
              : row.original?.priority === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {row.original?.priority}
        </span>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            statusColors[row.original.status]
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "Date Raised",
      header: "Date Raised",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "Last Updated",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.updatedAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "Action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="">
            <Button
              variant="link"
              onClick={() => {
                setIsSendMessageOpen(true);
                setSelectedId(row.original?._id);
              }}
            >
              view details
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleModal = () => {
    console.log("jshdgsydb");
    setIsCreateModalOpen(true);
  };

  console.log(data);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="Search Ticket..."
          value={(table.getColumn("issue")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("issue")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {user?.role === "dealer" && (
          <Button className="bg-burgundy" onClick={handleModal}>
            <Plus className="" /> New Ticket
          </Button>
        )}
      </div>

      {/* DataTable */}
      <DataTable table={table} />
      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <AddDealerSupportModal
          refetch={refetch}
          setIsOpen={setIsCreateModalOpen}
          isOpen={isCreateModalOpen}
        />
      )}
      {isSendMessageOpen && (
        <DealerSendMessageModal
          defaultId={selectedId}
          isOpen={isSendMessageOpen}
          setIsOpen={setIsSendMessageOpen}
        />
      )}
    </div>
  );
}

export default DealerSupport;
