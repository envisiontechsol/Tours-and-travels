import { ViewFieldConfigType } from "../../types/formsTypes";

interface ViewFieldProps {
  label: string;
  value: any;
  type?: "text" | "boolean" | "image" | "date" | "number";
}

interface DynamicViewProps {
  data: Record<string, any>;
  fields: ViewFieldConfigType[];
}

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => {
    return acc?.[key];
  }, obj);
};

const ViewField = ({ label, value, type = "text" }: ViewFieldProps) => {
  const renderValue = () => {
    if (value === null || value === undefined || value === "")
      return <span className="text-gray-400">—</span>;

    switch (type) {
      case "boolean":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {value ? "Active" : "Inactive"}
          </span>
        );

      case "image":
        return (
          <img
            src={value}
            alt={label}
            className="w-44 h-28 object-cover rounded-md border"
          />
        );

      case "date":
        return new Date(value).toLocaleString();

      default:
        return <span className="font-medium">{value}</span>;
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <div className="text-gray-800">{renderValue()}</div>
    </div>
  );
};

const DynamicView = ({ data, fields }: DynamicViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <ViewField
          key={field.key}
          label={field.label}
          value={
            field.render ? field.render() : getNestedValue(data, field.key)
          }
          type={field.type}
        />
      ))}
    </div>
  );
};

export default DynamicView;
