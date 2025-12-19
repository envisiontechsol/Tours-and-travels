import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Star } from "lucide-react";
import { TourPackageResType } from "../../types/tourTypes";
import { editTourPackageAction } from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteTourPackageReq } from "../../services/api/tours/toursApi";

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

const tourPackageColumns: ColumnDef<TourPackageResType>[] = [
  {
    header: "Sl #",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
  },
  {
    header: "Tour Name",
    accessorKey: "name",
  },
  {
    header: "Code",
    accessorKey: "code",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-600">
        {row.original.code}
      </span>
    ),
  },
  {
    header: "Destination",
    accessorKey: "destination",
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
        {row.original.destination?.name}
      </span>
    ),
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.duration.days}D/{row.original.duration.nights}N
      </span>
    ),
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-xs">
        {row.original.tags.map((tag) => (
          <span
            key={tag.id}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
          >
            {tag?.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    header: "About",
    accessorKey: "about",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original.about || ""}>
        {row.original.about}
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "priceInINR",
    cell: ({ row }) => (
      <span className="font-medium text-green-700">
        ₹{parseInt(row.original.priceInINR).toLocaleString()}
      </span>
    ),
  },
  {
    header: "Rating",
    accessorKey: "rating",
    cell: ({ row }) => (
      <span className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        {parseFloat(row.original.rating) || "No rating"}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "isActive",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.isActive
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Banner Image",
    accessorKey: "bannerImageUrl",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.bannerImageUrl || ""}
        altText={row.original.bannerImagetage || ""}
        size="w-16 h-12"
      />
    ),
  },
  {
    header: "Tour Image",
    accessorKey: "tourImageUrl",
    cell: ({ row }) => (
      <ImageCell
        imageUrl={row.original.tourImageUrl || ""}
        altText={row.original.tourImagetage || ""}
        size="w-16 h-12"
      />
    ),
  },
  {
    header: "Created",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<TourPackageResType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          onEdit: editTourPackageAction,
          onDelete: (data) => deleteTourPackageReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
export default tourPackageColumns;
