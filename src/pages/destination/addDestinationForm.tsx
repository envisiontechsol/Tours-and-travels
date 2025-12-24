import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import Textarea from "../../components/forms/elements/textarea";
import { destinationSchema } from "../../schema/destinationSchema";
import { addDestinationReq } from "../../services/api/locations/destinationApi";
import { useAuthStore } from "../../store/authStore";
import { FormFieldConfigType } from "../../types/formsTypes";
import {
  getDestinationAboutField,
  getDestinationFormFields,
} from "./destinationFormFields";

type DestinationFormValues = z.infer<typeof destinationSchema>;

const AddDestinationForm: React.FC = () => {
  const { user } = useAuthStore();
  console.log(user, "user");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      isActive: false,
      about: "",
      bannerImagetage: "",
      bannerImage: undefined,
    },
  });

  const onResetForm = () => {
    reset();
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });
  };

  const onSubmit = async (data: DestinationFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.name);
      formData.append("isActive", (!!data.isActive).toString());

      formData.append("about", data.about);
      formData.append("createdById", user?.id || "NA");
      formData.append("bannerImageTag", data?.bannerImagetage || "");
      formData.append("top10Rank", String(data?.top10Rank) || "");

      if (data.bannerImage && data.bannerImage.length > 0) {
        formData.append("bannerImage", data.bannerImage[0]);
      }
      await addDestinationReq(formData);

      toast.success("Destination added successfully!");
      onResetForm();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add destination");
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getDestinationFormFields(),
    []
  );

  const aboutField: FormFieldConfigType = getDestinationAboutField();
  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Destination Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        {/* About Textarea */}
        <div className="mt-5">
          <Controller
            name={aboutField.name as keyof DestinationFormValues}
            control={control}
            render={({ field: controllerField }) => (
              <Textarea
                label={aboutField.label}
                rows={aboutField.rows || 4}
                placeholder={aboutField.placeholder}
                value={controllerField.value as string}
                onChange={controllerField.onChange}
                onBlur={controllerField.onBlur}
                error={
                  errors[aboutField.name as keyof DestinationFormValues]
                    ?.message || null
                }
                required={aboutField.required}
              />
            )}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium"
          >
            Add Destination
          </button>

          <button
            type="button"
            onClick={() => onResetForm()}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinationForm;
