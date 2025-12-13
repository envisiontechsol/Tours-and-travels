import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Textarea from "../../components/forms/elements/textarea";

import { toast } from "react-toastify";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { slotsCategory } from "../../constants/slotsCategory";
import { activitySchema } from "../../schema/activitySchema";
import {
  addActivityReq,
  updateActivityReq,
} from "../../services/api/activites/activityApi";
import { fetchDestinationReq } from "../../services/api/locations/destinationApi";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import {
  getActivitydescriptionField,
  getActivityFormFields,
} from "./activityFormFields";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { fetchSlotsCategoryReq } from "../../services/api/others/slotsCatApi";

type ActivityFormValues = z.infer<typeof activitySchema>;

const EditActivityForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editiActivityData);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      category: undefined,
      destination: undefined,
      description: "",
      bannerImage: undefined,
      image1: undefined,
      image2: undefined,
      image3: undefined,
      image4: undefined,
      bannerTag: "",
      image1Tag: "",
      image2Tag: "",
      image3Tag: "",
      image4Tag: "",
      isActive: false,
      editable: false,
      priceInINR: 0,
    },
  });

  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<OptionType[]>(
    []
  );
  const [isSubmitting, setisSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
    loadDestinations();
  }, []);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  useEffect(() => {
    if (!editData) return;

    const selectedCategory = categoryOptions.find(
      (c) => c.value === editData?.categoryId
    );

    const selectedDestination = destinationOptions.find(
      (d) => d.value === editData?.destinationId
    );

    reset({
      title: editData?.title || "",
      description: editData?.description || "",
      bannerImage: undefined,
      image1: undefined,
      image2: undefined,
      image3: undefined,
      image4: undefined,
      bannerTag: editData?.bannerImagetage || "",
      image1Tag: editData?.image1tage || "",
      image2Tag: editData?.image2tage || "",
      image3Tag: editData?.image3tage || "",
      image4Tag: editData?.image4tage || "",
      isActive: !!editData?.isActive,
      editable: !!editData?.editable,
      priceInINR: Number(editData?.priceInINR || 0),

      category: selectedCategory
        ? {
            label: selectedCategory.label,
            value: String(selectedCategory.value),
          }
        : undefined,

      destination: selectedDestination
        ? {
            label: selectedDestination.label,
            value: String(selectedDestination.value),
          }
        : undefined,
    });
  }, [categoryOptions, destinationOptions, editData]);

  const loadCategories = async () => {
    try {
      const res = await fetchSlotsCategoryReq();
      setCategoryOptions(
        res?.data?.map((cat: any) => ({
          label: cat.name,
          value: cat.id,
        })) || []
      );
    } catch (err) {
      console.log("Failed to load categories", err);
    }
  };

  const loadDestinations = async () => {
    try {
      const res = await fetchDestinationReq();
      setDestinationOptions(
        res?.data?.map((d: any) => ({
          label: d.name,
          value: d.id,
        })) || []
      );
    } catch (err) {
      console.log("Failed to load destinations", err);
    }
  };

  const onSubmit = async (data: ActivityFormValues) => {
    setisSubmitting(true);

    try {
      const formData = new FormData();

      // ---- NORMAL FIELDS ----
      formData.append("title", data.title);
      formData.append("destinationId", data?.destination?.value);
      formData.append("description", data.description ?? "");
      formData.append("priceInINR", data.priceInINR.toString());
      formData.append("isActive", (!!data?.isActive).toString());
      formData.append("editable", (!!data?.editable).toString());

      formData.append("categoryId", data.category.value);

      // ---- TAG FIELDS ----
      formData.append("bannerImagetage", data?.bannerTag || "");

      formData.append("image1tage", data?.image1Tag || "");
      formData.append("image2tage", data?.image2Tag || "");
      formData.append("image3tage", data?.image3Tag || "");
      formData.append("image4tage", data?.image4Tag || "");

      // ---- FILES ----
      if (data.bannerImage && data.bannerImage.length > 0) {
        formData.append("bannerImage", data.bannerImage[0]);
      }

      if (data.image1 && data.image1.length > 0) {
        formData.append("image1", data.image1[0]);
      }
      if (data.image2 && data.image2.length > 0) {
        formData.append("image2", data.image2[0]);
      }
      if (data.image3 && data.image3.length > 0) {
        formData.append("image3", data.image3[0]);
      }
      if (data.image4 && data.image4.length > 0) {
        formData.append("image4", data.image4[0]);
      }

      // ---- DEBUG OUTPUT ----
      for (let [key, value] of formData.entries()) {
        console.log("REQ:", key, value);
      }

      await updateActivityReq(editData?.id || "", formData);
      toast.success("Activity updated successfully!");
      onCancelOrClose();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to update activity");
    } finally {
      setisSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getActivityFormFields(categoryOptions, destinationOptions, editData),
    [categoryOptions, destinationOptions, editData]
  );

  const descriptionField: FormFieldConfigType = getActivitydescriptionField();

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Activity Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        <div className="mt-5">
          <Controller
            name={descriptionField.name as keyof ActivityFormValues}
            control={control}
            render={({ field: controllerField }) => (
              <Textarea
                label={descriptionField.label}
                rows={descriptionField.rows || 4}
                placeholder={descriptionField.placeholder}
                value={controllerField.value as string}
                onChange={controllerField.onChange}
                onBlur={controllerField.onBlur}
                error={
                  errors[descriptionField.name as keyof ActivityFormValues]
                    ?.message
                }
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
            {isSubmitting ? "Updating..." : "Update Activity"}
          </button>

          <button
            type="button"
            onClick={() => onCancelOrClose()}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditActivityForm;
