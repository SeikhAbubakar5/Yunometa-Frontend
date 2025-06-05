import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { fetchConsumptionMonthly } from "../utils";
import { FilterContext } from "../context/FilterContext";

export default function ConsumptionTrend() {
  const { filters } = useContext(FilterContext);
  const [chartData, setChartData] = useState([]);
  const [itemKeys, setItemKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = {
      start: filters.startDate.slice(0, 7),
      end: filters.endDate.slice(0, 7),
    };

    if (filters.abcClass) params.abcClass = filters.abcClass;
    if (filters.category) params.category = filters.category;
    if (filters.selectedItemId) params.itemId = filters.selectedItemId;

    setLoading(true);
    fetchConsumptionMonthly(params)
      .then((res) => {
        const rawData = res.data;

        const totalByItem = {};
        rawData.forEach(({ itemName, totalCons }) => {
          totalByItem[itemName] = (totalByItem[itemName] || 0) + totalCons;
        });

        const topItems = Object.entries(totalByItem)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([name]) => name);

        const monthMap = {};
        rawData.forEach(({ yearMonth, itemName, totalCons }) => {
          if (!topItems.includes(itemName)) return;

          if (!monthMap[yearMonth]) {
            monthMap[yearMonth] = { month: yearMonth };
          }
          monthMap[yearMonth][itemName] = totalCons;
        });

        const finalData = Object.values(monthMap).sort((a, b) =>
          a.month.localeCompare(b.month)
        );

        setChartData(finalData);
        setItemKeys(topItems);
      })
      .catch((e) => {
        console.error("Error fetching trend:", e);
        setChartData([]);
        setItemKeys([]);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) {
    return <p className="p-4 text-gray-600">Loading consumption trend...</p>;
  }

  if (!chartData.length) {
    return <p className="p-4 text-gray-600">No consumption trend data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {itemKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={getColor(index)}
            barSize={30}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

function getColor(index) {
  const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc949"];
  return COLORS[index % COLORS.length];
}
