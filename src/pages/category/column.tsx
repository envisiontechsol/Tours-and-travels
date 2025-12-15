// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import {
  editSlotCategoryAction,
  editTagAction,
} from "../../store/editMgmtStore";
import { SlotsCategoryResType } from "../../types/slotsTypes";

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
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => editSlotCategoryAction(row.original)}
      >
        <Pencil size={16} />
      </button>
    ),
  },
];
