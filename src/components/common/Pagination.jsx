import React from "react";
import { LuStepBack, LuStepForward } from "react-icons/lu";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                padding: "20px",
            }}
        >
            <button
                onClick={() => onPageChange(currentPage - 2)}
                disabled={currentPage === 1}
                style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    borderStyle: "none",
                    backgroundColor: "#ffd4d4",
                    fontSize: "x-large",
                    display: "flex"
                }}
            >
                <LuStepBack/>
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page - 1)}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        backgroundColor: page === currentPage ? "#9900ff" : "#ffd4d4",
                        color: page === currentPage ? "#fff" : "#000",
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
                onClick={() => onPageChange(currentPage)}
                disabled={currentPage === totalPages}
                style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    borderStyle: "none",
                    backgroundColor: "#ffd4d4",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    fontSize: "x-large",
                    display: "flex"
                }}
            >
                <LuStepForward/>
            </button>
        </div>
    );
};

export default Pagination;
