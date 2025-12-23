import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { reviewSchema } from "../../schema/reviewSchema";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import { updateReviewReq } from "../../services/api/reviews/reviewApi";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TagResType } from "../../types/packageType";
import { getFormFieldsConfig } from "./formFieldsConfig";

type ReviewFormValues = z.infer<typeof reviewSchema>;

const EditReviewForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editReviewData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsOpts, setTagsOpts] = useState<OptionType[]>([]);

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

  /** 🔹 Fetch tags */
  const getTagsList = async () => {
    try {
      const res = await fetchTagsReq(1, 100);
      const tagsOpts = res?.data?.map((i: TagResType) => ({
        label: i.name,
        value: i.id,
      }));
      setTagsOpts(tagsOpts || []);
    } catch (error) {}
  };

  useEffect(() => {
    getTagsList();
  }, []);

  /** 🔹 Populate form on edit */
  useEffect(() => {
    if (!editData || !tagsOpts.length) return;
    const matchedTags = tagsOpts.filter((opt) =>
      editData?.tagLinks?.some((t) => String(t.tagId) === String(opt.value))
    );
    reset({
      name: editData.name,
      rating: editData.rating,
      location: editData.location,
      feedback: editData.feedback,
      tagIds: !!matchedTags?.length
        ? matchedTags?.map((i) => ({
            label: i.label,
            value: String(i.value),
          }))
        : [],
    });
  }, [editData, tagsOpts, reset]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: ReviewFormValues) => {
    if (!editData?.id) {
      return toast.error("Review ID not found");
    }

    setIsSubmitting(true);
    try {
      await updateReviewReq(editData.id, {
        name: data.name,
        rating: data.rating,
        location: data.location,
        feedback: data.feedback,
        tagIds: data.tagIds.map((t) => t.value),
      });

      toast.success("Review updated successfully!");
      onCancelOrClose();
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to update review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(tagsOpts),
    [tagsOpts]
  );

  if (!editData) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Edit Review
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
            {isSubmitting ? "Updating..." : "Update Review"}
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

export default EditReviewForm;
