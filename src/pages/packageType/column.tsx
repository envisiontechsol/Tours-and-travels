// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { PackageType } from "../../types/packageType";
import { editPackageTypeAction } from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deletePackageTypesReq } from "../../services/api/packages/packageTypeApi";

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
      <ActionButtons<PackageType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          onEdit: editPackageTypeAction,
          onDelete: (data) => deletePackageTypesReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
