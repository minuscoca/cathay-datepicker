import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type RootState } from "@/redux/store";
import moment from "moment";

export type DatePickerType = "current" | "cross";

export type SelectedRange = {
  start: string | undefined;
  end: string | undefined;
};

export type DatePickerState = {
  type: DatePickerType;
  currentMonth: string;
  selectedRange: SelectedRange;
};

const initialRange = {
  start: undefined,
  end: undefined,
};

const initialState: DatePickerState = {
  type: "current",
  currentMonth: moment().startOf("month").format(),
  selectedRange: initialRange,
};

export const datePickerSlice = createSlice({
  name: "date-picker",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<DatePickerType>) => {
      state.type = action.payload;
    },
    toNextMonth: (state) => {
      state.currentMonth = moment(state.currentMonth).add(1, "month").format();
    },
    toPreviousMonth: (state) => {
      state.currentMonth = moment(state.currentMonth)
        .subtract(1, "month")
        .format();
    },
    setRangeStart: (state, action: PayloadAction<string | undefined>) => {
      state.selectedRange.start = action.payload;
    },
    setRangeEnd: (state, action: PayloadAction<string | undefined>) => {
      state.selectedRange.end = action.payload;
    },
    setRange: (
      state,
      action: PayloadAction<{
        start: string | undefined;
        end: string | undefined;
      }>,
    ) => {
      state.selectedRange.start = action.payload.start;
      state.selectedRange.end = action.payload.end;
    },
    resetRange: (state) => {
      state.selectedRange = initialRange;
    },
  },
});

export const {
  setType,
  toNextMonth,
  toPreviousMonth,
  setRangeStart,
  setRange,
  setRangeEnd,
  resetRange,
} = datePickerSlice.actions;
export const selectType = (state: RootState) => state.datePicker.type;
export const selectCurrentMonth = (state: RootState) =>
  state.datePicker.currentMonth;
export const selectSelectedRange = (state: RootState) =>
  state.datePicker.selectedRange;
