import React from "react";
import { LuStepBack, LuStepForward } from "react-icons/lu";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePrev = () => {
        if (currentPage > 0) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "20px" }}>
            <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    cursor: currentPage === 0 ? "not-allowed" : "pointer",
                    opacity: currentPage === 0 ? 0.5 : 1,
                    border: "none",
                    backgroundColor: "#ffd4d4",
                    fontSize: "x-large",
                    display: "flex"
                }}
            >
                <LuStepBack />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page - 1)}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        backgroundColor: page - 1 === currentPage ? "#9900ff" : "#ffd4d4",
                        color: page - 1 === currentPage ? "#fff" : "#000",
                        cursor: "pointer",
                        border: "none",
                        transition: "0.2s",
                        fontSize: "x-large",
                        display: "flex"
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#ffd4d4",
                    cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                    fontSize: "x-large",
                    display: "flex"
                }}
            >
                <LuStepForward />
            </button>
        </div>
    );
};

export default Pagination;
