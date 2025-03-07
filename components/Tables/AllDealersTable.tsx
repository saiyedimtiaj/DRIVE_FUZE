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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useGetAllDealer } from "@/hooks/auth.hooks";
import LoaderScreen from "../Shared/Loader";
import UserToDealerUpdate from "../Modal/UserToDealerUpdateModal";

function AllDealersTable() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, isLoading, refetch } = useGetAllDealer();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "Dealer Name",
      header: "Dealer Name",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "Business Type",
      header: "Business Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.businessType}</div>
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
      accessorKey: "Phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.primaryPhone}</div>
      ),
    },
    {
      accessorKey: "Active Inventory",
      header: "Active Inventory",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.activeCarCount}</div>
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
      accessorKey: "Request Date",
      header: "Request Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      id: "Action",
      header: "Action",
      enableHiding: false,
      cell: ({}) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
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
      <div className="flex items-center py-4 justify-between gap-3">
        <Input
          placeholder="Search by Email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => setIsOpen(true)}>Add Dealer</Button>
      </div>
      <DataTable table={table} />
      <UserToDealerUpdate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={refetch}
      />
    </div>
  );
}

export default AllDealersTable;
