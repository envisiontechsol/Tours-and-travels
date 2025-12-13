import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import TextInput from "../../components/forms/elements/textInput";
import { packageDurationSchema } from "../../schema/packageDurationSchema";
import { addPackageDurationReq } from "../../services/api/packages/packageDurationApi";
import { PackageDurationReqBodyType } from "../../types/packageType";
import { toast } from "react-toastify";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getPDFormFields } from "./packageDurationFormFields";

type PackageDurationValues = z.infer<typeof packageDurationSchema>;

const AddPackageDurationForm: React.FC = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageDurationValues>({
    resolver: zodResolver(packageDurationSchema),
    defaultValues: { name: "", days: 0, nights: 0 },
  });

  const onSubmit = async (data: PackageDurationReqBodyType) => {
    setisSubmitting(true);
    try {
      await addPackageDurationReq(data);
      toast.success("Record added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to add");
    } finally {
      setisSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getPDFormFields(),
    []
  );
  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      {/* Section Header Bubble */}
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Package Duration
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
            className="px-4 py-2 rounded-md bg-primary text-white font-medium"
          >
            {isSubmitting ? "Adding..." : "Add Package Duration"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackageDurationForm;
