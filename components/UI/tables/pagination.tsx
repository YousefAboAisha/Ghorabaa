import { PiArrowFatLeft, PiArrowFatRight } from "react-icons/pi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const createPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after the current
    const pages: (number | "...")[] = [];

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      pages.push("...");
    }

    pages.unshift(...range);

    if (currentPage + delta < totalPages - 1) {
      pages.push("...");
    }

    pages.unshift(1);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-8 h-10">
      <button
        className="flex items-center justify-center !bg-white text-md border rounded-md p-2 px-3 cursor-pointer h-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PiArrowFatRight />
      </button>

      {createPageNumbers().map((pageNum, idx) =>
        typeof pageNum === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(pageNum)}
            className={`flex items-center justify-center bg-white text-md border rounded-md p-2 px-3 cursor-pointer h-full ${
              currentPage === pageNum ? "!bg-secondary text-white" : ""
            }`}
          >
            {pageNum}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-400 text-sm">
            ...
          </span>
        )
      )}

      <button
        className="flex items-center justify-center !bg-white text-md border rounded-md p-2 px-3 cursor-pointer h-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages == 0}
      >
        <PiArrowFatLeft />
      </button>
    </div>
  );
}
