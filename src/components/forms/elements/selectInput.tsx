import React from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  error?: any;
  value?: Option | null;
  onChange?: (value: any | null) => void;
  isMulti?: boolean;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: Option | null;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  value,
  onChange,
  isMulti = false,
  required,
  defaultValue,
  disabled,
  ...rest
}) => {
  console.log(value, "value " + label);

  return (
    <div>
      <label className="block text-[14px] font-medium text-gray-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="mt-1">
        <Select
          isDisabled={disabled}
          classNamePrefix="react-select"
          value={value || ""}
          onChange={onChange}
          options={options}
          defaultValue={defaultValue}
          isMulti={isMulti}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#d1d5db",
              boxShadow: "none",
              padding: 2,
              "&:hover": { borderColor: "#9ca3af" },
            }),
          }}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
