import React, { useContext, useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import { FilterContext } from "../context/FilterContext";
import { fetchStockVsMsl } from "../utils";

export default function StockVsMSLChart() {
  const { filters } = useContext(FilterContext);
  const [series, setSeries] = useState([]);
  const [msl, setMsl] = useState(null);

  useEffect(() => {
    const { selectedItemId, startDate, endDate } = filters;
    if (!selectedItemId) {
      setSeries([]);
      return;
    }

    fetchStockVsMsl(selectedItemId, { startDate, endDate })
      .then((res) => {
        if (!res.data.length) {
          setSeries([]);
          return;
        }

        setMsl(res.data[0].msl);
        setSeries(res.data.map((d) => ({
          date: d.date,
          closing: d.closingStock
        })));
      })
      .catch((e) => {
        console.error(e);
        setSeries([]);
      });
  }, [filters]);

  if (!filters.selectedItemId) {
    return <p className="p-4 text-gray-600">Enter Item ID to view chart.</p>;
  }

  if (!series.length) {
    return <p className="p-4 text-gray-600">No data for that item/range.</p>;
  }

  return (
    <LineChart width={600} height={300} data={series}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <ReferenceLine
        y={msl}
        stroke="#888"
        strokeDasharray="5 5"
        label={{ value: `MSL (${msl})`, position: "top" }}
      />
      <Line
        type="monotone"
        dataKey="closing"
        stroke="#4e79a7"
        dot={({ payload, cx, cy }) => {
          const isBelow = payload.closing < msl;
          const isAbove = payload.closing > msl * 1.5;
          const color = isBelow ? "#e15759" : isAbove ? "#59a14f" : "#4e79a7";
          return <circle cx={cx} cy={cy} r={4} fill={color} />;
        }}
      />
    </LineChart>
  );
}
