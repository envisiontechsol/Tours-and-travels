import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { tagSchema } from "../../schema/tagSchema";
import { addTagReq } from "../../services/api/packages/tagsApi";
import { fetchTopLevelMenusReq } from "../../services/api/topLevelMenu/topLevelMenuApi";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TopLevelTagResType } from "../../types/packageType";
import { getFormFieldsConfig } from "./formFieldsConfig";

type TagValues = z.infer<typeof tagSchema>;

const AddTagForm: React.FC = () => {
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

  const getTopLevelTagsList = async () => {
    try {
      const res = await fetchTopLevelMenusReq();
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
      await addTagReq({ name: data?.name, topLevelId: data?.toplevel?.value });
      toast.success("Tag added successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add tag");
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
            {isSubmitting ? "Adding..." : "Add Tag"}
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

export default AddTagForm;
