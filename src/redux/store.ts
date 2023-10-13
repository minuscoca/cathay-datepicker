import { configureStore } from "@reduxjs/toolkit";
import { datePickerSlice } from "./slices/date-picker-slice";

export const store = configureStore({
  reducer: {
    datePicker: datePickerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
