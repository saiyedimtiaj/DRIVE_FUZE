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
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TCar } from "@/type";
import { useGetDealerCar, useUpdateCarStatus } from "@/hooks/car.hooks";
import DataTable from "../Shared/Table";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LoaderScreen from "../Shared/Loader";
import { Badge } from "../ui/badge";

function DealerCarsTable() {
  const pathname = usePathname();
  const { mutate: updateStatus } = useUpdateCarStatus();
  const { data, isLoading, refetch } = useGetDealerCar();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleStatusChange = (payload: { status: string; id: string }) => {
    updateStatus(payload, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const columns: ColumnDef<TCar>[] = [
    {
      accessorKey: "registrationNumber",
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
        <div className="capitalize">{row.original.registrationNumber}</div>
      ),
    },
    {
      accessorKey: "model",
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
        <div className="capitalize text-center">{row.original.model}</div>
      ),
    },
    {
      accessorKey: "Brand",
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
        <div className="capitalize text-center">{row.original.brand}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize flex items-center gap-3">
          {pathname.includes("dealer") ? (
            ""
          ) : (
            <button
              onClick={() =>
                handleStatusChange({
                  id: row.original._id as string,
                  status:
                    row.original.status === "InActive" ? "Active" : "InActive",
                })
              }
              className={`px-4 py-2.5 rounded-full ${
                row.original.status === "InActive"
                  ? "bg-[#D1D5DB]"
                  : "bg-[#22C35D]"
              }`}
            ></button>
          )}
          <Badge
            className={`${
              row.original.status === "InActive"
                ? "bg-[#D1D5DB] text-black"
                : "bg-[#22C35D]"
            }`}
          >
            {" "}
            {row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "price",
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
        <div className="capitalize text-center">{row.original.price}</div>
      ),
    },
    {
      accessorKey: "mileage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mileage
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.original.mileage}</div>
      ),
    },
    {
      accessorKey: "Location",
      header: "Location",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.location}</div>
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
            Added On
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
  ];

  if (pathname.includes("dealer")) {
    columns.push({
      id: "actions",
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/dealer/inventory/${row.original?._id}`}>
                  Edit Car
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dealer/inventory/${row.original?._id}/details`}>
                  View Details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });
  } else {
    columns.push(
      {
        accessorKey: "Added By",
        header: "Added By",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.dealerId?.firstName}</div>
        ),
      },
      {
        id: "actions",
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`/admin/inventory/${row.original?._id}`}>
                    View Details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }
    );
  }

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
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by Name"
          value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("model")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {pathname.includes("dealer") ? (
          <Link href="/dealer/inventory/add">
            <Button className="bg-burgundy">
              <Plus className="mr-2" /> Add Vehicle
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>
      <DataTable table={table} />
    </div>
  );
}

export default DealerCarsTable;
