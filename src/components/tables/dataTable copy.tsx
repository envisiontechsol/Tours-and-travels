import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  isLoading?: boolean;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
};

const DataTable = <TData,>({
  columns,
  data,
  isLoading = false,
  pageCount = 1,
  pageIndex = 0,
  pageSize = 10,
  onPaginationChange,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: !!onPaginationChange,
    pageCount: pageCount,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handlePageSizeChange = (size: number) => {
    if (onPaginationChange) {
      onPaginationChange(0, size);
    } else {
      table.setPageSize(size);
    }
  };

  const handlePreviousPage = () => {
    const newPageIndex = pageIndex - 1;
    if (onPaginationChange) {
      onPaginationChange(newPageIndex, pageSize);
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    const newPageIndex = pageIndex + 1;
    if (onPaginationChange) {
      onPaginationChange(newPageIndex, pageSize);
    } else {
      table.nextPage();
    }
  };

  return (
    <div className="w-full bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              handlePageSizeChange(size);
            }}
            className="border p-1 rounded"
            disabled={isLoading}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* CENTER SEARCH BAR */}
        <div>
          <input
            type="text"
            placeholder="🔍 Search"
            className="border p-2 rounded w-52"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* RIGHT FILTER INPUT */}
        <div>
          <input
            type="text"
            placeholder="Filter records..."
            className="border p-2 rounded w-52"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
            <div className="text-blue-500 font-semibold">Loading...</div>
          </div>
        )}

        <table className="min-w-full">
          <thead className="bg-blue-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 border font-semibold text-gray-700 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Sorting icons */}
                      {{
                        asc: "▲",
                        desc: "▼",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table
                .getRowModel()
                .rows.filter((row) =>
                  JSON.stringify(row.original)
                    .toLowerCase()
                    .includes(filterInput.toLowerCase())
                )
                .map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 border">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-gray-500"
                >
                  {isLoading ? "Loading data..." : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Page {pageIndex + 1} of {pageCount}
          {!onPaginationChange && ` (Total: ${data.length} records)`}
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            Prev
          </button>

          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage() || isLoading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
