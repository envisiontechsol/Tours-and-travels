import React from "react";

interface DateInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string | null;
}

const DateInput: React.FC<DateInputProps> = ({ label, error, ...rest }) => {
  return (
    <div className="w-full">
      <label className="block text-[14px] font-medium text-gray-700">
        {label} {rest.required && <span className="text-red-400">*</span>}
      </label>

      <input
        type="date"
        {...rest}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-primary-light"
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
