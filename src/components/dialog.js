import React, { useState } from "react";

const Model = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`dialog ${isOpen ? "open" : "closed"}`}>
      <div className="dialog-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="text-page">
          {/* Render the content of the current page */}
          Page {currentPage} Content
        </div>
        <div className="button-container">
          <button
            className="prev-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="next-button"
            onClick={handleNextPage}
            disabled={currentPage === 5}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;
