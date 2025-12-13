// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { DestinationResType } from "../../types/locationTypes";
import { editDestinationAction } from "../../store/editMgmtStore";

const destinationColumns: ColumnDef<DestinationResType>[] = [
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
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => editDestinationAction(row.original)}
      >
        <Pencil size={16} />
      </button>
    ),
  },
];

export default destinationColumns;
