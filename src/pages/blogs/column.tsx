// components/table/blogColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { BlogPostResType } from "../../types/blogsTypes";
import { deleteBlogReq } from "../../services/api/blogs/blogsApi";
import { editBlogAction, viewBlogAction } from "../../store/editMgmtStore";

/* ---------------- Image Cell ---------------- */
const ImageCell = ({
  imageUrl,
  altText,
  size = "w-14 h-10",
}: {
  imageUrl: string | null;
  altText: string;
  size?: string;
}) => {
  return (
    <div className="flex justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className={`${size} object-cover rounded-md border`}
        />
      ) : (
        <div
          className={`${size} bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500`}
        >
          No Image
        </div>
      )}
    </div>
  );
};

/* ---------------- Columns ---------------- */
const blogColumns: ColumnDef<BlogPostResType>[] = [
  {
    header: "Sl #",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
  },
  {
    header: "Post Title",
    accessorKey: "postTitle",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.postTitle}</span>
    ),
  },
  {
    header: "Blog URL",
    accessorKey: "blogUrl",
    cell: ({ row }) => (
      <a
        href={row.original.blogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline max-w-xs truncate inline-block"
        title={row.original.blogUrl}
      >
        {row.original.blogUrl}
      </a>
    ),
  },
  {
    header: "Featured Image",
    accessorKey: "featuredImageUrl",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.featuredImageUrl}
        altText={row.original.postTitle}
      />
    ),
  },
  {
    header: "Comments",
    accessorKey: "showComments",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.original.showComments
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {row.original.showComments ? "Enabled" : "Disabled"}
      </span>
    ),
  },
  {
    header: "Show on Home",
    accessorKey: "showHome",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.original.showHome
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {row.original.showHome ? "Yes" : "No"}
      </span>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {dayjs(row.original.createdAt).format("DD MMM YYYY")}
      </span>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<BlogPostResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewBlogAction,
          onEdit: editBlogAction,
          onDelete: (data) => deleteBlogReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.postTitle}"?`,
        }}
      />
    ),
  },
];

export default blogColumns;
