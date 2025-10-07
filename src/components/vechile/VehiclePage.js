import React, {useEffect, useState} from 'react';
import VehicleCard from "./components/VehicleCard";
import {useSelector} from "react-redux";
import Pagination from "../common/Pagination";
import Dropdown from "../common/Dropdown";
import DialogWindow from "../common/DialogWindow";
import VehicleFiltration from "./components/VehicleFiltration";
import VehicleWheelsRange from "./components/VehicleWheelsRange";
import VehicleEnginePowerRange from "./components/VehicleEnginePowerRange";

const VehiclePage = () => {
    const totalPages = useSelector(state => state.vehicles.totalPages)
    const currenPage = useSelector(state => state.vehicles.page)
    const vehicleList = useSelector(state => state.vehicles.vehicles)

    const [isFiltrationOpen, setIsFiltrationOpen] = useState(false);
    const [isWheelRangeOpen, setIsWheelRangeOpen] = useState(false);
    const [isEnginePowerOpen, setIsEnginePowerOpen] = useState(false);
    const [isMaxCoordOpen, setIsMaxCoordOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ field: "", direction: "" });


    const [request, setRequest] = useState(
        {
            page: 1,
            pageSize: 15,
            sort: "",
            filter: ""
        }
    )

    useEffect(() => {
        console.log(JSON.stringify(request))
    }, [request]);

    const handleSortClick = (field) => {
        setSortConfig(prev => {
            let newDirection;
            if (prev.field !== field) newDirection = "+";
            else if (prev.direction === "+") newDirection = "-";
            else newDirection = "";

            handleRequestChange("sort", newDirection ? `${newDirection}${field}` : "");

            return { field: newDirection ? field : "", direction: newDirection };
        });
    };

    const handleRequestChange = (field, value, parent) => {
        if (parent) {
            setRequest(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [field]: value,
                },
            }));
        } else {
            setRequest(prev => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handlePageChange = (newPage) => {
        handleRequestChange("page", newPage)
        console.log(newPage)
    }


    const SortableHeader = ({ label, field }) => {
        const isActive = sortConfig.field === field;

        return (
            <td onClick={() => handleSortClick(field)} >
                <div style={{ display: "flex", flexDirection: "row", fontSize: "25px", lineHeight: 1, justifySelf: "center", alignItems: "center" }}>
                    <p>{label}</p>
                    <span style={{ color: isActive && sortConfig.direction === "+" ? "black" : "white" }}>↑</span>
                    <span style={{ color: isActive && sortConfig.direction === "-" ? "black" : "white" }}>↓</span>
                </div>
            </td>
        );
    };

    return (
        <div className="page">
            <div style={{width: "90%", justifySelf: "center"}}>
                <div className='header'>
                    Vehicles
                </div>
                <div className='row-items-container bordered-container'>
                    <button className='usual-button' onClick={() => setIsMaxCoordOpen(!isMaxCoordOpen)}>
                        Max coordinates vehicle
                    </button>
                    <button className='usual-button' onClick={() => setIsWheelRangeOpen(!isWheelRangeOpen)}>
                        Vehicles with requested num of wheels
                    </button>
                    <DialogWindow
                        isOpen={isWheelRangeOpen}
                        onClose={() => setIsWheelRangeOpen(!isWheelRangeOpen)}
                        title={"Vehicles with requested num of wheels"}
                        children={<VehicleWheelsRange/>}
                    />
                    <button className='usual-button' onClick={() => setIsEnginePowerOpen(!isEnginePowerOpen)}>
                        Vehicles with requested engine power
                    </button>
                    <DialogWindow
                        isOpen={isEnginePowerOpen}
                        onClose={() => setIsEnginePowerOpen(!isEnginePowerOpen)}
                        title={"Vehicles with requested engine power"}
                        children={<VehicleEnginePowerRange/>}
                    />
                </div>
                <div>
                    <button className='usual-button' onClick={() => setIsFiltrationOpen(!isFiltrationOpen)}>Filtration
                    </button>
                    <DialogWindow
                        isOpen={isFiltrationOpen}
                        onClose={() => setIsFiltrationOpen(!isFiltrationOpen)}
                        title={"Filtration"}
                        children={<VehicleFiltration
                            request={request}
                            setRequest={handleRequestChange}
                        />}
                    />
                </div>
                <table>
                    <thead>
                    <tr>
                        <SortableHeader label="ID" field="id"/>
                        <SortableHeader label="Name" field="name"/>
                        <SortableHeader label="Coordinate X" field="coordinates.x"/>
                        <SortableHeader label="Coordinate Y" field="coordinates.y"/>
                        <SortableHeader label="Creation date" field="creationDate"/>
                        <SortableHeader label="Engine power" field="enginePower"/>
                        <SortableHeader label="Type" field="type"/>
                        <SortableHeader label="Fuel type" field="fuelType"/>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicleList.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle}/>
                    ))}
                    </tbody>
                </table>
                <div className="always-row-items-container">
                    <div style={{flex: 1}}></div>
                    <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currenPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        Show count:
                        <Dropdown
                            valueName="pageSize"
                            value={request.pageSize}
                            setValue={handleRequestChange}
                            data={[5, 10, 15, 20]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehiclePage;