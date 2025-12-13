import React from "react";

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  label: string;
  error?: any;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, ...rest }) => {
  return (
    <div>
      <label className="block text-[14px] font-medium text-gray-700">
        {label}
        {rest.required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        {...rest}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-primary-light"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
