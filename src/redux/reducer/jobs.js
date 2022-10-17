import { createSlice } from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
    name: "jobsData",
    initialState: {
        jobsData: [],
        login: false,
    },
    reducers: {
        setJob(state, action) {
            const jobsd = action.payload;
            return { ...state, jobsData: jobsd, login: true }
        },
        removeJob(state, action) {
            return { ...state, jobsData: {}, login: false }
        }
    }
})

export const { setJob, removeJob } = jobsSlice.actions;

export default jobsSlice.reducer;