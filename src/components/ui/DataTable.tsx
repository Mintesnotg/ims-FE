import React, { useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string | number | boolean | React.ReactElement>[];
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  serverSidePagination?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  rowsPerPage = 5, 
  onPageChange,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  serverSidePagination = false
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  
  // Use external pagination if server-side, otherwise use internal
  const currentPage = serverSidePagination ? (externalCurrentPage || 1) : internalCurrentPage;
  const totalPages = serverSidePagination ? (externalTotalPages || 1) : Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (serverSidePagination && onPageChange) {
        onPageChange(page);
      } else {
        setInternalCurrentPage(page);
      }
    }
  };

  // For server-side pagination, use data as-is. For client-side, slice the data
  const paginatedData = serverSidePagination ? data : (() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return data.slice(startIdx, startIdx + rowsPerPage);
  })();

  return (
    <div className="flex sm:justify-center w-full">
      <div className="shadow-lg rounded-lg overflow-x-auto w-full max-w-6xl">
        <table className="w-full bg-white">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 border-b border-gray-200">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end items-center p-4 bg-white border-t border-gray-200">
          <button
            className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 