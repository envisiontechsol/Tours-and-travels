import { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteFooterReq } from "../../services/api/footer/footerApi";
import { editFooterAction, viewFooterAction } from "../../store/editMgmtStore";
import { FooterResType } from "../../types/footerTypes";

export const footerColumns: ColumnDef<FooterResType>[] = [
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
    header: "Value",
    accessorKey: "value",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<FooterResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewFooterAction,
          onEdit: editFooterAction,
          onDelete: (data) => deleteFooterReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
