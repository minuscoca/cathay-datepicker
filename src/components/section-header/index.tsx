"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  DatePickerType,
  resetRange,
  selectType,
  setType,
} from "@/redux/slices/date-picker-slice";

export function SectionHeader() {
  const dispatch = useAppDispatch();
  const datePickerType = useAppSelector(selectType);
  const data =
    datePickerType === "current"
      ? ({
        title: "Task – 1",
        subtitle: "(Date Range Component for current month)",
      } as const)
      : ({
        title: "Task – 2",
        subtitle: "(Date Range Component for cross months)",
      } as const);

  return (
    <div>
      <select
        id="task-select"
        data-testid="task-select"
        name="task-select"
        onChange={(e) => {
          const type = e.target.value as DatePickerType;
          dispatch(setType(type));
          dispatch(resetRange())
        }}
      >
        <option id="task-option-task-1" value="current">
          Task 1
        </option>
        <option id="task-option-task-2" value="cross">
          Task 2
        </option>
      </select>
      <h1 className="text-center text-xl">{data.title}</h1>
      <h2 className="text-center">{data.subtitle}</h2>
    </div>
  );
}
