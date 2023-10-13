"use client";

import { useState } from "react";
import moment from "moment";
import { Header } from "./header";
import { DateGrid } from "./dates";

export type DatePickerType = "current" | "cross";
export type SelectedRange = {
  startDate: moment.Moment | undefined;
  endDate: moment.Moment | undefined;
};

export function DatePicker({ type }: { type: DatePickerType }) {
  const initMonth = moment(moment().format("YYYY-MM"));
  const [month, setMonth] = useState<moment.Moment>(initMonth);
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    startDate: undefined,
    endDate: undefined,
  });

  console.log("selectedRange", {
    startDate: selectedRange.startDate?.format(),
    endDate: selectedRange.endDate?.format(),
  });

  // TODO: redux to stop prop drilling?

  return (
    <div className="h-[240px] w-[350px]">
      <Header type={type} month={month} setMonth={setMonth} />
      <DateGrid
        type={type}
        month={month}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
}
