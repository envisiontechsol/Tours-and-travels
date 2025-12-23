import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { reviewSchema } from "../../schema/reviewSchema";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import { addReviewReq } from "../../services/api/reviews/reviewApi";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TagResType } from "../../types/packageType";
import { getFormFieldsConfig } from "./formFieldsConfig";

type ReviewFormValues = z.infer<typeof reviewSchema>;

const AddForm: React.FC = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [tagsOpts, settagsOpts] = useState<OptionType[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      rating: 0,
      location: "",
      feedback: "",
      tagIds: [],
    },
  });

  const getTagsList = async () => {
    try {
      const res = await fetchTagsReq(1, 100);
      const tagsOpts = res?.data?.map((i: TagResType) => ({
        label: i.name,
        value: i.id,
      }));
      settagsOpts(!!tagsOpts?.length ? tagsOpts : []);
    } catch (error) {}
  };

  useEffect(() => {
    getTagsList();
  }, []);

  const onSubmit = async (data: ReviewFormValues) => {
    setisSubmitting(true);
    try {
      await addReviewReq({
        name: data?.name,
        rating: data?.rating,
        location: data?.location,
        feedback: data?.feedback,
        tagIds: data?.tagIds.map((tag) => tag.value),
      });
      toast.success("Review added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add review");
    } finally {
      setisSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(tagsOpts),
    [tagsOpts]
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Review
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
            {isSubmitting ? "Adding..." : "Add Review"}
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
