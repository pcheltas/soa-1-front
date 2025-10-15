const Dropdown = ({value, setValue, valueName, data}) => {
    return (
        <div style={{justifySelf: "center"}}>
            <select
                id="dropdown"
                value={value}
                onChange={(e) => setValue(valueName, e.target.value)}
            >
                {data.map((opt) => (
                    <option key={opt} value={opt} style={{backgroundColor: "pink"}}>
                        {opt.toString().toLowerCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;