import React, {useState} from 'react';
import '../../../styles/vehicleCard.css'
import '../../../styles/common.css'
import {useDispatch, useSelector} from "react-redux";
import Dropdown from '../../common/Dropdown';
import {MdOutlineModeEdit, MdOutlineDelete} from "react-icons/md";
import {FaRegSave} from "react-icons/fa";
import {deleteVehicle, fetchVehicle, updateVehicle} from "../../../redux/vehicleSlice";
import {toast} from "react-toastify";

const VehicleCard = ({vehicle, fuelTypes, vehicleTypes}) => {
    const dispatch = useDispatch()
    const fetchPath = useSelector(state => state.vehicles.path)

    const [isEditing, setIsEditing] = useState(false);
    const [vehicleEdited, setVehicleEdited] = useState(vehicle);

    const handleChange = (field, value, parent) => {
        if (parent) {
            setVehicleEdited(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [field]: value,
                },
            }));
        } else {
            setVehicleEdited(prev => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleDelete = async () => {
        await dispatch(deleteVehicle(vehicle.id))
        await dispatch(fetchVehicle(fetchPath))
    }

    const validateVehicle = (v) => {
        if (!v.name || v.name.trim() === "") return "Name is required";
        if (!v.coordinates || isNaN(v.coordinates.x)  || !Number.isInteger(Number(v.coordinates.x))) return "Coordinate X must be an integer number";
        if (!v.coordinates || isNaN(v.coordinates.y) || !Number.isInteger(Number(v.coordinates.y))) return "Coordinate Y must be an integer number";
        if (isNaN(v.enginePower) || v.enginePower <= 0) return "Engine power must be positive";
        if (!v.type) return "Vehicle type is required";
        if (!v.fuelType) return "Fuel type is required";
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateVehicle(vehicleEdited);
        if (validationError) {
            toast.error(validationError)
            return;
        }

        await dispatch(updateVehicle({ id: vehicleEdited.id, vehicleEdited: vehicleEdited }));
        await dispatch(fetchVehicle(fetchPath));
        setIsEditing(false);
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td> {vehicleEdited.id} </td>
                    <td>
                    <input type='text' value={vehicleEdited.name}
                               onChange={e => handleChange('name', e.target.value)}/>
                    </td>
                    <td>
                        <input type="number" value={vehicleEdited.coordinates.x}
                               onChange={e => handleChange('x', e.target.value, 'coordinates')}/>
                    </td>
                    <td>
                        <input type="number" value={vehicleEdited.coordinates.y}
                               onChange={e => handleChange('y', e.target.value, 'coordinates')}/>
                    </td>
                    <td>
                        <input type="date" value={vehicleEdited.creationDate}
                               onChange={e => handleChange('creationDate', e.target.value)}/>
                    </td>
                    <td>
                        <input type="number" value={vehicleEdited.enginePower}
                               onChange={e => handleChange('enginePower', e.target.value)}/>
                    </td>
                    <td>
                        <Dropdown value={vehicleEdited.type} setValue={handleChange}
                                  valueName={"type"}
                                  data={vehicleTypes}/>
                    </td>
                    <td>
                        <Dropdown value={vehicleEdited.fuelType} setValue={handleChange}
                                  valueName={"fuelType"}
                                  data={fuelTypes}/>
                    </td>
                    <td>
                        <button className='usual-rounded-button' style={{display: "flex", justifySelf: "center"}}
                        onClick={handleSubmit}>
                            <FaRegSave size={20} style={{ flexShrink: 0 }}/>
                        </button>
                    </td>
                    <td>
                        <button className='delete-button' style={{display: "flex", justifySelf: "center"}}>
                            <MdOutlineDelete size={20} style={{ flexShrink: 0 }}/>
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td> {vehicleEdited.id} </td>
                    <td> {vehicleEdited.name} </td>
                    <td> {vehicleEdited.coordinates.x} </td>
                    <td> {vehicleEdited.coordinates.y} </td>
                    <td> {vehicleEdited.creationDate} </td>
                    <td> {vehicleEdited.enginePower} </td>
                    <td> {vehicleEdited.type.toLowerCase()} </td>
                    <td> {vehicleEdited.fuelType.toLowerCase()} </td>
                    <td>
                        <button className='usual-rounded-button' style={{display: "flex", justifySelf: "center"}}
                        onClick={() => setIsEditing(!isEditing)}>
                            <MdOutlineModeEdit size={20} style={{ flexShrink: 0 }}/>
                        </button>
                    </td>
                    <td>
                        <button className='delete-button' style={{display: "flex", justifySelf: "center"}} onClick={handleDelete}>
                            <MdOutlineDelete size={20} style={{ flexShrink: 0 }}/>
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default VehicleCard;