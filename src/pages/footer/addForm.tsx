import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { footerSchema } from "../../schema/footerSchema";
import { addFooterReq } from "../../services/api/footer/footerApi";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getFormFieldsConfig } from "./formFieldsConfig";

type FooterFormValues = z.infer<typeof footerSchema>;

const AddFooterForm: React.FC = () => {
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

  const onSubmit = async (data: FooterFormValues) => {
    setIsSubmitting(true);
    try {
      await addFooterReq({
        name: data.name,
        value: data.value,
      });

      toast.success("Footer added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add footer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(),
    [],
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Footer
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
            {isSubmitting ? "Adding..." : "Add Footer"}
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

export default AddFooterForm;
