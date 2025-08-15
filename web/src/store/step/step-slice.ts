import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  step: number;
}

const initialState: StepState = {
  step: 1,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    resetStep: (state) => {
      state.step = 1;
    },
  },
});

export const { setStep, nextStep, prevStep, resetStep } = stepSlice.actions;

export default stepSlice.reducer;

