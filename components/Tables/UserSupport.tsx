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
import { TCareCare } from "@/type";
import { Button } from "../ui/button";
import { ArrowUpDown, Plus } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import AddCarCareModal from "../Modal/AddCarCareModal";
import { useGetAllCarCare } from "@/hooks/carcare.hooks";
import SupportViewModal from "../Modal/SupportViewModal";
import LoaderScreen from "../Shared/Loader";

const statusColors: { [key: string]: string } = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

function UserSupport() {
  const { data, isLoading, refetch } = useGetAllCarCare();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [blogData, setBlogData] = React.useState<TCareCare | undefined>(
    undefined
  );

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false);
  const { user } = useUser();

  const columns: ColumnDef<TCareCare>[] = [
    ...(user?.role === "admin"
      ? [
          {
            accessorKey: "userId.firstName",
            header: ({ column }: { column: Column<TCareCare, unknown> }) => (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Customer Name
                <ArrowUpDown />
              </Button>
            ),
            cell: ({ row }: { row: Row<TCareCare> }) => (
              <div className="capitalize">
                {row.original.userId?.firstName} {row.original.userId?.lastName}
              </div>
            ),
          },
          {
            accessorKey: "userId.email",
            header: ({ column }: { column: Column<TCareCare, unknown> }) => (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Email
                <ArrowUpDown />
              </Button>
            ),
            cell: ({ row }: { row: Row<TCareCare> }) => (
              <div className="lowercase">{row.original.userId?.email}</div>
            ),
          },
        ]
      : []),
    {
      accessorKey: "issue",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issue
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.original.issue}</div>,
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown />
        </Button>
      ),
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
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      ),
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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Raised
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.updatedAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="">
            <Button
              onClick={() => {
                setIsSupportModalOpen(true);
                setBlogData(row.original);
              }}
              variant="link"
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
        {user?.role === "user" && (
          <Button className="bg-burgundy" onClick={() => setIsModalOpen(true)}>
            <Plus className="" /> New Ticket
          </Button>
        )}
      </div>

      {/* DataTable */}
      <DataTable table={table} />

      {/* Create Blog Modal */}
      {isModalOpen && (
        <AddCarCareModal
          refetch={refetch}
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      )}
      {isSupportModalOpen && blogData && (
        <SupportViewModal
          setIsOpen={setIsSupportModalOpen}
          isOpen={isSupportModalOpen}
          defaultValue={blogData}
        />
      )}
    </div>
  );
}

export default UserSupport;
