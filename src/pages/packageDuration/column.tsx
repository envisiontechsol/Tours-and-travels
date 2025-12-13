// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { PackageDurationResType } from "../../types/packageType";
import { editPackageDurationAction } from "../../store/editMgmtStore";

const packageDurationColumns: ColumnDef<PackageDurationResType>[] = [
  {
    header: "Sl #",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Days",
    accessorKey: "days",
  },
  {
    header: "Nights",
    accessorKey: "nights",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => editPackageDurationAction(row.original)}
      >
        <Pencil size={16} />
      </button>
    ),
  },
];

export default packageDurationColumns;
