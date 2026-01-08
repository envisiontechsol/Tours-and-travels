import React, { useEffect, useState } from "react";
import { Users, MapPin, Package, Calendar } from "lucide-react";
import { fetchModulesReq } from "../../services/api/modules/modulesApi";
import { ModulesResType } from "../../types/modulesTypes";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { updateUsersPermissionsReq } from "../../services/api/users/usersApi";
import { toast } from "react-toastify";

const ACTIONS = ["VIEW", "ADD", "EDIT", "DELETE"] as const;
type ActionType = (typeof ACTIONS)[number];

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6 text-blue-600" />,
  "map-pin": <MapPin className="w-6 h-6 text-green-600" />,
  package: <Package className="w-6 h-6 text-purple-600" />,
  calendar: <Calendar className="w-6 h-6 text-orange-600" />,
};

const EditPermission = () => {
  const [modules, setModules] = useState<ModulesResType[]>([]);
  const [permissions, setPermissions] = useState<
    Record<string, Set<ActionType>>
  >({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  // ✅ existing user permissions from store
  const userPermissionData = useEditMgmtStore((s) => s.editUserPermission);

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const res = await fetchModulesReq(1, 50);
        setModules(res.data);

        /**
         * ✅ Build initial permission state
         */
        const initialState: Record<string, Set<ActionType>> = {};

        res.data.forEach((mod: ModulesResType) => {
          // find existing permission for this module
          const existingModulePermission =
            userPermissionData?.permissions?.find(
              (p) => p.module === mod.module
            );

          initialState[mod.module] = new Set(
            existingModulePermission
              ? existingModulePermission.actions.map(
                  (a) => a.toUpperCase() as ActionType
                )
              : []
          );
        });

        setPermissions(initialState);
      } finally {
        setLoading(false);
      }
    };

    if (userPermissionData) {
      fetchModules();
    }
  }, [userPermissionData]);

  const toggleAction = (module: string, action: ActionType) => {
    setPermissions((prev) => {
      const updated = new Set(prev[module]);
      updated.has(action) ? updated.delete(action) : updated.add(action);
      return { ...prev, [module]: updated };
    });
  };

  const handleSubmit = async () => {
    const payload = {
      permissions: Object.entries(permissions)
        .filter(([_, actions]) => actions.size > 0)
        .map(([module, actions]) => ({
          module,
          actions: Array.from(actions),
        })),
    };

    console.log("✅ Final Payload", payload);
    setisSubmitting(true);
    try {
      const res = await updateUsersPermissionsReq(
        userPermissionData?.userId || "",
        payload
      );
      toast.success("Menu updated successfully!");
      closeAllEditAction();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to update");
    } finally {
      setisSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading modules...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Edit User Permissions
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Select allowed actions for each module
        </p>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-xl border shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {iconMap[mod.icon]}
              </div>
              <h4 className="font-semibold text-gray-800">{mod.label}</h4>
            </div>

            <div className="space-y-2">
              {ACTIONS.map((action) => (
                <label
                  key={action}
                  className="flex items-center gap-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={permissions[mod.module]?.has(action)}
                    onChange={() => toggleAction(mod.module, action)}
                  />
                  <span className="text-gray-700">{action}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={() => closeAllEditAction()}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? "Updating..." : "Update Permission"}
        </button>
      </div>
    </div>
  );
};

export default EditPermission;
