import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { tourPackageSchema } from "../../schema/tourPackageSchema";
import { fetchDestinationReq } from "../../services/api/locations/destinationApi";
import { fetchPackageDurationReq } from "../../services/api/packages/packageDurationApi";
import { fetchPackageTypesReq } from "../../services/api/packages/packageTypeApi";
import { fetchTagsReq } from "../../services/api/packages/tagsApi";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { PackageDurationResType } from "../../types/packageType";
import { getFormFieldsConfig, getFormFieldsConfig2 } from "./formFeildsConfig";
import ItineraryManager from "./itineraryManager";
import { addTourPackageReq } from "../../services/api/tours/toursApi";
import { convertStringToUrlSlug } from "../../utils/functions/stringToUrlSlug";
import { fetchSlotsCategoryReq } from "../../services/api/others/slotsCatApi";

type TourPackageFormValues = z.infer<typeof tourPackageSchema>;

const AddTourPackageForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,

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

  const nameValue = watch("name");

  useEffect(() => {
    if (typeof nameValue !== "string") return;

    setValue("url", convertStringToUrlSlug(nameValue));
  }, [nameValue]);
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

  const [destinationOptions, setDestinationOptions] = useState<OptionType[]>(
    []
  );
  const [tagsOptions, setTagsOptions] = useState<OptionType[]>([]);
  const [durationOptions, setDurationOptions] = useState<OptionType[]>([]);
  const [itineraryData, setitineraryData] = useState<any>([]);
  const [packagesTypesOptions, setpackagesTypesOptions] = useState<
    OptionType[]
  >([]);

  useEffect(() => {
    loadDestinations();
    loadTags();
    loadDurations();
    loadPackages();
  }, []);

  const onResetForm = () => {
    reset();
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      (input as HTMLInputElement).value = "";
    });
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
    } catch (err) {}
  };
  const loadSlots = async () => {
    try {
      const res = await fetchSlotsCategoryReq();
      // setDestinationOptions(
      //   res?.data?.map((d: any) => ({
      //     label: d.name,
      //     value: d.id,
      //   })) || []
      // );
    } catch (err) {}
  };

  const loadPackages = async () => {
    try {
      const res = await fetchPackageTypesReq();
      setpackagesTypesOptions(
        res?.data?.map((d: any) => ({
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
        res?.data?.map((d: any) => ({
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
        res?.data?.map((d: PackageDurationResType) => ({
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
      formData.append("code", data?.code || "");
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
      formData.append("bannerAlt", data.bannerAlt || "");
      formData.append("tourAlt", data.tourAlt || "");
      formData.append("image1Alt", data.image1Alt || "");
      formData.append("image2Alt", data.image2Alt || "");
      formData.append("image3Alt", data.image3Alt || "");

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

      await addTourPackageReq(formData);
      onResetForm();
      toast.success("Tour Package Added Successfully!");
    } catch (err: any) {
      toast.error(err?.errorMsg || "Failed to add tour package");
    }
  };

  console.log(errors);

  const formFields: FormFieldConfigType[] = useMemo(
    () =>
      getFormFieldsConfig(
        false,
        packagesTypesOptions,
        destinationOptions,
        durationOptions,
        tagsOptions
      ),
    [destinationOptions, durationOptions, tagsOptions, packagesTypesOptions]
  );

  const section2Fields: FormFieldConfigType[] = useMemo(
    () => getFormFieldsConfig2(),
    []
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Tour Package Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={section2Fields}
          />
        </div>

        {selectedDestination?.label && (
          <ItineraryManager
            numberOfDays={numberOfDays}
            onChangeItinerary={(data) => setitineraryData(data || [])}
            destinationId={selectedDestination?.value || ""}
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
            {isSubmitting ? "Adding..." : "Add Tour Package"}
          </button>

          <button
            type="button"
            onClick={() => onResetForm()}
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
