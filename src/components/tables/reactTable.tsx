// import React, { useState, useMemo } from "react";
// import {
//   useTable,
//   usePagination,
//   useGlobalFilter,
//   useSortBy,
// } from "react-table";

// // Define types
// type Column<T> = {
//   Header: string;
//   accessor: keyof T;
//   Cell?: (props: { value: any; row: { values: T } }) => React.ReactNode;
//   disableSortBy?: boolean;
// };

// type ReusableReactTableProps<T> = {
//   data: T[];
//   columns: Column<T>[];
//   title?: string;
//   showSearch?: boolean;
//   className?: string;
// };

// function ReusableReactTable<T extends Record<string, unknown>>({
//   data,
//   columns,
//   title,
//   showSearch = true,
//   className = "",
// }: ReusableReactTableProps<T>) {
//   const [globalFilter, setGlobalFilter] = useState("");

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state: { pageIndex, pageSize },
//     previousPage,
//     nextPage,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     setPageSize,
//     setGlobalFilter: setReactTableGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const handleGlobalFilterChange = (value: string) => {
//     setGlobalFilter(value);
//     setReactTableGlobalFilter(value);
//   };

//   return (
//     <div
//       className={`py-6 px-2 sm:px-6 lg:px-8 mt-6 bg-white ${className} rounded-md`}
//     >
//       <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
//         {title && <h1 className="text-xl font-semibold">{title}</h1>}
//         <div className="flex flex-col sm:flex-row mt-3 items-center gap-4">
//           {showSearch && (
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="px-4 py-2 border rounded-md w-64"
//                 value={globalFilter}
//                 onChange={(e) => handleGlobalFilterChange(e.target.value)}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <table {...getTableProps()} className="w-full border-collapse">
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
//               {headerGroup.headers.map((column) => (
//                 <th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   className="text-left p-3 text-sm font-normal text-gray-500"
//                 >
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} className="border-b hover:bg-gray-50">
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()} className="p-3">
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center gap-2 mt-6">
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </span>
//         <select
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//           className="px-2 py-1 border rounded-md"
//         >
//           {[10, 20, 30, 40].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={() => previousPage()}
//           disabled={!canPreviousPage}
//           className={`w-8 h-8 flex items-center justify-center rounded-full ${
//             !canPreviousPage
//               ? "bg-gray-200 text-gray-400"
//               : "bg-gray-300 hover:bg-gray-400"
//           }`}
//         >
//           &lt;
//         </button>
//         {[...Array(pageCount)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => gotoPage(i)}
//             className={`w-8 h-8 flex items-center justify-center rounded-full focus:outline-none ${
//               i === pageIndex
//                 ? "bg-primary text-white"
//                 : "bg-gray-200 text-black hover:bg-gray-300"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => nextPage()}
//           disabled={!canNextPage}
//           className={`w-8 h-8 flex items-center justify-center rounded-full ${
//             !canNextPage
//               ? "bg-gray-200 text-gray-400"
//               : "bg-gray-300 hover:bg-gray-400"
//           }`}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ReusableReactTable;
