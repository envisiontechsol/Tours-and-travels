// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import {
  editSlotCategoryAction,
  editTagAction,
} from "../../store/editMgmtStore";
import { SlotsCategoryResType } from "../../types/slotsTypes";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteCategoryReq } from "../../services/api/others/slotsCatApi";

export const categoryColumns: ColumnDef<SlotsCategoryResType>[] = [
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
      <ActionButtons<SlotsCategoryResType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          onEdit: editSlotCategoryAction,
          onDelete: (data) => deleteCategoryReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
