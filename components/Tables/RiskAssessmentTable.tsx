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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useGetAllCustomerCheck } from "@/hooks/customerCheck.hooks";
import { TCustomerCheck } from "@/type";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";

function RiskAssessmentTable() {
  const { data, isLoading } = useGetAllCustomerCheck();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(data);

  const columns: ColumnDef<TCustomerCheck>[] = [
    {
      accessorKey: "Customer Name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.requestId?.customerInfo?.firstName}{" "}
          {row.original?.requestId?.customerInfo?.lastName}
        </div>
      ),
    },
    {
      accessorKey: "Address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.requestId?.address?.addressLine1}
        </div>
      ),
    },
    {
      accessorKey: "Email",
      header: "Email",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.userId?.email}</div>
      ),
    },
    {
      accessorKey: "Phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.requestId?.customerInfo?.phoneNumber}
        </div>
      ),
    },
    {
      accessorKey: "Risk Score",
      header: "Risk Score",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.score}</div>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.status}</div>
      ),
    },
    {
      accessorKey: "Last Checked",
      header: "Last Checked",
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/admin/risk-assessment/${row.original._id}`}>
                <DropdownMenuItem>View Assessment</DropdownMenuItem>
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
          value={(table.getColumn("Email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default RiskAssessmentTable;
