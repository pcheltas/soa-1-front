import React, {useState} from 'react';
import Dropdown from "../../common/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {addVehicle, fetchVehicle} from "../../../redux/vehicleSlice";

const VehicleCreation = ({vehicleTypes, fuelTypes, setIsCreationOpen, isCreationOpen}) => {
    const dispatch = useDispatch();
    const fetchPath = useSelector(state => state.vehicles.path)
    const [vehicleData, setVehicleData] = useState({
        "name": "",
        "coordinates": {
            "x": "",
            "y": ""
        },
        "creationDate": "",
        "enginePower": "",
        "type": vehicleTypes[0],
        "fuelType": fuelTypes[0]
    },);
    const [error, setError] = useState("");

    const handleChange = (field, value, parent) => {
        if (parent) {
            setVehicleData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [field]: value,
                },
            }));
        } else {
            setVehicleData(prev => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const validateForm = () => {
        if (!vehicleData.name || vehicleData.name.trim() === "") {
            setError("Name is required")
            return false;
        }
        if (vehicleData.coordinates.x === "" || isNaN(Number(vehicleData.coordinates.x))) {
            setError("Coordinate X must be a number")
            return false;
        }
        if (vehicleData.coordinates.y === "" || isNaN(Number(vehicleData.coordinates.y))) {
            setError("Coordinate Y must be a number")
            return false;
        }
        if (!vehicleData.creationDate) {
            setError("Creation date is required")
            return false;
        }
        if (vehicleData.enginePower === "" || isNaN(Number(vehicleData.enginePower))) {
            setError("Engine power must be a number")
            return false;
        }
        if (!vehicleData.type) {
            setError("Type is required")
            return false;
        }
        if (!vehicleData.fuelType) {
            setError("Fuel type is required")
            return false;
        }
        setError("")
        return true;
    }
    const handleSubmit = async () => {
        if (!validateForm()) return;

        const resultAction = await dispatch(addVehicle(vehicleData));

        if (addVehicle.fulfilled.match(resultAction)) {
            setVehicleData({
                name: "",
                coordinates: {x: "", y: ""},
                creationDate: "",
                enginePower: "",
                type: vehicleTypes[0],
                fuelType: fuelTypes[0]
            });
            setError("");
            setIsCreationOpen(!isCreationOpen);
            await dispatch(fetchVehicle(fetchPath))
        }
    }
    
    return (
        <div className="column-items-container" style={{width: "80%"}}>
            <div className="row-items-container">
                <h3>Name</h3>
                <input type='text' maxLength={255} value={vehicleData.name}
                       onChange={e => handleChange('name', e.target.value)}/>
            </div>
            <div className="row-items-container">
                <h3>Coordinate X</h3>
                <input type="number" value={vehicleData.coordinates.x}
                       onChange={e => handleChange('x', e.target.value, 'coordinates')}/>
            </div>
            <div className="row-items-container">
                <h3>Coordinate Y</h3>
                <input type="number" value={vehicleData.coordinates.y}
                       onChange={e => handleChange('y', e.target.value, 'coordinates')}/>
            </div>
            <div className="row-items-container">
                <h3>Creation date</h3>
                <input type="date" value={vehicleData.creationDate}
                       onChange={e => handleChange('creationDate', e.target.value)}/>
            </div>
            <div className="row-items-container">
                <h3>Engine power</h3>
                <input type="number" value={vehicleData.enginePower}
                       onChange={e => handleChange('enginePower', e.target.value)}/>
            </div>
            <div className="row-items-container">
                <h3>Type</h3>
                <Dropdown value={vehicleData.type} setValue={handleChange}
                          valueName={"type"}
                          data={vehicleTypes}/>
            </div>
            <div className="row-items-container">
                <h3>Fuel type</h3>
                <Dropdown value={vehicleData.fuelType} setValue={handleChange}
                          valueName={"fuelType"}
                          data={fuelTypes}/>
            </div>
            {error.trim() !== "" ? <div style={{display: "flex", justifyContent: "center", color: "red"}}>{error}</div> : null}
            <button className="usual-button" onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default VehicleCreation;