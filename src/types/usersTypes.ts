type ActionType = "view" | "add" | "edit" | "delete";

export type UserResWithPermissionType = {
  userId: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  permissions: {
    module: string;
    label: string;
    icon: string;
    actions: ActionType[];
  }[];
};
