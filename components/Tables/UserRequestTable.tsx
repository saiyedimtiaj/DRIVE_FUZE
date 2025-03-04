"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
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
import { useGetUserRequestsQuery } from "@/hooks/request.hooks";
import { TRequest } from "@/type";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

function UserRequestTable() {
  const { data, isLoading } = useGetUserRequestsQuery();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "Reg",
      header: "Reg",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.carId.registrationNumber}
        </div>
      ),
    },
    {
      accessorKey: "Brand",
      header: "Brand",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.carId.brand}</div>
      ),
    },
    {
      accessorKey: "Variant",
      header: "Variant",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.carId.model}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClass = (() => {
          if (status === "Pending") return "bg-yellow-100 text-yellow-800";
          if (status === "In Review") return "bg-blue-100 text-blue-800";
          if (status === "Accepted") return "bg-green-100 text-green-800";
          if (status === "Declined") return "bg-red-100 text-red-800";
          return "bg-gray-100 text-gray-800"; // Default class
        })();

        return (
          <span className={`px-2 py-1 rounded-full text-sm ${statusClass}`}>
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "Price (p/m)",
      header: "Price (p/m)",
      cell: ({ row }) => (
        <div className="capitalize">£ {row.original.carId.price}</div>
      ),
    },
    {
      accessorKey: "Dealer",
      header: "Dealer",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.dealerId.firstName}</div>
      ),
    },
    {
      accessorKey: "Request Date",
      header: "Request Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.createdAt.slice(0, 10)}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div>
            <Link
              href={
                row.original?.status === "Ready for Delivery"
                  ? `/dashboard/subscription-request/${row.original._id}/preparetion `
                  : row.original?.status === "In Progress"
                  ? `/dashboard/subscription-request/${row.original._id}/preparetion `
                  : row.original?.status === "Approved"
                  ? `/dashboard/subscription-request/${row.original._id}/preparetion `
                  : row.original.status === "Pending"
                  ? `/dashboard/subscription-request/${row.original._id}`
                  : `/dashboard/subscription-request/${row.original._id}/delivery `
              }
            >
              View Details
            </Link>
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by Name"
          value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("model")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default UserRequestTable;
