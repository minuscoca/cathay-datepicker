import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import moment from "moment";
import { Provider as ReduxProvider } from "react-redux";

import { DatePicker } from "./index";
import { store } from "@/redux/store";
import { SectionHeader } from "../section-header";

describe("DatePicker type=current", () => {
  test("render header 1-C", () => {
    render(
      <ReduxProvider store={store}>
        <DatePicker />
      </ReduxProvider>,
    );
    // Task - 1 - C
    // to have month text
    const monthText = moment().format("YYYY年M月");
    expect(screen.getByText(monthText)).toBeInTheDocument();
  });

  test("render month-select 1-D", () => {
    render(
      <ReduxProvider store={store}>
        <DatePicker />
      </ReduxProvider>,
    );
    const prevButton = screen.getByTestId("month-select-btn-prev");
    const nextButton = screen.getByTestId("month-select-btn-next");
    // Task - 1 - D
    // disable prevButton and nextButton
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test("render day buttons", () => {
    render(
      <ReduxProvider store={store}>
        <DatePicker />
      </ReduxProvider>,
    );
    const days = moment().daysInMonth();
    const firstDay = moment().startOf("month").day();
    const lastDay = moment().endOf("month").day();
    const prevMonthDays = firstDay === 0 ? 6 : 7 - firstDay;
    const nextMonthDays = lastDay === 0 ? 6 : 7 - lastDay;
    const dayButtons = screen.getAllByRole("button", { name: /\d日/ });
    expect(dayButtons).toHaveLength(days + prevMonthDays + nextMonthDays);
    expect(
      dayButtons.filter((button) => button.getAttribute("disabled") != null),
    ).toHaveLength(prevMonthDays + nextMonthDays);
    const todayText = moment().format("D日");
    const todayButton = screen.getByText(todayText);
    expect(todayButton).toBeInTheDocument();
    expect(todayButton).toHaveClass("bg-btn-today text-btn-today");
  });
});

describe("DatePicker select days A1~A2", () => {
  test("select days", () => {
    render(
      <ReduxProvider store={store}>
        <DatePicker />
      </ReduxProvider>,
    );

    const day10Button = screen.getByRole("button", { name: "10日" });
    const day11Button = screen.getByRole("button", { name: "11日" });
    const day12Button = screen.getByRole("button", { name: "12日" });
    const day13Button = screen.getByRole("button", { name: "13日" });

    // 選擇 11 ~ 13 日
    expect(store.getState().datePicker.selectedRange).toEqual({
      start: undefined,
      end: undefined,
    });

    // Task - 1 - A.1
    // 選擇開始日
    fireEvent.click(day11Button);
    expect(store.getState().datePicker.selectedRange).toEqual({
      start: moment().set("date", 11).startOf("day").format(),
      end: undefined,
    });

    // Task - 1 - A.2 選後面的日期
    // 選擇結束日期
    fireEvent.click(day13Button);
    expect(store.getState().datePicker.selectedRange).toEqual({
      start: moment().set("date", 11).startOf("day").format(),
      end: moment().set("date", 13).startOf("day").format(),
    });

    expect(day10Button).not.toHaveClass("bg-btn-active text-btn-active");
    expect(day11Button).toHaveClass("bg-btn-active text-btn-active");
    expect(day12Button).toHaveClass("bg-btn-active text-btn-active");
    expect(day13Button).toHaveClass("bg-btn-active text-btn-active");

    // Task - 1 - A.3
    // 選擇前面的日期會 reset 並設為 start date 重新開始
    fireEvent.click(day10Button);
    expect(store.getState().datePicker.selectedRange).toEqual({
      start: moment().set("date", 10).startOf("day").format(),
      end: undefined,
    });
    // Task - 1 - A.2 選同一天
    fireEvent.click(day10Button);
    expect(store.getState().datePicker.selectedRange).toEqual({
      start: moment().set("date", 10).startOf("day").format(),
      end: moment().set("date", 10).startOf("day").format(),
    });

    expect(day10Button).toHaveClass("bg-btn-active text-btn-active");
    expect(day11Button).not.toHaveClass("bg-btn-active text-btn-active");
    expect(day12Button).not.toHaveClass("bg-btn-active text-btn-active");
    expect(day13Button).not.toHaveClass("bg-btn-active text-btn-active");
  });
});

describe("DatePicker type=cross", () => {
  test("render header", () => {
    const { debug } = render(
      <ReduxProvider store={store}>
        <SectionHeader />
        <DatePicker />
      </ReduxProvider>,
    );

    const taskSelect = screen.getByTestId("task-select");
    expect(taskSelect).toHaveValue("current");
    fireEvent.change(taskSelect, { target: { value: "cross" } });
    expect(taskSelect).toHaveValue("cross");
    expect(store.getState().datePicker.type).toBe("cross");

    const prevButton = screen.getByTestId("month-select-btn-prev");
    const nextButton = screen.getByTestId("month-select-btn-next");

    debug(prevButton);

    // Task - 2 - B
    // to have month text
    const monthText = moment().format("YYYY年M月");
    expect(screen.getByText(monthText)).toBeInTheDocument();

    // Task 2 - C
    // enable prevButton and nextButton
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();

    // Task 2 - A
    // can go next month
    fireEvent.click(nextButton);
    const nextMonthText = moment().add(1, "month").format("YYYY年M月");
    expect(screen.getByText(nextMonthText)).toBeInTheDocument();

    // can go prev month
    fireEvent.click(prevButton);
    expect(screen.getByText(monthText)).toBeInTheDocument();
  });
});
