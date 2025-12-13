export type OptionType = {
  label: string;
  value: string | number;
  info?: any;
};

export interface FormFieldConfigType {
  name: string;
  label: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "password"
    | "file"
    | "checkbox"
    | "textarea"
    | "select";
  placeholder?: string;
  required?: boolean;
  gridCols?: string;
  rows?: number;
  options?: OptionType[];
  isMulti?: boolean;
  previewUrl?: string;
  disabled?: boolean;
}
