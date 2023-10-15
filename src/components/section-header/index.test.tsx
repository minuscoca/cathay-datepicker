import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/redux/store";
import { SectionHeader } from "../section-header";

describe("[SectionHeader] render", () => {
  test("can select task", () => {
    render(
      <ReduxProvider store={store}>
        <SectionHeader />
      </ReduxProvider>,
    );
    const taskSelect = screen.getByTestId("task-select");
    expect(taskSelect).toHaveValue("current");

    fireEvent.change(taskSelect, { target: { value: "cross" } });

    expect(taskSelect).toHaveValue("cross");
    expect(store.getState().datePicker.type).toBe("cross");
  });
});
