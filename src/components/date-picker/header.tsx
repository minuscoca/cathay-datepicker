"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectCurrentMonth,
  selectType,
  toNextMonth,
  toPreviousMonth,
} from "@/redux/slices/date-picker-slice";
import moment from "moment";

export function Header() {
  const currentMonth = useAppSelector(selectCurrentMonth);
  const formatedMonth = moment(currentMonth).format("YYYY年M月");

  return (
    <div className="mb-[16px] flex h-[44px] w-full items-center justify-center">
      <MonthSelectButton type="prev" />
      <p className="flex-1 text-center">{formatedMonth}</p>
      <MonthSelectButton type="next" />
    </div>
  );
}

function MonthSelectButton({ type }: { type: "next" | "prev" }) {
  const datePickerType = useAppSelector(selectType);
  const dispatch = useAppDispatch();
  const Icon = type === "next" ? <ChevronRight /> : <ChevronLeft />;
  const handleClick = () => {
    if (type === "next") {
      dispatch(toNextMonth());
    } else {
      dispatch(toPreviousMonth());
    }
  };

  return (
    <button
      data-testid={`month-select-btn-${type}`}
      className="grid h-full w-[44px] place-items-center hover:bg-btn-hover hover:text-btn-hover disabled:cursor-not-allowed disabled:bg-btn-disabled disabled:text-btn-disabled"
      onClick={handleClick}
      disabled={datePickerType !== "cross"}
    >
      {Icon}
    </button>
  );
}
