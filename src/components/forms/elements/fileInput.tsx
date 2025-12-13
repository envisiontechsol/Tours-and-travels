import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface FileInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: any;
  accept?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  error,
  accept,
  ...rest
}) => {
  return (
    <div className="w-full">
      <label className="block text-[14px] font-medium text-gray-700">
        {label} {rest.required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="file"
        accept={accept}
        {...rest}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-primary-light"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
