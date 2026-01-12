// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import {
  editTopLeveleMenuAction,
  viewTopLeveleMenuAction,
} from "../../store/editMgmtStore";
import { TopLevelMenuResType } from "../../types/topLevelMenuTypes";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteTopLevelMenuReq } from "../../services/api/topLevelMenu/topLevelMenuApi";

export const topLevelMenuColumns: ColumnDef<TopLevelMenuResType>[] = [
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
      <ActionButtons<TopLevelMenuResType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          view: true,
          onView: viewTopLeveleMenuAction,
          onEdit: editTopLeveleMenuAction,
          onDelete: (data) => deleteTopLevelMenuReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
