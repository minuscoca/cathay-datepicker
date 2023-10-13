"use client";

import { useState } from "react";
import moment from "moment";
import { Header } from "./header";
import { DateGrid } from "./dates";

export type SelectedRange = {
  startDate: moment.Moment | undefined;
  endDate: moment.Moment | undefined;
};

export function DatePicker() {
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
      <Header month={month} setMonth={setMonth} />
      <DateGrid
        month={month}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
}
