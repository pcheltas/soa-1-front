import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = 'http://localhost:8080/api/v1';

// export const fetchFeedbacks = createAsyncThunk('fetchFeedbacks', async () => {
//     const response = await axios.get(`${process.env.REACT_APP_API_URL}/feedbacks`);
//     if (response.status !== 200) {
//         throw new Error('Не удалось получить отзывы');
//     }
//     return response.data;
// });
//
// export const addFeedback = createAsyncThunk('addFeedback', async ({token, feedback}, {rejectWithValue}) => {
//         const headers = {
//             'Content-Type': 'application/json; charset=utf-8',
//             'Authorization': 'Bearer ' + token
//         }
//         try {
//             const response = await axios.post(
//                 `${process.env.REACT_APP_API_URL}/feedbacks`,
//                 feedback,
//                 {headers}
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 'Не удалось создать отзыв'
//             );
//         }
//     }
// );
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
// export const deleteFeedback = createAsyncThunk('deleteFeedback', async ({token, feedbackId}, {rejectWithValue}) => {
//         const headers = {
//             'Content-Type': 'application/json; charset=utf-8',
//             'Authorization': 'Bearer ' + token
//         }
//         try {
//
//             const response = await axios.delete(
//                 `${process.env.REACT_APP_API_URL}/feedbacks/${feedbackId}`,
//                 {headers}
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 'Не удалось удалить отзыв'
//             );
//         }
//     }
// );

const fuelTypeSlice = createSlice({
    name: 'fuelTypes',
    initialState: {
        fuelTypes: ["GASOLINE", "KEROSENE", "MANPOWER", "NUCLEAR", "PLASMA"],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(fetchFeedbacks.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.feedbacks = action.payload;
        // })
        // .addCase(fetchFeedbacks.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        // })
    },
});
export default fuelTypeSlice.reducer;