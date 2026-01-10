import { Eye, Pencil, ShieldCheck, ShieldPlus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { triggerTableRefeshAction } from "../../../store/tableRefreshStore";

export type ActionConfig<T> = {
  edit?: boolean;
  delete?: boolean;
  view?: boolean;

  viewPermission?: boolean;
  editPermission?: boolean;

  disabled?: boolean;

  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<any>;
  onView?: (row: T) => void;

  onViewPermission?: (row: T) => void;
  onEditPermission?: (row: T) => void;

  deleteConfirmText?: string;
};

export interface ActionButtonsProps<T> {
  row: T;
  config: ActionConfig<T>;
}

export function ActionButtons<T>({ row, config }: ActionButtonsProps<T>) {
  const {
    edit,
    delete: canDelete,
    view,
    viewPermission,
    editPermission,
    disabled,
    onEdit,
    onDelete,
    onView,
    onViewPermission,
    onEditPermission,
    deleteConfirmText,
  } = config;

  const handleDelete = async () => {
    if (!onDelete) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: deleteConfirmText || "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
      });

      await onDelete(row);

      Swal.fire({
        icon: "success",
        title: "Deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      triggerTableRefeshAction();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: error?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {view && (
        <button
          title="View"
          disabled={disabled}
          onClick={() => onView?.(row)}
          className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50"
        >
          <Eye size={16} />
        </button>
      )}

      {edit && (
        <button
          title="Edit"
          disabled={disabled}
          onClick={() => onEdit?.(row)}
          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
        >
          <Pencil size={16} />
        </button>
      )}

      {/* VIEW PERMISSION */}
      {viewPermission && (
        <button
          title="View Permission"
          disabled={disabled}
          onClick={() => onViewPermission?.(row)}
          className="p-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-50"
        >
          <ShieldCheck size={16} />
        </button>
      )}

      {/* EDIT PERMISSION */}
      {editPermission && (
        <button
          title="Edit Permission"
          disabled={disabled}
          onClick={() => onEditPermission?.(row)}
          className="p-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition disabled:opacity-50"
        >
          <ShieldPlus size={16} />
        </button>
      )}

      {canDelete && (
        <button
          title="Delete"
          disabled={disabled}
          onClick={handleDelete}
          className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
