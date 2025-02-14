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
import { TUser } from "@/type";
import { useGetAllCustomers } from "@/hooks/auth.hooks";
import LoaderScreen from "../Shared/Loader";

function CustomerTable() {
  const { data, isLoading } = useGetAllCustomers();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(data);

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "Customer Name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "Gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.gender}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "email",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.email}</div>
      ),
    },
    {
      accessorKey: "License Number",
      header: "License Number",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.licenseNumber}</div>
      ),
    },
    {
      accessorKey: "Employment",
      header: "Employment",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.employmentStatus}</div>
      ),
    },
    {
      accessorKey: "Job Title",
      header: "Job Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.jobTitle}</div>
      ),
    },
    {
      accessorKey: "Salary",
      header: "Salary",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.salary}</div>
      ),
    },
    {
      accessorKey: "Active Subscriptions",
      header: "Active Subscriptions",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.activeSubscriptionCount}
        </div>
      ),
    },
    {
      accessorKey: "Joined At",
      header: "Joined At",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
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
          placeholder="Search by Email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default CustomerTable;
