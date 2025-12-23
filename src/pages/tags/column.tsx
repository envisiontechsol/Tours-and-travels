// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { TagResType } from "../../types/packageType";
import { editTagAction, viewTagAction } from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteTagReq } from "../../services/api/packages/tagsApi";

export const tagsColumns: ColumnDef<TagResType>[] = [
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
      <ActionButtons<TagResType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          view: true,
          onView: viewTagAction,
          onEdit: editTagAction,
          onDelete: (data) => deleteTagReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
