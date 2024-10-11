import IngredientsHistory from "./components/IngredientsHistory";
import PizzaPieChart from "./components/PizzaPieChart";
import RevenueChart from "./components/RevenueChart";
import WeekChart from "./components/WeekChart";
import PizzaRevenueChart from "./components/PizzaRevenueChart";

export default function Stats() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <section className="flex flex-col md:flex-row w-full gap-4">
        <WeekChart />
        <RevenueChart />
        <PizzaRevenueChart />
      </section>
      <section className="w-full max-h-[45rem]">
        <IngredientsHistory />
      </section>
      <section className="w-full">
        <PizzaPieChart />
      </section>
    </div>
  );
}
