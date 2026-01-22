import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { quickLinkSchema } from "../../schema/quickLinkSchema";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import { addQuickLinkReq } from "../../services/api/quickLinks/quickLinkApi";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TagResType } from "../../types/packageType";
import { getFormFieldsConfig } from "./formFieldsConfig";
import { fetchTourPackagesReq } from "../../services/api/tours/toursApi";
import { TourPackageResType } from "../../types/tourTypes";

type QuickLinkFormValues = z.infer<typeof quickLinkSchema>;

const AddForm: React.FC = () => {
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

  const getTagsList = async () => {
    try {
      const res = await fetchTourPackagesReq(1, 100);
      const opts = res?.data?.map((i: TourPackageResType) => ({
        label: i.name,
        value: i.id,
      }));
      setTagsOpts(opts?.length ? opts : []);
    } catch (err) {}
  };

  useEffect(() => {
    getTagsList();
  }, []);

  const onSubmit = async (data: QuickLinkFormValues) => {
    setIsSubmitting(true);
    try {
      await addQuickLinkReq({
        name: data.name,
        url: data.url,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        tourPackageIds: data.tourPackageIds.map((tag) => tag.value),
      });

      toast.success("Quick link added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add quick link");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(tagsOpts),
    [tagsOpts],
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Quick Link
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
            {isSubmitting ? "Adding..." : "Add Quick Link"}
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

export default AddForm;
