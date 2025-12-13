import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import TextInput from "../../components/forms/elements/textInput";
import { packageTypeSchema } from "../../schema/packageTypeSchema";
import { updatePackageTypesReq } from "../../services/api/packages/packageTypeApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";

type PackageTypeValues = z.infer<typeof packageTypeSchema>;

const EditPackageTypeForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editiPackageTypeData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PackageTypeValues>({
    resolver: zodResolver(packageTypeSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (editData?.id) {
      reset({
        name: editData?.name,
      });
    }
  }, [editData]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: PackageTypeValues) => {
    try {
      await updatePackageTypesReq(editData?.id || "", data);
      toast.success("Package type updated successfully!");
      reset();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to update package type");
    }
  };

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Package Type
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Package Type"
                placeholder="Enter package type"
                value={field.value}
                onChange={field.onChange}
                error={errors.name?.message || undefined}
                required
              />
            )}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? "Updating..." : "Update Package Type"}
          </button>

          <button
            type="button"
            onClick={() => onCancelOrClose()}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPackageTypeForm;
