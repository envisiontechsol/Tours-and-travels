import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];

  // from parent
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const DataTable = <TData,>({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,

    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: pageIndex - 1,
        pageSize,
      },
    },

    meta: {
      pageIndex: pageIndex - 1,
      pageSize,
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      if (next.pageIndex !== pageIndex) {
        onPageChange(next.pageIndex);
      }
      if (next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
      }
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between mb-4">
        {/* ENTRIES */}
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageChange(0);
              onPageSizeChange(Number(e.target.value));
            }}
            className="border p-1 rounded"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search"
          className="border p-2 rounded w-52"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        {/* EXTRA FILTER */}
        <input
          type="text"
          placeholder="Filter records..."
          className="border p-2 rounded w-52"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </div>

      {/* ===== TABLE ===== */}
      <table className="min-w-full border">
        <thead className="bg-blue-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 border font-semibold text-gray-700 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: "▲", desc: "▼" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* ===== PAGINATION ===== */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Page {pageIndex} of {totalPages}
        </span>

        <div className="flex items-center gap-1">
          {/* First */}
          <button
            onClick={() => onPageChange(1)}
            disabled={!hasPrev}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ⏮
          </button>

          {/* Prev */}
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!hasPrev}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-3 py-1 border rounded ${
                pageIndex === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!hasNext}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ▶
          </button>

          {/* Last */}
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNext}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
