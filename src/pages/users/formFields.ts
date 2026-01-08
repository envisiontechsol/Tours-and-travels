import { FormFieldConfigType } from "../../types/formsTypes";

export const getUserFormFields = (): FormFieldConfigType[] => [
  {
    name: "name",
    label: "User Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter phone number",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    placeholder: "Enter password",
    required: true,
    gridCols: "md:col-span-1",
  },
];
