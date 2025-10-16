import React, {useEffect, useState} from 'react';
import VehicleCard from "./components/VehicleCard";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../common/Pagination";
import Dropdown from "../common/Dropdown";
import DialogWindow from "../common/DialogWindow";
import VehicleFiltration from "./components/VehicleFiltration";
import VehicleWheelsRange from "./components/VehicleWheelsRange";
import VehicleEnginePowerRange from "./components/VehicleEnginePowerRange";
import VehicleCreation from "./components/VehicleCreation";
import {
    deleteAveragePower,
    fetchAverageEnginePower,
    fetchMaxCoordVehicle,
    fetchVehicle,
    setPath
} from "../../redux/vehicleSlice";

const VehiclePage = () => {
    const dispatch = useDispatch()

    const totalPages = useSelector(state => state.vehicles.totalPages)
    const commonData = useSelector(state => state.vehicles.commonData)
    const currentPage = useSelector(state => state.vehicles.page)
    const vehicleList = useSelector(state => state.vehicles.vehicles)
    const fuelTypes = useSelector(state => state.fuelTypes.fuelTypes)
    const vehicleTypes = useSelector(state => state.vehicleTypes.vehicleTypes)
    const averageEnginePower = useSelector(state => state.vehicles.averagePower)

    const [isFiltrationOpen, setIsFiltrationOpen] = useState(false);
    const [isWheelRangeOpen, setIsWheelRangeOpen] = useState(false);
    const [isEnginePowerOpen, setIsEnginePowerOpen] = useState(false);
    const [isMaxCoordOpen, setIsMaxCoordOpen] = useState(false);
    const [isCreationOpen, setIsCreationOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({field: "", direction: ""});

    const [request, setRequest] = useState(
        {
            page: 0,
            pageSize: 15,
            sort: "",
            filter: ""
        }
    )

    const convertRequestToURLString = () => {
        return new URLSearchParams(
            Object.fromEntries(
                Object.entries(request).filter(([_, v]) => v !== "")
            )
        ).toString();
    }

    useEffect(() => {
        const params = convertRequestToURLString();
        const fetchData = async () => {
            await dispatch(setPath(params));
            await dispatch(fetchVehicle(params));
        };
        fetchData();
    }, [dispatch, request]);

    const handleSortClick = (field) => {
        setSortConfig(prev => {
            let newDirection;
            if (prev.field !== field) newDirection = "+";
            else if (prev.direction === "+") newDirection = "-";
            else newDirection = "";

            handleRequestChange("sort", newDirection ? `${newDirection}${field}` : "");

            return {field: newDirection ? field : "", direction: newDirection};
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
            setRequest(prev => {
                const newState = {
                    ...prev,
                    [field]: value,
                };
                if (field === "pageSize") {
                    newState.page = 0;
                }
                return newState;
            });
        }
    };

    const handlePageChange = (newPage) => {
        handleRequestChange("page", newPage)
    }


    const SortableHeader = ({label, field}) => {
        const isActive = sortConfig.field === field;

        return (
            <td onClick={commonData ? () => handleSortClick(field) : undefined}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "25px",
                        lineHeight: 1,
                        justifySelf: "center",
                        alignItems: "center",
                        cursor: commonData ? "pointer" : "default"
                    }}
                >
                    <p>{label}</p>
                    {commonData && (
                        <>
                        <span
                            style={{
                                color: isActive && sortConfig.direction === "+" ? "black" : "white"
                            }}
                        >
                            ↑
                        </span>
                            <span
                                style={{
                                    color: isActive && sortConfig.direction === "-" ? "black" : "white"
                                }}
                            >
                            ↓
                        </span>
                        </>
                    )}
                </div>
            </td>
        );
    };

    return (
        <div className="page">
            <div style={{width: "90%", justifySelf: "center"}}>
                <div>
                    <div className='header'>
                        Vehicles
                    </div>
                    <button className='usual-button'
                            style={{display: "flex", justifySelf: "flex-end"}}
                            onClick={() => setIsCreationOpen(!isCreationOpen)}>
                        Create vehicle
                    </button>
                    <DialogWindow
                        isOpen={isCreationOpen}
                        onClose={() => setIsCreationOpen(!isCreationOpen)}
                        title={"Vehicle creation"}
                        children={<VehicleCreation vehicleTypes={vehicleTypes} fuelTypes={fuelTypes}
                                                   setIsCreationOpen={setIsCreationOpen}
                                                   isCreationOpen={isCreationOpen}/>}
                    />
                </div>
                <div className='column-items-container bordered-container'>
                    <div className='row-items-container'>
                        <button className='usual-button' onClick={() => dispatch(fetchMaxCoordVehicle())}>
                            Max coordinates vehicle
                        </button>
                        <button className='usual-button' onClick={() => setIsWheelRangeOpen(!isWheelRangeOpen)}>
                            Vehicles with requested num of wheels
                        </button>
                        <DialogWindow
                            isOpen={isWheelRangeOpen}
                            onClose={() => setIsWheelRangeOpen(!isWheelRangeOpen)}
                            title={"Vehicles with requested num of wheels"}
                            children={<VehicleWheelsRange onClose={() => setIsWheelRangeOpen(!isWheelRangeOpen)}/>}
                        />
                        <button className='usual-button' onClick={() => setIsEnginePowerOpen(!isEnginePowerOpen)}>
                            Vehicles with requested engine power
                        </button>
                        <DialogWindow
                            isOpen={isEnginePowerOpen}
                            onClose={() => setIsEnginePowerOpen(!isEnginePowerOpen)}
                            title={"Vehicles with requested engine power"}
                            children={<VehicleEnginePowerRange onClose={() => setIsEnginePowerOpen(!isEnginePowerOpen)}/>}
                        />
                        <div className='column-items-container'>
                            <button className='usual-button' onClick={() => dispatch(fetchAverageEnginePower())}>
                                Average engine power
                            </button>
                            {!isNaN(Number(averageEnginePower)) && averageEnginePower !== "" ?
                                <div>Average engine power of all vehicles: {averageEnginePower}</div>
                                : null
                            }

                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        <button className='usual-button'
                                style={{backgroundColor: "rgb(126 108 143)", width: "fit-content"}}
                                onClick={() => {
                                    dispatch(fetchVehicle(convertRequestToURLString()))
                                    dispatch(deleteAveragePower())
                        }}>
                            Clear specific search
                        </button>
                    </div>
                </div>
                {commonData ?
                    <div>
                        <button className='usual-button'
                                onClick={() => setIsFiltrationOpen(!isFiltrationOpen)}>Filtration
                        </button>
                        <DialogWindow
                            isOpen={isFiltrationOpen}
                            onClose={() => setIsFiltrationOpen(!isFiltrationOpen)}
                            title={"Filtration"}
                            children={<VehicleFiltration
                                request={request}
                                setRequest={handleRequestChange}
                                vehicleType={vehicleTypes}
                                fuelType={fuelTypes}
                            />}
                        />
                    </div>
                    : null
                }

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
                        <VehicleCard key={vehicle.id} vehicle={vehicle} vehicleTypes={vehicleTypes}
                                     fuelTypes={fuelTypes}/>
                    ))}
                    </tbody>
                </table>
                {commonData ?
                    <div className="always-row-items-container">
                        <div style={{flex: 1}}></div>
                        <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
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
                    : null
                }

            </div>
        </div>
    );
};

export default VehiclePage;