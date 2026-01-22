import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { quickLinkSchema } from "../../schema/quickLinkSchema";
import { updateQuickLinkReq } from "../../services/api/quickLinks/quickLinkApi";
import { fetchTourPackagesReq } from "../../services/api/tours/toursApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TourPackageResType } from "../../types/tourTypes";
import { getFormFieldsConfig } from "./formFieldsConfig";

type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;

const EditForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editQuickLinkData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsOpts, setTagsOpts] = useState<OptionType[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickLinkFormValues>({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: {
      name: "",
      url: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      tourPackageIds: [],
    },
  });

  /** 🔹 Fetch tags */
  const getTagsList = async () => {
    try {
      const res = await fetchTourPackagesReq(1, 100);
      const opts = res?.data?.map((i: TourPackageResType) => ({
        label: i.name,
        value: i.id,
      }));
      setTagsOpts(opts || []);
    } catch (error) {}
  };

  useEffect(() => {
    getTagsList();
  }, []);

  useEffect(() => {
    if (!editData || !tagsOpts.length) return;

    const matchedTags = tagsOpts.filter((opt) =>
      editData?.tags?.some(
        (t: { id: string }) => String(t.id) === String(opt.value),
      ),
    );

    reset({
      name: editData.name,
      url: editData.url,
      metaTitle: editData.metaTitle,
      metaKeywords: editData.metaKeywords,
      metaDescription: editData.metaDescription,
      tourPackageIds: matchedTags.map((i) => ({
        label: i.label,
        value: String(i.value),
      })),
    });
  }, [editData, tagsOpts, reset]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: QuickLinkFormValues) => {
    if (!editData?.id) {
      return toast.error("Quick link ID not found");
    }

    setIsSubmitting(true);
    try {
      await updateQuickLinkReq(editData.id, {
        name: data.name,
        url: data.url,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        tourPackageIds: data.tourPackageIds.map((t) => t.value),
      });

      toast.success("Quick link updated successfully!");
      onCancelOrClose();
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to update quick link");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(tagsOpts),
    [tagsOpts],
  );

  if (!editData) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Quick Link
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
            {isSubmitting ? "Updating..." : "Update Quick Link"}
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

export default EditForm;
