// components/table/activityColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { ActivityResType } from "../../types/activityTypes";
import {
  editActivityAction,
  viewActivityAction,
} from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteActivityReq } from "../../services/api/activites/activityApi";

const ImageCell = ({
  imageUrl,
  altText,
  size = "w-12 h-12",
}: {
  imageUrl: string;
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

const activityColumns: ColumnDef<ActivityResType>[] = [
  {
    header: "Sl #",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.options.meta as {
        pageIndex: number;
        pageSize: number;
      };

      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  // {
  //   header: "Category",
  //   accessorKey: "category",
  //   cell: ({ row }) => (
  //     <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
  //       {row.original.category}
  //     </span>
  //   ),
  // },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original.description}>
        {row.original.description}
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "priceInINR",
    cell: ({ row }) => (
      <span className="font-medium text-green-700">
        ₹{row.original.priceInINR.toLocaleString()}
      </span>
    ),
  },
  {
    header: "Banner Image",
    accessorKey: "bannerImageUrl",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.bannerImageUrl}
        altText={row.original.bannerImagetage}
        size="w-16 h-12"
      />
    ),
  },
  {
    header: "Image 1",
    accessorKey: "image1Url",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.image1Url}
        altText={row.original.image1tage}
      />
    ),
  },
  {
    header: "Image 2",
    accessorKey: "image2Url",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.image2Url}
        altText={row.original.image2tage}
      />
    ),
  },
  {
    header: "Image 3",
    accessorKey: "image3Url",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.image3Url}
        altText={row.original.image3tage}
      />
    ),
  },
  {
    header: "Image 4",
    accessorKey: "image4Url",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.image4Url}
        altText={row.original.image4tage}
      />
    ),
  },

  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<ActivityResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewActivityAction,
          onEdit: editActivityAction,
          onDelete: (data) => deleteActivityReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.title}"?`,
        }}
      />
    ),
  },
];

export default activityColumns;
