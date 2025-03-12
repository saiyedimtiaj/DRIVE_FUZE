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
import { TRequest } from "@/type";
import { useGetDealerRequestsQuery } from "@/hooks/request.hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

function DealerRequestTable() {
  const { data, isLoading } = useGetDealerRequestsQuery();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "carId.registrationNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reg <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.carId.registrationNumber}
        </div>
      ),
      filterFn: (row, columnId, filterValue) =>
        row.original.carId.registrationNumber
          .toLowerCase()
          .includes(filterValue.toLowerCase()),
    },
    {
      accessorKey: "carId.brand",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.carId.brand}</div>
      ),
    },
    {
      accessorKey: "carId.variant",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variant <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.carId.model}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const statusClass =
          {
            Pending: "bg-yellow-100 text-yellow-800",
            "In Review": "bg-blue-100 text-blue-800",
            Accepted: "bg-green-100 text-green-800",
            Declined: "bg-red-100 text-red-800",
          }[status as string] || "bg-gray-100 text-gray-800";

        return (
          <span className={`px-2 py-1 rounded-full text-sm ${statusClass}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "userId.firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.userId.firstName} {row.original.userId.lastName}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request Date <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.createdAt.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const requestId = row.original._id;
        const { status } = row.original;

        let fulfillmentPath = `/dealer/fulfillment/${requestId}/`;
        if (
          status === "Approved" ||
          status === "In Progress" ||
          status === "Ready for Delivery"
        ) {
          fulfillmentPath += "preparetion";
        } else if (
          status === "Awaiting Delivery" ||
          status === "Confirmation For Delivery" ||
          status === "Delivered"
        ) {
          fulfillmentPath += "delivery";
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={fulfillmentPath}>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Update Status</DropdownMenuItem>
              <DropdownMenuItem>Add Notes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          placeholder="Search by Registration Number"
          value={
            (table
              .getColumn("registrationNumber")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("registrationNumber")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default DealerRequestTable;
