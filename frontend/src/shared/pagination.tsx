import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number; // Zero-indexed
  totalPages: number; // Total number of pages
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
    const pages: number[] = [];
    const startPages = [0, 1, 2]; // Always show the first three pages
    const endPages = [totalPages - 3, totalPages - 2, totalPages - 1]; // Always show the last three pages

    const startEllipsis =
      Math.max(...startPages) + 1 < currentPage - siblingCount;
    const endEllipsis = Math.min(...endPages) - 1 > currentPage + siblingCount;

    const middleStart = Math.max(3, currentPage - siblingCount);
    const middleEnd = Math.min(totalPages - 4, currentPage + siblingCount);

    if (startEllipsis) {
      pages.push(...startPages, -1);
    } else {
      pages.push(...startPages.filter((page) => page < middleStart));
    }

    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }

    if (endEllipsis) {
      pages.push(-1, ...endPages);
    } else {
      pages.push(...endPages.filter((page) => page > middleEnd));
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
