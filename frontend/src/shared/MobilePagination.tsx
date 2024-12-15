import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number; // Zero-indexed
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void;
}

const MobilePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        className="font-semibold text-sm px-3 py-1 rounded-l-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaArrowLeft />
        <span className="hidden md:flex">Previous</span>
      </button>

      {/* First Page */}
      <button
        className={`font-medium text-sm px-3 py-1 rounded-md hover:bg-gray-100 ${
          currentPage === 0 ? "bg-[#F9F5FF]" : ""
        }`}
        onClick={() => handlePageChange(0)}
      >
        1
      </button>

      {/* Current Page and Previous Page */}
      {currentPage > 1 && (
        <button
          className="font-medium text-sm px-3 py-1 rounded-md hover:bg-gray-100"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage}
        </button>
      )}
      <button
        className={`font-medium text-sm px-3 py-1 rounded-md hover:bg-gray-100 ${
          currentPage > 0 && currentPage < totalPages - 1 ? "bg-[#F9F5FF]" : ""
        }`}
        onClick={() => handlePageChange(currentPage)}
      >
        {currentPage + 1}
      </button>

      {/* Ellipsis */}
      {currentPage < totalPages - 2 && <span className="px-3 py-1">...</span>}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          className={`font-medium text-sm px-3 py-1 rounded-md hover:bg-gray-100 ${
            currentPage === totalPages - 1 ? "bg-[#F9F5FF]" : ""
          }`}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        className="font-semibold text-sm px-3 py-1 rounded-r-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FaArrowRight />
        <span className="hidden md:flex">Next</span>
      </button>
    </div>
  );
};

export default MobilePagination;
