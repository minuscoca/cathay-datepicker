import { Header } from "./header";
import { DateGrid } from "./dates";

export function DatePicker() {
  return (
    <div className="h-[240px] w-[350px]">
      <Header />
      <DateGrid />
    </div>
  );
}
