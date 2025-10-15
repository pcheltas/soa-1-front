import React, { useState } from 'react';

const VehicleFiltration = ({ request, setRequest }) => {
    const fields = [
        "id",
        "name",
        "coordinates.x",
        "coordinates.y",
        "creationDate",
        "enginePower",
        "type",
        "fuelType"
    ];

    const operations = [
        { label: "lower", value: "<" },
        { label: "lower or equals", value: "<=" },
        { label: "greater", value: ">" },
        { label: "greater or equals", value: ">=" },
        { label: "not equals", value: "!=" },
        { label: "equals", value: "==" },
        { label: "contains", value: "~" }
    ];

    const [filterFields, setFilterFields] = useState(
        fields.reduce((acc, field) => {
            acc[field] = { op: "", value: "" };
            return acc;
        }, {})
    );

    const handleFieldChange = (field, key, value) => {
        setFilterFields(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [key]: value
            }
        }));
    };

    const handleApply = () => {
        const filterStr = Object.entries(filterFields)
            .filter(([_, val]) => val.op && val.value)
            .map(([field, val]) => `${field}${val.op}${val.value}`)
            .join(",");

        setRequest("filter", filterStr);
    };

    const handleClear = () => {
        const cleared = fields.reduce((acc, field) => {
            acc[field] = { op: "", value: "" };
            return acc;
        }, {});
        setFilterFields(cleared);
        setRequest("filter", "");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {fields.map(field => (
                <div key={field} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <div style={{ width: "150px" }}>{field}</div>
                    <select
                        value={filterFields[field].op}
                        onChange={e => handleFieldChange(field, "op", e.target.value)}
                    >
                        <option value="">Select operation</option>
                        {operations.map(op => {
                            if (op.value === "~" && !["name","type","fuelType"].includes(field)) return null;
                            return <option key={op.value} value={op.value}>{op.label}</option>
                        })}
                    </select>
                    <input
                        type="text"
                        value={filterFields[field].value}
                        onChange={e => handleFieldChange(field, "value", e.target.value)}
                        placeholder="value"
                    />
                </div>
            ))}

            <div className='row-items-container'>
                <button className="usual-button" onClick={handleApply}>Apply</button>
                <button className="usual-button" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default VehicleFiltration;
