"use client";

import { cn } from "@/libs/utils";
import moment from "moment";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentMonth,
  selectSelectedRange,
  type SelectedRange,
  setRangeStart,
  setRange,
  setRangeEnd,
  selectType,
} from "@/redux/slices/date-picker-slice";

export function DateGrid() {
  const currentMonth = useAppSelector(selectCurrentMonth);

  const dates = useMemo(() => {
    const currentMonthDates = getDates(currentMonth);
    const firstDayInWeeks = currentMonthDates[0].weekday();
    const lastDayInWeeks =
      currentMonthDates[currentMonthDates.length - 1].weekday();
    const prefixDays = 7 - (firstDayInWeeks + 1); // how many days need to be filled before this month
    const postfixDays = 7 - (lastDayInWeeks - 1); // how many days need to be filled after this month
    const prefixDates =
      prefixDays === 0
        ? []
        : getDates(moment(currentMonth).subtract(1, "month").format()).splice(
            -prefixDays,
          );
    const postfixDates =
      postfixDays === 0
        ? []
        : getDates(moment(currentMonth).add(1, "month").format()).splice(
            0,
            postfixDays - 1,
          );
    const result = [...prefixDates, ...currentMonthDates, ...postfixDates];
    return result;
  }, [currentMonth]);

  return (
    <div className="grid w-full grid-cols-7">
      {dates.map((date) => (
        <DateColumn key={date.format()} date={date} />
      ))}
    </div>
  );
}

export function DateColumn({ date }: { date: moment.Moment }) {
  const dispatch = useAppDispatch();
  const datePickerType = useAppSelector(selectType);
  const selectedRange = useAppSelector(selectSelectedRange);
  const today = moment().startOf("day");
  const isToday = date.isSame(today, "day");
  const isCurrentMonth = date.isSame(today, "month");
  const isActive = isSelected(date, selectedRange);
  const isDisabled = datePickerType === "current" && !isCurrentMonth;

  const handleClick = () => {
    // 1. First click date to set it as start date value.
    if (!selectedRange.start && !selectedRange.end) {
      dispatch(setRangeStart(date.format()));
      return;
    }

    // 2. Next click date is same as current select option or later than current option will set it as end date value.
    if (selectedRange.start && !selectedRange.end) {
      // if selected date as end date value is earlier than start date value, reverse start date value and end date value.
      if (date.isBefore(selectedRange.start)) {
        dispatch(setRange({ start: date.format(), end: selectedRange.start }));
      } else {
        dispatch(setRangeEnd(date.format()));
      }
      return;
    }
    // 3. Next click date is earlier than current option will reset start date value.
    // ! if only reset the start date value as requested will cause bizarre user experiance.
    // ! normally, datepicker will set start date value by the selected date and also reset the end date value to undefind.
    dispatch(setRange({ start: date.format(), end: undefined }));
  };

  return (
    <button
      className={cn(
        "h-[36px] w-[50px] hover:bg-btn-hover hover:text-btn-hover disabled:bg-btn-disabled disabled:text-btn-disabled",
        {
          "bg-btn-disabled text-btn-disabled": !isCurrentMonth,
          "cursor-not-allowed": isDisabled,
          "bg-btn-active text-btn-active": isActive,
          "bg-btn-today text-btn-today": isToday,
        },
      )}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {date.format("D日")}
    </button>
  );
}

function isInRange(date: moment.Moment, selectedRange: SelectedRange) {
  return date.isBetween(selectedRange.start, selectedRange.end, "date", "[]"); // '[]' indicates inclusion of a value
}

function isSelected(date: moment.Moment, selectedRange: SelectedRange) {
  if (selectedRange.start && selectedRange.end)
    return isInRange(date, selectedRange);
  if (selectedRange.start) return date.isSame(selectedRange.start, "day");
  return false;
}

function getDates(date: string) {
  const month = moment(date);
  const daysInMonth = month.daysInMonth();
  const dates = [];
  for (let i = 0; i < daysInMonth; i++) {
    dates.push(
      month
        .clone()
        .date(i + 1)
        .startOf("day"),
    );
  }
  return dates;
}
