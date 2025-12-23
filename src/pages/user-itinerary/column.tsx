// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { UserItinerayListResType } from "../../types/user-itinerary-types";

export const placeColumns: ColumnDef<UserItinerayListResType>[] = [
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
    header: "Phone Number",
    accessorKey: "phone",
  },
  {
    header: "Duration",
    accessorKey: "durationn",
  },
  {
    header: "Package Type",
    accessorKey: "packageType",
  },
  {
    header: "Start Date",
    cell: ({ row }) => (
      <p>
        {row.original.startDate
          ? dayjs(row.original.startDate).format("DD-MM-YYYY")
          : "-"}
      </p>
    ),
  },

  {
    header: "Destation",
    accessorKey: "destation",
  },
  {
    header: "Start City",
    accessorKey: "startCity",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<UserItinerayListResType>
        row={row.original}
        config={{
          edit: false,
          delete: false,
          view: true,
          onView: () => {},
        }}
      />
    ),
  },
];
