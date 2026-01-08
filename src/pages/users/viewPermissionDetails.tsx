import React from "react";
import {
  Users,
  MapPin,
  Package,
  Calendar,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  closeAllViewAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6 text-blue-600" />,
  "map-pin": <MapPin className="w-6 h-6 text-green-600" />,
  package: <Package className="w-6 h-6 text-purple-600" />,
  calendar: <Calendar className="w-6 h-6 text-orange-600" />,
};

const actionMap: Record<string, React.ReactNode> = {
  view: <Eye className="w-4 h-4" />,
  edit: <Pencil className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
};

const ViewPermissionDetails = () => {
  const userPermissionData = useEditMgmtStore((s) => s.viewUserPermission);
  return (
    <div className="p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          User Permission Details
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium text-gray-800">
              {userPermissionData?.userId}
            </p>
          </div> */}

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">
              {userPermissionData?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Module Permissions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPermissionData?.permissions.map((perm) => (
            <div
              key={perm.module}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              {/* Module Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {iconMap[perm.icon]}
                </div>
                <h4 className="font-semibold text-gray-800">{perm.label}</h4>
              </div>

              {/* Actions */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Allowed Actions</p>
                <div className="flex flex-wrap gap-2">
                  {perm.actions.map((action) => (
                    <span
                      key={action}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                    >
                      {actionMap[action]}
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => closeAllViewAction()}
          className="px-4 py-2 rounded-md border border-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewPermissionDetails;
