"use client";

import { useState } from "react";
import moment from "moment";
import { Header } from "./header";

export function DatePicker() {
  const initMonth = moment(moment().format("YYYY-MM"));
  const [month, setMonth] = useState(initMonth);
  const [dates, setDates] = useState([]);

  // TODO: Fix fontSize to 16px?
  // TODO: redux to stop prop drilling?

  return (
    <div className="h-[240px] w-[350px] text-base">
      <Header month={month} setMonth={setMonth} />
    </div>
  );
}
