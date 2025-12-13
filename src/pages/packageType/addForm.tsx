import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

import TextInput from "../../components/forms/elements/textInput";
import { packageTypeSchema } from "../../schema/packageTypeSchema";
import { addPackageTypesReq } from "../../services/api/packages/packageTypeApi";

type PackageTypeValues = z.infer<typeof packageTypeSchema>;

const AddPackageTypeForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PackageTypeValues>({
    resolver: zodResolver(packageTypeSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: PackageTypeValues) => {
    try {
      await addPackageTypesReq(data);
      toast.success("Package type added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to add package type");
    }
  };

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Package Type
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
            {isSubmitting ? "Adding..." : "Add Package Type"}
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

export default AddPackageTypeForm;
