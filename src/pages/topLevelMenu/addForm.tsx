import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import TextInput from "../../components/forms/elements/textInput";

import { topLevelMenuSchema } from "../../schema/topLevelMenuSchema";
import { addTopLevelMenuReq } from "../../services/api/topLevelMenu/topLevelMenuApi";
import { getFormFields } from "./formFileds";
import { FormFieldConfigType } from "../../types/formsTypes";
import DynamicFormFields from "../../components/forms/dynamicFormFields";

type TopLevelMenuValues = z.infer<typeof topLevelMenuSchema>;

const AddTLMenuForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TopLevelMenuValues>({
    resolver: zodResolver(topLevelMenuSchema),
    defaultValues: { name: "", orderBy: 0 },
  });

  const onSubmit = async (data: TopLevelMenuValues) => {
    try {
      await addTopLevelMenuReq(data);
      toast.success("Menu added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to add menu");
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(() => getFormFields(), []);

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Menu
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
            {isSubmitting ? "Adding..." : "Add Menu"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTLMenuForm;
