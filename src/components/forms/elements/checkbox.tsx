import React from "react";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string | null;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, error, ...rest }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        {...rest}
        type="checkbox"
        className="w-5 h-5 accent-primary cursor-pointer"
      />
      <label className="block text-[14px] font-medium text-gray-700">
        {label}
        {rest.required && <span className="text-red-400">*</span>}
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
