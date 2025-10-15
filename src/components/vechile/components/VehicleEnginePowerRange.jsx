import React, {useState} from 'react';

const VehicleEnginePowerRange = () => {
    const [powerFrom, setPowerFrom] = useState("");
    const [powerTo, setPowerTo] = useState("");
    const [error, setError] = useState("")

    const handleApply = () => {
        if (powerFrom === "" || powerTo === "") {
            setError("Both fields must be filled");
            return;
        }

        if (Number(powerFrom) < 0 || Number(powerTo) < 0) {
            setError("Values must be non-negative");
            return;
        }

        if (Number(powerFrom) > Number(powerTo)) {
            setError("“To” value should be greater than “From” value");
            return;
        }

        setError("");
        console.log(`Applied engine power range: ${powerFrom}-${powerTo}`);
    };

    const handleClear = () => {
        setPowerFrom("");
        setPowerTo("");
        setError("");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "14px" }}>Engine power (from)</label>
                    <input
                        type="number"
                        value={powerFrom}
                        onChange={(e) => setPowerFrom(e.target.value)}
                        placeholder="e.g. 100"
                        style={{
                            padding: "5px 8px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            width: "150px",
                        }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "14px" }}>Engine power (to)</label>
                    <input
                        type="number"
                        value={powerTo}
                        onChange={(e) => setPowerTo(e.target.value)}
                        placeholder="e.g. 250"
                        style={{
                            padding: "5px 8px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            width: "150px",
                        }}
                    />
                </div>
            </div>
            {error && <p style={{ color: "red", marginTop: "5px", fontSize: "15px", display: "flex", justifyContent: "center" }}>{error}</p>}

            <div className='row-items-container'>
                <button className="usual-button" onClick={handleApply}>
                    Apply
                </button>
                <button className="usual-button" onClick={handleClear}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default VehicleEnginePowerRange;