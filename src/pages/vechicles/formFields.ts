import { FormFieldConfigType } from "../../types/formsTypes";
import { VehicleResType } from "../../types/vechicleTypes";

export const getVehicleFormFields = (
  formData?: VehicleResType | null
): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Vehicle Name",
    type: "text",
    placeholder: "Enter vehicle name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "numberSeats",
    label: "Number of Seats",
    type: "number",
    placeholder: "Enter seating capacity",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "vehicleImage",
    label: "Vehicle Image (1024 × 1024)",
    type: "file",
    previewUrl: formData?.imageUrl || undefined,
    gridCols: "md:col-span-2",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Write about this vehicle",
    required: true,
    rows: 4,
    gridCols: "md:col-span-2",
  },
];
