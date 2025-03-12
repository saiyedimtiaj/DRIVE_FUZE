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
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

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
      accessorKey: "carId.registrationNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reg
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.carId.registrationNumber}
        </div>
      ),
    },
    {
      accessorKey: "carId.model",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Model
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.carId.model}</div>
      ),
    },
    {
      accessorKey: "carId.brand",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.carId.brand}</div>
      ),
    },
    {
      accessorKey: "carId.variant",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Varient
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.carId.variant}
        </div>
      ),
    },
    {
      accessorKey: "leasePrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price (p/m)
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original?.leasePrice}</div>
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
      accessorKey: "leaseStartDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.leaseStartDate?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "leaseEndDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
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
            className="text-nowrap"
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
