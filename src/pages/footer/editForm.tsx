import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { footerSchema } from "../../schema/footerSchema";
import { updateFooterReq } from "../../services/api/footer/footerApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getFormFieldsConfig } from "./formFieldsConfig";

type FooterFormValues = z.infer<typeof footerSchema>;

const EditFooterForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editFooterData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  /** 🔹 Prefill form when edit data is available */
  useEffect(() => {
    if (!editData) return;

    reset({
      name: editData.name,
      value: editData.value,
    });
  }, [editData, reset]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: FooterFormValues) => {
    if (!editData?.id) {
      return toast.error("Footer ID not found");
    }

    setIsSubmitting(true);
    try {
      await updateFooterReq(editData.id, {
        name: data.name,
        value: data.value,
      });

      toast.success("Footer updated successfully!");
      onCancelOrClose();
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to update footer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(),
    [],
  );

  if (!editData) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Footer
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
            className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Footer"}
          </button>

          <button
            type="button"
            onClick={onCancelOrClose}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFooterForm;
