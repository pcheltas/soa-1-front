import React, {useState} from 'react';
import Dropdown from "../../common/Dropdown";

const VehicleWheelsRange = () => {
    const [wheelsFrom, setWheelsFrom] = useState("");
    const [wheelsTo, setWheelsTo] = useState("");
    const [error, setError] = useState("");

    const wheelsOptions = Array.from({ length: 4 }, (_, i) => i + 1);

    const handleApply = () => {
        if (wheelsFrom === "" || wheelsTo === "") {
            setError("Both fields must be selected");
            return;
        }

        if (Number(wheelsFrom) > Number(wheelsTo)) {
            setError("“To” value should be greater than “From” value");
            return;
        }

        setError("");
        console.log(`Applied wheels range: ${wheelsFrom} - ${wheelsTo}`);
    };

    const handleClear = () => {
        setWheelsFrom("");
        setWheelsTo("");
        console.log(wheelsFrom, wheelsTo);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "20px" }}>Wheels from</label>
                    <Dropdown
                        valueName="wheelsFrom"
                        value={wheelsFrom}
                        setValue={(_, v) => setWheelsFrom(v)}
                        data={["", ...wheelsOptions]}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "20px" }}>Wheels to</label>
                    <Dropdown
                        valueName="wheelsTo"
                        value={wheelsTo}
                        setValue={(_, v) => setWheelsTo(v)}
                        data={["", ...wheelsOptions]}
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

export default VehicleWheelsRange;