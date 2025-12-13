import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";
import TextInput from "./elements/textInput";
import FileInput from "./elements/fileInput";
import Checkbox from "./elements/checkbox";
import Textarea from "./elements/textarea";
import SelectInput from "./elements/selectInput";
import { FormFieldConfigType } from "../../types/formsTypes";

interface Props<FormValues extends FieldValues> {
  fields: FormFieldConfigType[];
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const DynamicFormFields = <FormValues extends FieldValues>({
  fields,
  control,
  errors,
}: Props<FormValues>) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className={field.gridCols}>
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: controllerField }) => {
              const error = errors[field.name]?.message as string | undefined;

              switch (field.type) {
                case "number":
                  return (
                    <TextInput
                      label={field.label}
                      type="number"
                      placeholder={field.placeholder}
                      value={controllerField.value + ""}
                      onChange={(e) =>
                        controllerField.onChange(
                          e.target.value ? Number(e.target.value) : 0
                        )
                      }
                      disabled={field?.disabled}
                      onBlur={controllerField.onBlur}
                      error={error}
                      required={field.required}
                    />
                  );

                case "file":
                  const hasPreview = field.previewUrl && !controllerField.value;
                  return (
                    <div className="flex gap-x-2">
                      {hasPreview && (
                        <div className="w-20 h-20 border rounded overflow-hidden cursor-pointer group">
                          <img
                            src={field.previewUrl}
                            className="w-full h-full object-cover"
                            onClick={() =>
                              window.open(field.previewUrl, "_blank")
                            }
                          />
                        </div>
                      )}
                      <FileInput
                        label={field.label}
                        onChange={(e) =>
                          controllerField.onChange(e.target.files)
                        }
                        disabled={field?.disabled}
                        onBlur={controllerField.onBlur}
                        error={error}
                      />
                    </div>
                  );

                case "checkbox":
                  return (
                    <Checkbox
                      label={field.label}
                      checked={controllerField.value as boolean}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      disabled={field?.disabled}
                    />
                  );

                case "textarea":
                  return (
                    <Textarea
                      label={field.label}
                      rows={field.rows || 4}
                      placeholder={field.placeholder}
                      value={controllerField.value as string}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      disabled={field?.disabled}
                      error={error}
                    />
                  );

                case "select":
                  return (
                    <SelectInput
                      label={field.label}
                      value={controllerField.value}
                      options={field.options || []}
                      onChange={(val) => controllerField.onChange(val)}
                      isMulti={field?.isMulti}
                      required={field.required}
                      disabled={field?.disabled}
                      error={error}
                    />
                  );

                default:
                  return (
                    <TextInput
                      label={field.label}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={controllerField.value as string}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      required={field.required}
                      disabled={field?.disabled}
                      error={error}
                    />
                  );
              }
            }}
          />
        </div>
      ))}
    </>
  );
};

export default DynamicFormFields;
