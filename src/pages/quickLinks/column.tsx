import { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteQuickLinkReq } from "../../services/api/quickLinks/quickLinkApi";
import {
  editQuickLinkAction,
  viewQuickLinkAction,
} from "../../store/editMgmtStore";
import { QuickLinkResType } from "../../types/quickLinksTypes";

export const quickLinkColumns: ColumnDef<QuickLinkResType>[] = [
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
    header: "URL",
    accessorKey: "url",
  },
  {
    header: "Meta Title",
    accessorKey: "metaTitle",
  },
  {
    header: "Tags",
    cell: ({ row }) =>
      row.original.tags?.map((tag) => tag.name).join(", ") || "-",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<QuickLinkResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewQuickLinkAction,
          onEdit: editQuickLinkAction,
          onDelete: (data) => deleteQuickLinkReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
