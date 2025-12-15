import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { slotCategorySchema } from "../../schema/slotCategorySchema";
import { upadteCategoryReq } from "../../services/api/others/slotsCatApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getFormFieldsConfig } from "./formFieldsConfig";

type SlotCategoryValues = z.infer<typeof slotCategorySchema>;

const EditForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editSlotCategoryData);

  const [isSubmitting, setisSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SlotCategoryValues>({
    resolver: zodResolver(slotCategorySchema),
    defaultValues: { name: "", isActive: false },
  });

  useEffect(() => {
    if (editData?.id) {
      reset({
        name: editData?.name,
        isActive: editData?.isActive,
      });
    }
  }, [editData]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: SlotCategoryValues) => {
    setisSubmitting(true);
    try {
      await upadteCategoryReq(editData?.id || "", {
        name: data?.name,
        isActive: !!data?.isActive,
      });
      toast.success("Category updated successfully!");
      onCancelOrClose();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to update category");
    } finally {
      setisSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(),
    []
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Category
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
            {isSubmitting ? "Updating..." : "Update Category"}
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
