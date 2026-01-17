import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import TextInput from "../../components/forms/elements/textInput";
import { topLevelMenuSchema } from "../../schema/topLevelMenuSchema";
import { updateTopLevelMenuReq } from "../../services/api/topLevelMenu/topLevelMenuApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getFormFields } from "./formFileds";
import DynamicFormFields from "../../components/forms/dynamicFormFields";

type TopLevelMenuValues = z.infer<typeof topLevelMenuSchema>;

const EditForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editTopLeveleMenuData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TopLevelMenuValues>({
    resolver: zodResolver(topLevelMenuSchema),
    defaultValues: { name: "", orderBy: 0 },
  });

  useEffect(() => {
    if (editData?.id) {
      reset({
        name: editData?.name,
        orderBy: editData?.orderBy,
      });
    }
  }, [editData]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: TopLevelMenuValues) => {
    try {
      const reqBody = {
        name: data?.name,
        slug: data?.name?.toLowerCase(),
        route: editData?.route || "/package",
        orderBy: data?.orderBy,
      };
      await updateTopLevelMenuReq(editData?.id || "", reqBody);
      toast.success("Menu updated successfully!");
      onCancelOrClose();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to update menu");
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(() => getFormFields(), []);

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Menu
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>
        {/* Buttons */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? "Updating..." : "Update Menu"}
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

export default EditForm;
