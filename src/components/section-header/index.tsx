"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectType } from "@/redux/slices/date-picker-slice";

export function SectionHeader() {
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
      <h1 className="text-center text-xl">{data.title}</h1>
      <h2 className="text-center">{data.subtitle}</h2>
    </div>
  );
}
