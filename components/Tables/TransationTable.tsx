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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const columns: ColumnDef<TRequest>[] = [
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
        <div className="capitalize text-center">£{row.original.leasePrice}</div>
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
          return "bg-gray-200 text-gray-800"; // Default class
        })();

        return (
          <span
            className={`px-2 py-1 text-nowrap rounded-full text-sm ${statusClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "score",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Risk Score
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.score}</div>
      ),
    },
    {
      accessorKey: "Dealer",
      header: "Dealer",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.dealerId?.firstName}</div>
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
            Request Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original.createdAt.slice(0, 10)}
        </div>
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
                  row.original?.status === "Awating Delivery" ||
                  row.original.status == "Ready for Delivery"
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

  const filteredData = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item: TRequest) =>
      item.carId?.model?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
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
          placeholder="Search by Car Name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default TrasntionTable;
