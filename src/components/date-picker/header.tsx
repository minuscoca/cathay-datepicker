import { type Dispatch, type SetStateAction } from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DatePickerType } from ".";

export function Header({
  type,
  month,
  setMonth,
}: {
  type: DatePickerType;
  month: moment.Moment;
  setMonth: Dispatch<SetStateAction<moment.Moment>>;
}) {
  const formatedMonth = month.format("YYYY年M月");

  return (
    <div className="mb-[16px] flex h-[44px] w-full items-center justify-center">
      <MonthSelectButton
        type="prev"
        setMonth={setMonth}
        disabled={type !== "cross"}
      />
      <p className="flex-1 text-center">{formatedMonth}</p>
      <MonthSelectButton
        type="next"
        setMonth={setMonth}
        disabled={type !== "cross"}
      />
    </div>
  );
}

function MonthSelectButton({
  type,
  setMonth,
  disabled,
}: {
  type: "next" | "prev";
  setMonth: Dispatch<SetStateAction<moment.Moment>>;
  disabled: boolean;
}) {
  const handleClick = () => {
    if (type === "next") {
      setMonth((prev) => prev.clone().add(1, "month"));
    } else {
      setMonth((prev) => prev.clone().subtract(1, "month"));
    }
  };

  const Icon = type === "next" ? <ChevronRight /> : <ChevronLeft />;

  return (
    <button
      className="grid h-full w-[44px] place-items-center hover:bg-btn-hover hover:text-btn-hover disabled:cursor-not-allowed disabled:bg-btn-disabled disabled:text-btn-disabled"
      onClick={handleClick}
      disabled={disabled}
    >
      {Icon}
    </button>
  );
}
