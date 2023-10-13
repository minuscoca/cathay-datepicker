import { DatePicker } from "@/components/date-picker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-24 ">
      <section className="grid gap-8">
        <div>
          <h1 className="text-center text-xl">Task – 1</h1>
          <h2 className="text-center">
            (Date Range Component for current month)
          </h2>
        </div>

        <DatePicker type="current" />
      </section>
    </main>
  );
}
