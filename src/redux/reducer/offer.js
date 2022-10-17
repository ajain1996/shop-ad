import { createSlice } from '@reduxjs/toolkit';

export const offerSlice = createSlice({
    name: "offerData",
    initialState: {
        offerData: [],
        login: false,
    },
    reducers: {
        setOffer(state, action) {
            const offerd = action.payload;
            return { ...state, offerData: offerd, login: true }
        },
        removeOffer(state, action) {
            return { ...state, offerData: {}, login: false }
        }
    }
})

export const { setOffer, removeOffer } = offerSlice.actions;

export default offerSlice.reducer;