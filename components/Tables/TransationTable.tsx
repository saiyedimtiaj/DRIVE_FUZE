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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useGetAllRequest } from "@/hooks/request.hooks";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

function TrasntionTable() {
  const { data, isLoading } = useGetAllRequest();
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
      accessorKey: "Product Name",
      header: "Product Name",
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
        <div className="capitalize">{row.original.carId.model}</div>
      ),
    },
    {
      accessorKey: "Price (p/m)",
      header: "Price (p/m)",
      cell: ({ row }) => (
        <div className="capitalize">£{row.original.leasePrice}</div>
      ),
    },
    {
      accessorKey: "Customer Name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.customerInfo?.firstName}{" "}
          {row.original.customerInfo?.lastName}
        </div>
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
          if (status === "Approved") return "bg-green-100 text-green-800";
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
      accessorKey: "Risk Score",
      header: "Risk Score",
      cell: ({ row }) => <div className="capitalize">{row.original.score}</div>,
    },
    {
      accessorKey: "Dealer",
      header: "Dealer",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.dealerId?.firstName}</div>
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
      id: "Action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                href={
                  row.original?.status === "In Progress" ||
                  row.original?.status === "Awating Delivery"
                    ? `/admin/transactions/${row.original?._id}/preparetion`
                    : row.original?.status === "Confirmation For Delivery" ||
                      row.original?.status === "Delivered"
                    ? `/admin/transactions/${row.original?._id}/delivery`
                    : `/admin/transactions/${row.original?._id}`
                }
              >
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </Link>
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

export default TrasntionTable;
