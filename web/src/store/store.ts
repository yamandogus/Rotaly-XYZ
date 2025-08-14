import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './search/search-slice'
import reservationStepReducer from './reservation/reservation-slice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    step: reservationStepReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;