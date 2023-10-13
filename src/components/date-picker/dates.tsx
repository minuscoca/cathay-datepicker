import { cn } from "@/libs/utils";
import moment from "moment";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { type DatePickerType, type SelectedRange } from ".";

export function DateGrid({
  type,
  month,
  selectedRange,
  setSelectedRange,
}: {
  type: DatePickerType;
  month: moment.Moment;
  selectedRange: SelectedRange;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
}) {
  const dates = useMemo(() => {
    const currentMonthDates = getDates(month);
    const firstDayInWeeks = currentMonthDates[0].weekday();
    const lastDayInWeeks =
      currentMonthDates[currentMonthDates.length - 1].weekday();
    const prefixDays = 7 - (firstDayInWeeks + 1); // how many days need to be filled before this month
    const postfixDays = 7 - (lastDayInWeeks - 1); // how many days need to be filled after this month
    const prefixDates =
      prefixDays === 0
        ? []
        : getDates(month.clone().subtract(1, "month")).splice(-prefixDays);
    const postfixDates =
      postfixDays === 0
        ? []
        : getDates(month.clone().add(1, "month")).splice(0, postfixDays - 1);
    const result = [...prefixDates, ...currentMonthDates, ...postfixDates];
    return result;
  }, [month]);

  return (
    <div className="grid w-full grid-cols-7">
      {dates.map((date) => (
        <DateColumn
          key={date.format()}
          type={type}
          date={date}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      ))}
    </div>
  );
}

export function DateColumn({
  type,
  date,
  selectedRange,
  setSelectedRange,
}: {
  type: DatePickerType;
  date: moment.Moment;
  selectedRange: SelectedRange;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
}) {
  const { startDate, endDate } = selectedRange;
  const today = moment().startOf("day");
  const isToday = date.isSame(today, "day");
  const isCurrentMonth = date.isSame(today, "month");
  const isActive = isSelected(date, selectedRange);
  const isDisabled = type === "current" && !isCurrentMonth;

  const handleClick = () => {
    // 1. First click date to set it as start date value.
    if (!startDate && !endDate) {
      setSelectedRange({ startDate: date, endDate: undefined });
      return;
    }

    // 2. Next click date is same as current select option or later than current option will set it as end date value.
    if (!endDate) {
      // if selected date as end date value is earlier than start date value, reverse start date value and end date value.
      if (date.isBefore(startDate)) {
        setSelectedRange((prev) => ({
          startDate: date,
          endDate: prev.startDate,
        }));
      } else {
        setSelectedRange((prev) => ({ ...prev, endDate: date }));
      }
      return;
    }
    // 3. Next click date is earlier than current option will reset start date value.
    // ! if only reset the start date value as requested will cause bizarre user experiance.
    // ! normally, datepicker will set start date value by the selected date and also reset the end date value to undefind.
    setSelectedRange({ startDate: date, endDate: undefined });
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

function isSameDay(a: moment.Moment, b: moment.Moment) {
  return a.isSame(b, "day");
}

function isInRange(date: moment.Moment, selectedRange: SelectedRange) {
  const { startDate, endDate } = selectedRange;
  return date.isBetween(startDate, endDate, "date", "[]"); // '[]' indicates inclusion of a value
}

function isSelected(date: moment.Moment, selectedRange: SelectedRange) {
  const { startDate, endDate } = selectedRange;
  if (startDate && endDate) return isInRange(date, selectedRange);
  if (startDate) return isSameDay(date, startDate);
  return false;
}

function getDates(month: moment.Moment) {
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
