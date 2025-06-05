import React, { useContext } from "react";
import { FilterProvider, FilterContext } from "./context/FilterContext";
import FilterBar from "./Components/FilterBar";
import CategoryPie from "./Components/CategoryPieChart";
import StockVsMSLChart from "./Components/StockVsMSLChart";
import ConsumptionTrend from "./Components/ConsumptionTrends";

function Dashboard() {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-white">
        Inventory Dashboard
      </h1>

      <FilterBar />

      <section className="bg-gray-300 p-10 rounded shadow flex items-center justify-center flex-col">
        <h2 className="font-semibold mb-2">Category Distribution</h2>
        <CategoryPie />
      </section>

      <section className="bg-yellow-200 p-10 rounded shadow flex items-center justify-center flex-col">
        <h2 className="font-semibold mb-2"> Stock vs. MSL Trend</h2>
        <div className="mb-2">
          <label className="text-sm mr-2">Item ID:</label>
          <input
            type="text"
            value={filters.selectedItemId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, selectedItemId: e.target.value }))
            }
            placeholder="e.g. ITEM-0001"
            className="border px-2 py-1 rounded"
          />
        </div>
        <StockVsMSLChart />
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Monthly Consumption Trend</h2>
        <ConsumptionTrend />
      </section>
    </div>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
}
