import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservasitonCurrentStep } from "./reservation-types";

const initialState: ReservasitonCurrentStep = {
  step: 1,
};

const reservationStepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStepIncrease: (state, action: PayloadAction<number>) => {
      state.step = action.payload; // Direkt step değerini set et
    },
    setStepDecrement: (state, action: PayloadAction<number>) => {
     state.step = action.payload; // Direkt step değerini set et
    },
    setStepReset: (state) => {
      state.step = 1;
    },
  },
});

export const {setStepDecrement,setStepIncrease,setStepReset} = reservationStepSlice.actions;

export default reservationStepSlice.reducer;