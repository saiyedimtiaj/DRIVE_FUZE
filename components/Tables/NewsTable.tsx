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
import { TNews } from "@/type";
import { Button } from "../ui/button";
import { ArrowUpDown, Pencil, Plus, Trash2 } from "lucide-react";
import AddNewsModel from "../Modal/AddNewsModal";
import { useDeleteNews, useGetAllNews } from "@/hooks/news.hooks";
import UpdateNewsModel from "../Modal/UpdateNewsModal";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

function NewsTable() {
  const { data, isLoading, refetch } = useGetAllNews();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [blogData, setBlogData] = React.useState<TNews | undefined>(undefined);
  const { mutate: deleteNews, isPending } = useDeleteNews();

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = React.useState(false);

  const handleDelete = (id: string) => {
    deleteNews(id, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Article Deleted",
            description: "The news article has been deleted successfully.",
          });
          refetch();
        } else {
          toast({
            title: "Failed to Delete",
            description: data?.message,
            variant: "destructive",
          });
        }
      },
    });
  };

  const columns: ColumnDef<TNews>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.category}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
          {row.original.status}
        </span>
      ),
    },
    {
      id: "Action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                setIsBlogModalOpen(true);
                setBlogData(row.original);
              }}
              variant="ghost"
              size="icon"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              disabled={isPending}
              onClick={() => handleDelete(row.original?._id)}
              variant="ghost"
              size="icon"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
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
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="Search by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button className="bg-burgundy" onClick={() => setIsModalOpen(true)}>
          <Plus className="" /> Add News
        </Button>
      </div>

      {/* DataTable */}
      <DataTable table={table} />

      {/* Create Blog Modal */}
      {isModalOpen && (
        <AddNewsModel
          refetch={refetch}
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      )}
      {isBlogModalOpen && blogData && (
        <UpdateNewsModel
          refetch={refetch}
          setIsOpen={setIsBlogModalOpen}
          isOpen={isBlogModalOpen}
          defaultValue={blogData}
        />
      )}
    </div>
  );
}

export default NewsTable;
