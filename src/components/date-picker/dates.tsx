import { cn } from "@/libs/utils";
import moment from "moment";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { type SelectedRange } from ".";

export function DateGrid({
  month,
  selectedRange,
  setSelectedRange,
}: {
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
          date={date}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      ))}
    </div>
  );
}

export function DateColumn({
  date,
  selectedRange,
  setSelectedRange,
}: {
  date: moment.Moment;
  selectedRange: SelectedRange;
  setSelectedRange: Dispatch<SetStateAction<SelectedRange>>;
}) {
  const { startDate, endDate } = selectedRange;
  const today = moment().startOf("day");
  const isToday = date.isSame(today, "day");
  const isCurrentMonth = date.isSame(today, "month");
  const isActive = isSelected(date, selectedRange);

  const handleClick = () => {
    if (startDate === undefined) {
      setSelectedRange((prev) => ({ ...prev, startDate: date }));
      return;
    }

    if (endDate === undefined) {
      setSelectedRange((prev) => ({ ...prev, endDate: date }));
      return;
    }

    if (
      isInRange(date, selectedRange) || // date is between startDate and endDate
      date.isAfter(endDate) // date is after endDate
    ) {
      // should update endDate to date
      setSelectedRange((prev) => ({ ...prev, endDate: date }));
    }

    if (date.isBefore(startDate)) {
      // date is before startDate
      // should update startDate to date
      setSelectedRange((prev) => ({ ...prev, startDate: undefined }));
    }
  };

  return (
    <button
      className={cn(
        "h-[36px] w-[50px] hover:bg-btn-hover hover:text-btn-hover disabled:bg-btn-disabled disabled:text-btn-disabled",
        {
          "bg-btn-active text-btn-active": isActive,
          "bg-btn-today text-btn-today": isToday,
          "cursor-not-allowed bg-btn-disabled text-btn-disabled":
            !isCurrentMonth,
        },
      )}
      disabled={!isCurrentMonth}
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
  if (endDate) return isSameDay(date, endDate);
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
