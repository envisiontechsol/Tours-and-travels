type ActionType = "view" | "add" | "edit" | "delete";

export type UserResWithPermissionType = {
  userId: string;
  role: string;
  permissions: {
    module: string;
    label: string;
    icon: string;
    actions: ActionType[];
  }[];
};
