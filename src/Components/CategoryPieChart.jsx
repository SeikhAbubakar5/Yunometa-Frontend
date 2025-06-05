import React, { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FilterContext } from "../context/FilterContext";
import { fetchCategoryDistribution } from "../utils";

const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"];

export default function CategoryPie() {
  const { filters } = useContext(FilterContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryDistribution({
      startDate: filters.startDate,
      endDate: filters.endDate,
      abcClass: filters.abcClass,
      itemName: filters.itemName,
    })
      .then((res) => {
        setData(res.data.map((r) => ({
          name: r.category,
          value: r.itemCount
        })));
      })
      .catch((e) => {
        console.error(e);
        setData([]);
      });
  }, [filters]);

  if (!data.length) return <p className="p-4 text-red-600">No data available.</p>;

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((_, idx) => (
          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
