import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  pageTitle: string;
  userRole: string;
  hotelName: string;
}

const initialState: DashboardState = {
  pageTitle: "",
  userRole: "",
  hotelName: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPageTitle: (state, acition: PayloadAction<string>) => {
      state.pageTitle = acition.payload;
    },
    setUserRole: (state, acition: PayloadAction<string>) => {
      state.userRole = acition.payload;
    },
    setHotelName: (state, action: PayloadAction<string>) => {
      state.hotelName = action.payload;
    },
    clearPageTitle: (state)=>{
        state.pageTitle = ""
    }
  },
});

export const {setHotelName, setPageTitle, setUserRole, clearPageTitle} = dashboardSlice.actions
export default dashboardSlice.reducer
