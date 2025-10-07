import React, {useEffect} from 'react';

const DialogWindow = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "30vw",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {title && <h3 style={{ margin: 0, fontSize: "25px" }}>{title}</h3>}
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "25px",
                            cursor: "pointer",
                            lineHeight: 1,
                        }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DialogWindow;