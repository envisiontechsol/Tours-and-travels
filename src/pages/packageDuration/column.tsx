// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { PackageDurationResType } from "../../types/packageType";
import {
  editPackageDurationAction,
  viewPackageDurationAction,
} from "../../store/editMgmtStore";
import { deletePackageDurationReq } from "../../services/api/packages/packageDurationApi";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";

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
      <ActionButtons<PackageDurationResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewPackageDurationAction,
          onEdit: editPackageDurationAction,
          onDelete: (data) => deletePackageDurationReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];

export default packageDurationColumns;
