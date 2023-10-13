import { cn } from "@/libs/utils";
import moment from "moment";
import { useMemo } from "react";

export function DateGrid({ month }: { month: moment.Moment }) {
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
        <DateColumn key={date.format()} date={date} />
      ))}
    </div>
  );
}

export function DateColumn({ date }: { date: moment.Moment }) {
  const now = moment();
  const isToday = date.isSame(now, "day");
  const isCurrentMonth = date.isSame(now, "month");
  return (
    <button
      className={cn(
        "h-[36px] w-[50px] hover:bg-btn-hover hover:text-btn-hover disabled:bg-btn-disabled disabled:text-btn-disabled",
        {
          "bg-btn-today text-btn-today": isToday,
          "cursor-not-allowed bg-btn-disabled text-btn-disabled":
            !isCurrentMonth,
        },
      )}
      disabled={!isCurrentMonth}
    >
      {date.format("D日")}
    </button>
  );
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
