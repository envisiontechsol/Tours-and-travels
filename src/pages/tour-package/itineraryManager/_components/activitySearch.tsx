interface ActivitySearchProps {
  searchText: string;
  disabled: boolean;
  onSearchChange: (text: string) => void;
}

export default function ActivitySearch({
  searchText,
  disabled,
  onSearchChange,
}: ActivitySearchProps) {
  return (
    <input
      type="text"
      placeholder="Search activities..."
      className="border p-2 rounded-md w-full my-4"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      disabled={disabled}
    />
  );
}
