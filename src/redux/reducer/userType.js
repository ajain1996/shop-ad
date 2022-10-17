import { createSlice } from '@reduxjs/toolkit';

export const userTypeSlice = createSlice({
    name: "userType",
    initialState: {
        userType: "",
    },
    reducers: {
        setUserType(state, action) {
            const userTypeD = action.payload;
            return { ...state, userType: userTypeD }
        },
        removeUserType(state, action) {
            return { ...state, userType: "" }
        }
    }
})

export const { setUserType, removeUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;