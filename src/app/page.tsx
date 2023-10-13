import { DatePicker } from "@/components/date-picker";
import { SectionHeader } from "@/components/section-header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12 py-24 ">
      <section className="grid gap-8">
        <SectionHeader />
        <DatePicker />
      </section>
    </main>
  );
}
