// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { UserResWithPermissionType } from "../../types/usersTypes";
import {
  editUserPermissionAction,
  viewUserPermissionAction,
} from "../../store/editMgmtStore";

export const placeColumns: ColumnDef<UserResWithPermissionType>[] = [
  {
    header: "Sl #",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.index + 1}</span>
    ),
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <ActionButtons<UserResWithPermissionType>
        row={row.original}
        config={{
          edit: true,
          delete: false,
          view: true,
          onView: viewUserPermissionAction,
          onEdit: editUserPermissionAction,
          // onDelete: (data) => deletePackageTypesReq(data.id),
          // deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
