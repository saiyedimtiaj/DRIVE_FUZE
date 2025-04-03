"use client";

import * as React from "react";
import {
  Column,
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
import { ArrowUpDown, Plus } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import { useGetAllDealerSupport } from "@/hooks/dealerSupport.hooks";
import AddDealerSupportModal from "../Modal/AddDealerSupportModal";
import DealerSendMessageModal from "../Modal/DealerSendMessageModal";
import LoaderScreen from "../Shared/Loader";

const statusColors: { [key: string]: string } = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  resolve: "bg-gray-100 text-gray-800",
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
            accessorKey: "firstName",
            header: ({
              column,
            }: {
              column: Column<TDealerSupport, unknown>;
            }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Customer Number
                  <ArrowUpDown />
                </Button>
              );
            },
            cell: ({ row }: { row: Row<TDealerSupport> }) => (
              <div className="capitalize text-center">
                {row.original.dealerId?.firstName}{" "}
                {" " + row.original.dealerId?.lastName}
              </div>
            ),
          },
          {
            accessorKey: "dealerId.email",
            header: ({
              column,
            }: {
              column: Column<TDealerSupport, unknown>;
            }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Email
                  <ArrowUpDown />
                </Button>
              );
            },
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
      accessorKey: "issueType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original?.issueType}</div>
      ),
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 mx-auto rounded-full text-sm ${
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
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 mx-auto rounded-full text-sm ${
            statusColors[row.original.status]
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Raised
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.updatedAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "Action",
      header: () => <div className="text-center">Action</div>,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => {
                setIsSendMessageOpen(true);
                setSelectedId(row.original?._id);
              }}
            >
              View Details
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
