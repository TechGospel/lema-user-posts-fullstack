import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number; // Zero-indexed
  totalPages: number;  // Total number of pages
  onPageChange: (page: number) => void;
  siblingCount?: number; // Number of page buttons to show around the current page
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
}) => {
  const generatePageRange = () => {
    const totalNumbers = siblingCount * 2 + 5; // First, last, and siblingCount * 2
    const totalBlocks = totalNumbers - 2; // Account for possible ellipses

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const startPage = Math.max(0, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    const shouldShowLeftEllipsis = startPage > 1;
    const shouldShowRightEllipsis = endPage < totalPages - 2;

    const pages = [];

    if (shouldShowLeftEllipsis) {
      pages.push(0, -1); // -1 represents an ellipsis
    } else {
      for (let i = 0; i < startPage; i++) pages.push(i);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (shouldShowRightEllipsis) {
      pages.push(-1, totalPages - 1); // -1 represents an ellipsis
    } else {
      for (let i = endPage + 1; i < totalPages; i++) pages.push(i);
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
    <div className="flex items-center justify-center md:justify-end mt-4 space-x-0  md:space-x-4">
      <button
        className="px-3 py-1 rounded-l-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaArrowLeft/>
        <span>Previous</span>
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-3 py-1">...</span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 rounded-md hover:bg-gray-100 ${
              currentPage === page ? "bg-[#F9F5FF] " : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        className="px-3 py-1 rounded-r-md hover:bg-gray-100 disabled:opacity-50 flex gap-2 items-center"
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FaArrowRight/>
        <span>Next</span>
      </button>
    </div>
  );
};

export default Pagination;
