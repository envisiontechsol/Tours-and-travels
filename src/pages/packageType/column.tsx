// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { PackageType } from "../../types/packageType";
import {
  editPackageTypeAction,
  viewPackageTypeAction,
} from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deletePackageTypesReq } from "../../services/api/packages/packageTypeApi";

export const placeColumns: ColumnDef<PackageType>[] = [
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
          view: true,
          onView: viewPackageTypeAction,
          onEdit: editPackageTypeAction,
          onDelete: (data) => deletePackageTypesReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
