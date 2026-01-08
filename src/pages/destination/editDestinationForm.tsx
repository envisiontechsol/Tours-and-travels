import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";
import Checkbox from "../../components/forms/elements/checkbox";
import Textarea from "../../components/forms/elements/textarea";
import TextInput from "../../components/forms/elements/textInput";
import { destinationSchema } from "../../schema/destinationSchema";
import { updateDestinationReq } from "../../services/api/locations/destinationApi";
import { useAuthStore } from "../../store/authStore";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { FormFieldConfigType } from "../../types/formsTypes";
import {
  getDestinationAboutField,
  getDestinationFormFields,
  getMetaFields,
} from "./destinationFormFields";
import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { TipTapEditorInputRefType } from "../../types/tipTapEditorTypes";
import TipTapEditorInput from "../../components/forms/elements/tipTapEditorInput";

type DestinationFormValues = z.infer<typeof destinationSchema>;

const EditDestinationForm = () => {
  const editData = useEditMgmtStore((s) => s.editiDestinationData);

  const [isSubmitting, setisSubmitting] = useState(false);

  const user = useAuthStore((s) => s.user);
  console.log(user, "user");

  const editorRef = useRef<TipTapEditorInputRefType>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      isActive: false,
      about: "",
    },
  });

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: DestinationFormValues) => {
    if (!editData?.id) return toast.error("Destination ID is not present");
    setisSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.name);
      formData.append("isActive", (!!data.isActive).toString());

      formData.append("about", data.about);
      formData.append(
        "bannerImageTag",
        data?.bannerImagetage?.replace(" ", "").trim() || ""
      );
      formData.append("top10Rank", String(data?.top10Rank) || "");

      formData.append(
        "travelInsuranceIncluded",
        (!!data.travelInsuranceIncluded).toString()
      );
      formData.append(
        "insurancePriceInINR",
        String(data?.insurancePriceInINR) || ""
      );
      formData.append(
        "visaInformationHtml",
        editorRef.current?.getHTML() || ""
      );

      formData.append("metaTitle", data?.metaTitle || "");
      formData.append("metaKeywords", data?.metaKeywords || "");
      formData.append("metaDescription", data?.metaDescription || "");

      if (data.bannerImage && data.bannerImage.length > 0) {
        formData.append("bannerImage", data.bannerImage[0]);
      }
      await updateDestinationReq(editData?.id, formData);
      onCancelOrClose();
      toast.success("Destination upadte successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.errorMsg || "Failed to add destination");
    } finally {
      setisSubmitting(false);
    }
  };

  useEffect(() => {
    if (editData) {
      reset({
        about: editData?.about,
        isActive: editData?.isActive,
        name: editData?.name,
        bannerImagetage: editData?.bannerImageTag || "",
        bannerImage: undefined,
        top10Rank: editData.top10Rank,
        metaTitle: editData?.metaTitle,
        metaKeywords: editData?.metaKeywords,
        metaDescription: editData?.metaDescription,
        travelInsuranceIncluded: editData?.travelInsuranceIncluded,
        insurancePriceInINR: editData?.insurancePriceInINR,
      });
    }
    // if (!!editData?.visaInformationHtml) {
    //   editorRef.current?.setContent(editData.visaInformationHtml);
    // }
  }, [editData, editorRef]);

  const formFields: FormFieldConfigType[] = useMemo(
    () => getDestinationFormFields(editData),
    []
  );
  const metaFormFields: FormFieldConfigType[] = useMemo(
    () => getMetaFields(),
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

        <div className="mt-5">
          <TipTapEditorInput
            ref={editorRef}
            label="Visa Information"
            initialContent={editData?.visaInformationHtml || ""}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={metaFormFields}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium"
          >
            {isSubmitting ? "Updating..." : "Upadte Destination"}
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

export default EditDestinationForm;
