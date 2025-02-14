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
import { TBlog } from "@/type";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useDeleteBlog, useGetAllBlog } from "@/hooks/blog.hooks";
import CreateBlogModel from "../Modal/CreateBlogModel";
import UpdateBlogModel from "../Modal/UpdateBlogModal";
import { toast } from "@/hooks/use-toast";
import LoaderScreen from "../Shared/Loader";

function BlogTable() {
  const { data, isLoading, refetch } = useGetAllBlog();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [blogData, setBlogData] = React.useState<TBlog | undefined>(undefined);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = React.useState(false);
  const { mutate: deleteBlog, isPending } = useDeleteBlog();

  const handleDelete = (id: string) => {
    deleteBlog(id, {
      onSuccess: (data) => {
        if (data?.success) {
          toast({
            title: "Article Deleted",
            description: "The blog article has been deleted successfully.",
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

  const columns: ColumnDef<TBlog>[] = [
    {
      accessorKey: "title",
      header: "title",
      cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
    },
    {
      accessorKey: "Category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.category}</div>
      ),
    },
    {
      accessorKey: "Author",
      header: "Author",
      cell: ({ row }) => (
        <div className="capitalize">{row.original?.author}</div>
      ),
    },
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original?.createdAt?.slice(0, 10)}
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
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
          <Plus className="" /> Add Blog
        </Button>
      </div>

      {/* DataTable */}
      <DataTable table={table} />

      {/* Create Blog Modal */}
      {isModalOpen && (
        <CreateBlogModel
          refetch={refetch}
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
        />
      )}
      {isBlogModalOpen && blogData && (
        <UpdateBlogModel
          refetch={refetch}
          setIsOpen={setIsBlogModalOpen}
          isOpen={isBlogModalOpen}
          defaultValue={blogData}
        />
      )}
    </div>
  );
}

export default BlogTable;
