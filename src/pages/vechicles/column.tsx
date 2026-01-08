import { ColumnDef } from "@tanstack/react-table";
import {
  editVehicleAction,
  viewVehicleAction,
} from "../../store/editMgmtStore";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { VehicleResType } from "../../types/vechicleTypes";
import { deleteVehicleReq } from "../../services/api/vechicles/vechiclesApi";

const vehicleColumns: ColumnDef<VehicleResType>[] = [
  {
    header: "Sl #",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
  },
  {
    header: "Vehicle Name",
    accessorKey: "name",
  },
  {
    header: "Seats",
    accessorKey: "numberSeats",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<VehicleResType>
        row={row.original}
        config={{
          edit: true,
          delete: true,
          view: true,
          onView: viewVehicleAction,
          onEdit: editVehicleAction,
          onDelete: (data) => deleteVehicleReq(data.id),
          deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];

export default vehicleColumns;
