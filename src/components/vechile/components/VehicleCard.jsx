import React, {useState} from 'react';
import '../../../styles/vehicleCard.css'
import '../../../styles/common.css'
import {useDispatch, useSelector} from "react-redux";
import Dropdown from '../../common/Dropdown';
import {MdOutlineModeEdit, MdOutlineDelete} from "react-icons/md";
import {FaRegSave} from "react-icons/fa";
import {deleteVehicle, fetchVehicle} from "../../../redux/vehicleSlice";

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
                        onClick={() => {
                            setIsEditing(!isEditing)
                        }}>
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