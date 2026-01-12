// components/table/placeColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ActionButtons } from "../../components/tables/tableButtons/actionButtons";
import { UserResWithPermissionType } from "../../types/usersTypes";
import {
  editUserAction,
  editUserPermissionAction,
  viewUserAction,
  viewUserPermissionAction,
} from "../../store/editMgmtStore";

export const placeColumns: ColumnDef<UserResWithPermissionType>[] = [
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
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
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
          editPermission: true,
          viewPermission: false,
          onView: viewUserAction,
          onEdit: editUserAction,
          onEditPermission: editUserPermissionAction,
          onViewPermission: viewUserPermissionAction,
          // onDelete: (data) => deletePackageTypesReq(data.id),
          // deleteConfirmText: `Do you want to delete "${row.original.name}"?`,
        }}
      />
    ),
  },
];
