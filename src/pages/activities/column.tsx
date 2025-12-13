// components/table/activityColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { ActivityResType } from "../../types/activityTypes";
import { editActivityAction } from "../../store/editMgmtStore";

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
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
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
      <button
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => editActivityAction(row.original)}
      >
        <Pencil size={16} />
      </button>
    ),
  },
];

export default activityColumns;
