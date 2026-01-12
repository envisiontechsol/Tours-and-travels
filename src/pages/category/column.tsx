// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import {
  editSlotCategoryAction,
  editTagAction,
  viewSlotCategoryAction,
} from "../../store/editMgmtStore";
import { SlotsCategoryResType } from "../../types/slotsTypes";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteCategoryReq } from "../../services/api/others/slotsCatApi";

export const categoryColumns: ColumnDef<SlotsCategoryResType>[] = [
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
      <ActionButtons<SlotsCategoryResType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          view: true,
          onView: viewSlotCategoryAction,
          onEdit: editSlotCategoryAction,
          onDelete: (data) => deleteCategoryReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
