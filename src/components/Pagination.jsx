
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  // If we're near the beginning
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  }

  // If we're near the end
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 4);
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2 px-4 pb-10">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-gray-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-4 py-2 ${
            currentPage === page
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-gray-800 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;

