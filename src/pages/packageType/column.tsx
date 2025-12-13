// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { PackageType } from "../../types/packageType";
import { editPackageTypeAction } from "../../store/editMgmtStore";

export const placeColumns: ColumnDef<PackageType>[] = [
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
    header: "Action",
    cell: ({ row }) => (
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => editPackageTypeAction(row.original)}
      >
        <Pencil size={16} />
      </button>
    ),
  },
];
