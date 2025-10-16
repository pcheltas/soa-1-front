import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVehicle = createAsyncThunk('fetchVehicle', async (path, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.get(
                `/api1/vehicles?${path}`,
                {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAverageEnginePower = createAsyncThunk('fetchAverageEnginePower', async (_, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.get(
                `/api1/vehicles/engine-powers/average`,
                {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchVehicleWheels = createAsyncThunk('fetchVehicleWheels', async ({from, to}, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.get(
                `/api2/by-number-of-wheels/${from}/${to}`,
                {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchVehicleEngine = createAsyncThunk('fetchVehicleEngine', async ({from, to}, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.get(
                `/api2/by-engine-power/${from}/${to}`,
                {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMaxCoordVehicle = createAsyncThunk('fetchMaxCoordVehicle', async ( _, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.get(
                `/api1/vehicles/coordinates/max`,
                {headers});
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addVehicle = createAsyncThunk('addVehicle', async (vehicle, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.post(
                '/api1/vehicles',
                vehicle,
                {headers}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateVehicle = createAsyncThunk('updateVehicle', async ({id, vehicleEdited}, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        const {id: _, ...payload} = vehicleEdited;
        try {
            const response = await axios.put(
                `/api1/vehicles/${id}`,
                vehicleEdited,
                {headers}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteVehicle = createAsyncThunk('deleteFeedback', async (id, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        try {
            const response = await axios.delete(
                `/api1/vehicles/${id}`,
                {headers}
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [],
        totalPages: 0,
        page: 1,
        path: "",
        loading: false,
        error: null,
        commonData: true,
        averagePower: ""
    },
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
        },
        deleteAveragePower: (state, action) => {
            state.averagePower = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.vehicles = action.payload.vehicles || [];
                state.totalPages = action.payload.totalPages || 1;
                state.page = action.payload.page || 0;
                state.commonData = true;
            })
            .addCase(fetchVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching vehicles';
            })
            .addCase(fetchAverageEnginePower.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAverageEnginePower.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.averagePower = action.payload.average
            })
            .addCase(fetchAverageEnginePower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching average engine power';
            })
            .addCase(fetchVehicleWheels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicleWheels.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.vehicles = action.payload.vehicles || [];
                state.commonData = false;
            })
            .addCase(fetchVehicleWheels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching vehicles with specified num of wheels';
            })
            .addCase(fetchVehicleEngine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicleEngine.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.vehicles = action.payload.vehicles || [];
                state.commonData = false;
            })
            .addCase(fetchVehicleEngine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching vehicles with specified engine power';
            })
            .addCase(fetchMaxCoordVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMaxCoordVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.vehicles = action.payload ? [action.payload] : [];
                state.commonData = false;
            })
            .addCase(fetchMaxCoordVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching max coordinates vehicle';
            })
            .addCase(addVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during vehicle creation';
            })
            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during vehicle update';
            })
            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during deleting vehicle';
            });
    },
});
export const {setPath, deleteAveragePower} = vehicleSlice.actions;
export default vehicleSlice.reducer;