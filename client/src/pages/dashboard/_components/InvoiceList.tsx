import { FC, useState } from "react";
import { InvoiceListItem } from "./InvoiceListItem";

const ITEMS_PER_PAGE = 6; // adjust as needed

export const InvoiceList: FC = () => {
  const invoices = [
    { status: "Valid" },
    { status: "Invalid" },
    { status: "Valid" },
    { status: "Valid" },
    { status: "Valid" },
    { status: "Invalid" },
    { status: "Valid" },
     { status: "Valid" },
    { status: "Valid" },
    { status: "Invalid" },
    { status: "Valid" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className=" shadow-md rounded-xl p-4 space-y-4">
      <div className="space-y-3">
        {currentInvoices.map((invoice, idx) => (
          <InvoiceListItem key={idx} status={invoice.status || "Invalid"} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className="px-3 py-1 rounded  disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : " "
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded  disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
