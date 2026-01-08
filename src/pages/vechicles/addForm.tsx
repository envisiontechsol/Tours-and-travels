import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import Textarea from "../../components/forms/elements/textarea";

import { FormFieldConfigType } from "../../types/formsTypes";
import { getVehicleFormFields } from "./formFields";
import { vehicleSchema } from "../../schema/vechicleSchema";
import { addVehicleReq } from "../../services/api/vechicles/vechiclesApi";

type VehicleFormValues = z.infer<typeof vehicleSchema>;

const AddVehicleForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      numberSeats: 0,
      description: "",
      vehicleImage: undefined,
    },
  });

  const onResetForm = () => {
    reset();

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });
  };

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("numberSeats", String(data.numberSeats));
      formData.append("description", data.description);

      if (data.vehicleImage && data.vehicleImage.length > 0) {
        formData.append("vehicleImage", data.vehicleImage[0]);
      }

      await addVehicleReq(formData);

      toast.success("Vehicle added successfully!");
      onResetForm();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add vehicle");
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getVehicleFormFields(),
    []
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Vehicle Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* BASIC FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium"
          >
            Add Vehicle
          </button>

          <button
            type="button"
            onClick={onResetForm}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
