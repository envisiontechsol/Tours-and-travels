// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { DestinationResType } from "../../types/locationTypes";
import {
  editDestinationAction,
  viewDestinationAction,
} from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { deleteDestinationReq } from "../../services/api/locations/destinationApi";

const destinationColumns: ColumnDef<DestinationResType>[] = [
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
    header: "Active",
    accessorKey: "isActive",
  },
  {
    header: "About",
    accessorKey: "about",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<DestinationResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewDestinationAction,
          onEdit: editDestinationAction,
          onDelete: (data) => deleteDestinationReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];

export default destinationColumns;
