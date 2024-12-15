import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number; // Zero-indexed
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageRange = () => {
    const pages: number[] = [];

    // Always show the first page
    if (currentPage > 2) {
      pages.push(0);
      if (currentPage > 3) {
        pages.push(-1); // Ellipsis
      }
    }

    // Show up to 2 pages before the current page
    for (let i = Math.max(0, currentPage - 2); i < currentPage; i++) {
      pages.push(i);
    }

    // Show the current page
    pages.push(currentPage);

    // Show up to 2 pages after the current page
    for (
      let i = currentPage + 1;
      i < Math.min(currentPage + 3, totalPages);
      i++
    ) {
      pages.push(i);
    }

    // Always show the last page
    if (currentPage < totalPages - 3) {
      if (currentPage < totalPages - 4) {
        pages.push(-1); // Ellipsis
      }
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pages = generatePageRange();

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-end mt-4 space-x-0 md:space-x-4">
      <button
        className="font-semibold text-sm px-3 py-1 rounded-l-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaArrowLeft />
        <span>Previous</span>
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`font-medium text-sm px-3 py-1 rounded-md hover:bg-gray-100 ${
              currentPage === page ? "bg-[#F9F5FF]" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        className="font-semibold text-sm px-3 py-1 rounded-r-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FaArrowRight />
        <span>Next</span>
      </button>
    </div>
  );
};

export default Pagination;
