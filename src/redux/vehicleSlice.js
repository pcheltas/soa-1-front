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

export const addVehicle = createAsyncThunk('addVehicle', async (vehicle, {rejectWithValue}) => {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        console.log(vehicle)
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
//
// export const updateFeedback = createAsyncThunk('updatefeedback', async ({token, feedback}, {rejectWithValue}) => {
//         const headers = {
//             'Content-Type': 'application/json; charset=utf-8',
//             'Authorization': 'Bearer ' + token
//         }
//         try {
//
//             const response = await axios.put(
//                 `${process.env.REACT_APP_API_URL}/feedbacks/${feedback.id}`,
//                 feedback,
//                 {headers}
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 'Не удалось обновить отзыв'
//             );
//         }
//     }
// );
//
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
    },
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
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
                state.page = action.payload.page || 1;
            })
            .addCase(fetchVehicle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data || 'Unexpected error during fetching vehicles';
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
            });
    },
});
export const {setPath} = vehicleSlice.actions;
export default vehicleSlice.reducer;