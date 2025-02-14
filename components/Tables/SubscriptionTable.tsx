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
import { ISubscription } from "@/type";
import { useGetAllSubscription } from "@/hooks/subscription.hooks";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

function SubscriptionTable() {
  const { data, isLoading } = useGetAllSubscription();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { user } = useUser();

  const columns: ColumnDef<ISubscription>[] = [
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
      accessorKey: "Vehicle",
      header: "Vehicle",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.carId.model}</div>
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
        <div className="capitalize">{row.original.carId.variant}</div>
      ),
    },
    {
      accessorKey: "Price (p/m)",
      header: "Price (p/m)",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.leasePrice}</div>
      ),
    },
    ...(user?.role !== "user"
      ? [
          {
            accessorKey: "Customer",
            header: "Customer",
            cell: ({ row }: { row: Row<ISubscription> }) => (
              <div className="capitalize">
                {row.original.userId.firstName} {row.original.userId.lastName}
              </div>
            ),
          },
        ]
      : []),
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClass = (() => {
          if (status === "Active") return "bg-green-100 text-green-800";
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
      accessorKey: "Start Date",
      header: "Start Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.leaseStartDate?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "End Date",
      header: "End Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.leaseEndDate?.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "Action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Link
            href={
              user?.role === "dealer"
                ? `/dealer/subscriptions/${row.original?._id}`
                : user?.role === "admin"
                ? `/admin/subscriptions/${row.original?._id}`
                : `/dashboard/my-subscription/${row.original?._id}`
            }
          >
            View Details
          </Link>
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
          value={(table.getColumn("Reg")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Reg")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default SubscriptionTable;
