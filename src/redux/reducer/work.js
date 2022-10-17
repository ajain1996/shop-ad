import { createSlice } from '@reduxjs/toolkit';

export const workSlice = createSlice({
    name: "workData",
    initialState: {
        workData: [],
        login: false,
    },
    reducers: {
        setWork(state, action) {
            const workd = action.payload;
            return { ...state, workData: workd, login: true }
        },
        removeWork(state, action) {
            return { ...state, workData: {}, login: false }
        }
    }
})

export const { setWork, removeWork } = workSlice.actions;

export default workSlice.reducer;