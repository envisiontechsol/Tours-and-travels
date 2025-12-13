import React, { useState, useEffect, ReactNode, memo } from "react";

type Column<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
  showSerialNumber?: boolean;
};

type ReusableTableProps<T> = {
  data: T[];
  columns: Column<T>[] | any[];
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  title?: string;
  showSearch?: boolean;
  className?: string;
  showSerialNumber?: boolean;
};

const ReusableTable = <T extends Record<string, any>>({
  data,
  columns,
  itemsPerPageOptions = [5, 10, 15, 20],
  defaultItemsPerPage = 10,
  title,
  showSearch = true,
  className = "",
  showSerialNumber = true,
}: ReusableTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });
  const [displayedData, setDisplayedData] = useState<T[]>([]);
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<T[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Sorting function
  const sortData = (data: T[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle sort
  const handleSort = (key: keyof T, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    let newData = [...data];

    if (!!searchTerm) {
      newData = newData.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    newData = sortData(newData);

    setFilteredAndSortedData(newData);
  }, [searchTerm, sortConfig, data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setDisplayedData(
      filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage, itemsPerPage, filteredAndSortedData]);

  // Separate arrow components for better control
  const SortArrows = ({ columnKey }: { columnKey: keyof T }) => (
    <span className="inline-flex flex-col ml-1 leading-none">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSort(columnKey, "asc");
        }}
        className="text-gray-400 hover:text-gray-600 text-xs"
      >
        ▲
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSort(columnKey, "desc");
        }}
        className="text-gray-400 hover:text-gray-600 text-xs -mt-2"
      >
        ▼
      </button>
    </span>
  );

  if (data?.length < 1) {
    return (
      <div
        className={`py-6 px-2 sm:px-6 lg:px-8  bg-white ${className} rounded-md`}
      >
        <p className="text-center text-gray-500 text-lg">No Data Found</p>
      </div>
    );
  }

  return (
    <div
      className={`py-6 px-2 sm:px-6 lg:px-8  bg-white ${className} rounded-md`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
        <div className="flex flex-col sm:flex-row mt-3 items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 border rounded-md"
            >
              {itemsPerPageOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-md w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredAndSortedData.length === 0 && searchTerm && (
                <div className="absolute top-full mt-1 w-full p-2 bg-white border rounded-md shadow-lg">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {showSerialNumber && (
                <th className="text-left p-3 text-sm font-normal text-gray-500">
                  Sl.No
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="text-left p-3 text-sm font-normal text-gray-500"
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.sortable !== false && (
                      <SortArrows columnKey={column.key} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {showSerialNumber && (
                  <td className="p-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                )}
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-3">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            &lt;
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`w-8 h-8 flex items-center justify-center rounded-full focus:outline-none ${
                currentPage === number
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ReusableTable);
