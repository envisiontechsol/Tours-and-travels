import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import Checkbox from "../../components/forms/elements/checkbox";
import Textarea from "../../components/forms/elements/textarea";
import TextInput from "../../components/forms/elements/textInput";
import FileInput from "../../components/forms/elements/fileInput";
import SelectInput from "../../components/forms/elements/selectInput";

import { toast } from "react-toastify";

import { fetchDestinationReq } from "../../services/api/locations/destinationApi";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import { tourPackageSchema } from "../../schema/tourPackageSchema";
import { addTourPackageReq } from "../../services/api/tours/toursApi";
import ItineraryManager from "./itineraryManager";
import { fetchPackageTypesReq } from "../../services/api/packages/packageTypeApi";
import { fetchPackageDurationReq } from "../../services/api/packages/packageDurationApi";
import { PackageDurationResType } from "../../types/packageType";

type TourPackageFormValues = z.infer<typeof tourPackageSchema>;

type Option = {
  label: string;
  value: string | number;
  info?: string | number;
};

interface FormFieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "file" | "checkbox" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  gridCols?: string;
  rows?: number;
  options?: Option[];
  isMulti?: boolean;
}

const AddTourPackageForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TourPackageFormValues>({
    resolver: zodResolver(tourPackageSchema),
    defaultValues: {
      name: "",
      code: "",
      url: "",
      priceInINR: 0,
      fakePriceInINR: 0,
      profitMarginPct: 0,
      flightMarginPct: 0,
      hotelMarginPct: 0,
      rating: 0,
      about: "",
      inclusionText: "",
      exclusionText: "",
      startingCity: "",
      isActive: false,
      selected: false,
      destination: undefined,
      packageTypeId: undefined,
      duration: undefined,
      tags: [],
      bannerImage: undefined,
      tourImage: undefined,
      bannerAlt: "",
      tourAlt: "",
      image1Alt: "",
      image2Alt: "",
      image3Alt: "",
      image1Url: undefined,
      image2Url: undefined,
      image3Url: undefined,
    },
  });

  const durationValue = watch("duration");
  const selectedDestination = watch("destination");
  const numberOfDays = useMemo(() => {
    if (!durationValue) return 2;

    // Try to get days from info property
    if (durationValue.info && !isNaN(Number(durationValue.info))) {
      return Number(durationValue.info);
    }

    // Try to extract from label as fallback
    const daysMatch = durationValue.label?.match(/(\d+)\s*Days?/i);
    if (daysMatch) {
      return Number(daysMatch[1]);
    }

    // Default fallback
    return 4;
  }, [durationValue]);

  console.log("Computed numberOfDays:", numberOfDays);

  const [destinationOptions, setDestinationOptions] = useState<Option[]>([]);
  const [tagsOptions, setTagsOptions] = useState<Option[]>([]);
  const [durationOptions, setDurationOptions] = useState<Option[]>([]);
  const [itineraryData, setitineraryData] = useState<any>([]);
  const [packagesTypesOptions, setpackagesTypesOptions] = useState<Option[]>(
    []
  );

  useEffect(() => {
    loadDestinations();
    loadTags();
    loadDurations();
    loadPackages();
  }, []);

  const loadDestinations = async () => {
    try {
      const res = await fetchDestinationReq();
      setDestinationOptions(
        res?.data?.map((d: any) => ({
          label: d.name,
          value: d.id,
        })) || []
      );
    } catch (err) {}
  };

  const loadPackages = async () => {
    try {
      const res = await fetchPackageTypesReq();
      setpackagesTypesOptions(
        res?.data?.items?.map((d: any) => ({
          label: d.name,
          value: d.id,
        })) || []
      );
    } catch (err) {}
  };

  const loadTags = async () => {
    try {
      const res = await fetchTagsReq();
      setTagsOptions(
        res?.data?.items?.map((d: any) => ({
          label: d.name,
          value: d.id,
        })) || []
      );
    } catch (err) {}
  };

  const loadDurations = async () => {
    try {
      const res = await fetchPackageDurationReq();
      setDurationOptions(
        res?.data?.items?.map((d: PackageDurationResType) => ({
          label: `${d.days} Days / ${d.nights} Nights`,
          value: d.id + "",
          info: d.days + "",
        })) || []
      );
    } catch (err) {}
  };

  const convertToItineraryDays = (inputArray: any[]) => {
    return inputArray.map((dayData) => ({
      dayNumber: dayData.day.value,
      activityIds: dayData.cards.map((card: any) => card.id),
    }));
  };

  const onSubmit = async (data: TourPackageFormValues) => {
    if (itineraryData?.length < numberOfDays)
      return toast.error(`Add activities for all selected days`);
    try {
      const formData = new FormData();

      // BASIC FIELDS
      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append("url", data.url || "");
      formData.append("destinationId", data?.destination?.value);
      formData.append("priceInINR", String(data.priceInINR));
      formData.append("fakePriceInINR", String(data.fakePriceInINR));
      formData.append("profitMarginPct", String(data.profitMarginPct));
      formData.append("hotelMarginPct", String(data.hotelMarginPct));
      formData.append("flightMarginPct", String(data.flightMarginPct));
      formData.append("rating", String(data.rating));
      formData.append("about", data.about);
      formData.append("isActive", String(data.isActive));
      formData.append("selected", String(data.selected));

      // RELATIONS
      formData.append("durationId", data?.duration?.value);
      formData.append("typeId", data?.packageTypeId?.value);

      // TAG IDS AS JSON ARRAY
      if (data.tags && data?.tags?.length > 0) {
        const tagIds = data?.tags.map((tag) => tag.value);
        formData.append("tagIds", JSON.stringify(tagIds));
      }

      // IMAGE TAGS
      formData.append("bannerAlt", data.bannerAlt);
      formData.append("tourAlt", data.tourAlt);
      formData.append("image1Alt", data.image1Alt);
      formData.append("image2Alt", data.image2Alt);
      formData.append("image3Alt", data.image3Alt);

      // FILES
      if (data.bannerImage?.length > 0) {
        formData.append("bannerImage", data.bannerImage[0]);
      }
      if (data.tourImage?.length > 0) {
        formData.append("tourImage", data.tourImage[0]);
      }
      if (data.image1Url?.length > 0) {
        formData.append("image1Url", data.image1Url[0]);
      }
      if (data.image2Url?.length > 0) {
        formData.append("image2Url", data.image2Url[0]);
      }
      if (data.image3Url?.length > 0) {
        formData.append("image3Url", data.image3Url[0]);
      }

      if (itineraryData && itineraryData?.length > 0) {
        const itineraryDays = convertToItineraryDays(itineraryData);
        formData.append("itineraryDays", JSON.stringify(itineraryDays));
        console.log(itineraryDays);
      }

      // DEBUG
      for (let [k, v] of formData.entries()) {
        console.log("REQ =>", k, v);
      }

      // await addTourPackageReq(formData);
      // reset();
      toast.success("Tour Package Added Successfully!");
    } catch (err: any) {
      toast.error(err?.errorMsg || "Failed to add tour package");
    }
  };

  console.log(errors);

  const formFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "name",
        label: "Package Name",
        type: "text",
        placeholder: "Enter package name",
        required: true,
        gridCols: "md:col-span-1",
      },
      {
        name: "code",
        label: "Package Code",
        type: "text",
        required: true,
        gridCols: "md:col-span-1",
      },
      {
        name: "url",
        label: "Package URL",
        type: "text",
        gridCols: "md:col-span-1",
      },
      {
        name: "priceInINR",
        label: "Price (INR)",
        type: "number",
        required: true,
      },
      {
        name: "fakePriceInINR",
        label: "Fake Price (Strike-through)",
        type: "number",
      },
      {
        name: "profitMarginPct",
        label: "Profit Margin (%)",
        type: "number",
      },
      {
        name: "flightMarginPct",
        label: "Flight Margin (%)",
        type: "number",
      },
      {
        name: "hotelMarginPct",
        label: "Hotel Margin (%)",
        type: "number",
      },
      {
        name: "rating",
        label: "Rating",
        type: "number",
      },

      {
        name: "packageTypeId",
        label: "Package Type",
        type: "select",
        options: packagesTypesOptions || [],
        required: true,
      },
      {
        name: "destination",
        label: "Destination",
        type: "select",
        options: destinationOptions,
        required: true,
      },
      {
        name: "duration",
        label: "Duration",
        type: "select",
        options: durationOptions,
        required: true,
      },
      {
        name: "tags",
        label: "Tags",
        type: "select",
        options: tagsOptions,
        isMulti: true,
      },

      // ----- IMAGES -----
    ],
    [destinationOptions, durationOptions, tagsOptions, packagesTypesOptions]
  );

  const section2Fields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "bannerImage",
        label: "Banner Image",
        type: "file",
      },
      {
        name: "bannerAlt",
        label: "Banner Tag",
        type: "text",
      },
      {
        name: "tourImage",
        label: "Tour Image",
        type: "file",
      },
      {
        name: "tourAlt",
        label: "Tour Tag",
        type: "text",
      },
      {
        name: "image1Url",
        label: "Image 1 ",
        type: "file",
      },
      {
        name: "image1Alt",
        label: "Image 1 Tag",
        type: "text",
      },

      {
        name: "image2Url",
        label: "Image 2 ",
        type: "file",
      },
      {
        name: "image2Alt",
        label: "Image 2 Tag",
        type: "text",
      },
      {
        name: "image3Url",
        label: "Image 3 ",
        type: "file",
      },
      {
        name: "image3Alt",
        label: "Image 3 Tag",
        type: "text",
      },

      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
      },
      {
        name: "selected",
        label: "Selected",
        type: "checkbox",
      },
    ],
    []
  );

  const aboutField: FormFieldConfig & { name: keyof TourPackageFormValues } = {
    name: "about",
    label: "About Package",
    type: "textarea",
    rows: 4,
  };

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Tour Package Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className={field.gridCols}>
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: controllerField }) => {
                  if (field.type === "number") {
                    return (
                      <TextInput
                        label={field.label}
                        type="number"
                        value={controllerField.value + ""}
                        onChange={(e) =>
                          controllerField.onChange(Number(e.target.value) || 0)
                        }
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  if (field.type === "file") {
                    return (
                      <FileInput
                        label={field.label}
                        onChange={(e) =>
                          controllerField.onChange(e.target.files)
                        }
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <Checkbox
                        label={field.label}
                        checked={controllerField.value as boolean}
                        onChange={controllerField.onChange}
                      />
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <SelectInput
                        label={field.label}
                        value={controllerField.value}
                        options={field.options || []}
                        isMulti={field.isMulti}
                        onChange={(val) => controllerField.onChange(val)}
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  return (
                    <TextInput
                      label={field.label}
                      placeholder={field.placeholder}
                      value={controllerField.value as string}
                      onChange={controllerField.onChange}
                      error={
                        errors[field.name as keyof TourPackageFormValues]
                          ?.message
                      }
                    />
                  );
                }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section2Fields.map((field) => (
            <div key={field.name} className={field.gridCols}>
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: controllerField }) => {
                  if (field.type === "number") {
                    return (
                      <TextInput
                        label={field.label}
                        type="number"
                        value={controllerField.value + ""}
                        onChange={(e) =>
                          controllerField.onChange(Number(e.target.value) || 0)
                        }
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  if (field.type === "file") {
                    return (
                      <FileInput
                        label={field.label}
                        onChange={(e) =>
                          controllerField.onChange(e.target.files)
                        }
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  if (field.type === "checkbox") {
                    return (
                      <Checkbox
                        label={field.label}
                        checked={controllerField.value as boolean}
                        onChange={controllerField.onChange}
                      />
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <SelectInput
                        label={field.label}
                        value={controllerField.value || ""}
                        options={field.options || []}
                        defaultValue={null}
                        isMulti={field.isMulti}
                        onChange={(val) => controllerField.onChange(val)}
                        error={
                          errors[field.name as keyof TourPackageFormValues]
                            ?.message
                        }
                      />
                    );
                  }

                  return (
                    <TextInput
                      label={field.label}
                      placeholder={field.placeholder}
                      value={controllerField.value as string}
                      onChange={controllerField.onChange}
                      error={
                        errors[field.name as keyof TourPackageFormValues]
                          ?.message
                      }
                    />
                  );
                }}
              />
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <Controller
          name={aboutField.name}
          control={control}
          render={({ field: controllerField }) => (
            <Textarea
              label={aboutField.label}
              rows={aboutField.rows}
              value={controllerField.value}
              onChange={controllerField.onChange}
              error={errors.about?.message}
            />
          )}
        />

        {selectedDestination?.label && (
          <ItineraryManager
            numberOfDays={numberOfDays}
            onChangeItinerary={(data) => setitineraryData(data || [])}
            destinationName={selectedDestination?.label || ""}
          />
        )}

        {!selectedDestination?.label && (
          <div className="w-full p-4 flex flex-col items-center justify-center">
            <p className="text-red-400">
              Select destination to assign activites
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !selectedDestination?.label}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-60"
          >
            Add Package
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTourPackageForm;
