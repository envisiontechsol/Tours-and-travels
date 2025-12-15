import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { tagSchema } from "../../schema/tagSchema";
import { addTagReq, upadteTagReq } from "../../services/api/packages/tagsApi";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { getFormFieldsConfig } from "./formFieldsConfig";
import { TopLevelTagResType } from "../../types/packageType";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { fetchTopLevelMenusReq } from "../../services/api/topLevelMenu/topLevelMenuApi";

type TagValues = z.infer<typeof tagSchema>;

const EditTagForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editTagData);

  const [isSubmitting, setisSubmitting] = useState(false);
  const [topLevelTagsOpts, settopLevelTagsOpts] = useState<OptionType[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "", toplevel: undefined },
  });

  useEffect(() => {
    if (editData?.id) {
      const selectedTopLevelTag = topLevelTagsOpts.find(
        (c) => c.value === editData?.topLevelId
      );
      reset({
        name: editData?.name,
        toplevel: selectedTopLevelTag
          ? {
              label: selectedTopLevelTag.label,
              value: String(selectedTopLevelTag.value),
            }
          : undefined,
      });
    }
  }, [editData, topLevelTagsOpts]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const getTopLevelTagsList = async () => {
    try {
      const res = await fetchTopLevelMenusReq(0, 1);
      const tagsOpts = res?.data?.map((i: TopLevelTagResType) => ({
        label: i.name,
        value: i.id,
      }));
      settopLevelTagsOpts(!!tagsOpts?.length ? tagsOpts : []);
    } catch (error) {}
  };

  useEffect(() => {
    getTopLevelTagsList();
  }, []);

  const onSubmit = async (data: TagValues) => {
    setisSubmitting(true);
    try {
      await upadteTagReq(editData?.id || "", {
        name: data?.name,
        topLevelId: data?.toplevel?.value,
      });
      toast.success("Tag updated successfully!");
      onCancelOrClose();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to update tag");
    } finally {
      setisSubmitting(false);
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig(topLevelTagsOpts),
    [topLevelTagsOpts]
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Tags
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
            {isSubmitting ? "Updating..." : "Update Tag"}
          </button>

          <button
            type="button"
            onClick={() => onCancelOrClose()}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTagForm;
