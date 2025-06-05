import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

export default function FilterBar() {
  const { filters, setFilters } = useContext(FilterContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]:
        name === "abcClass"
          ? value.toUpperCase().replace(/\s+/g, "")
          : value.trim(),
    }));
  };

  return (
    <div className="bg-blue p-4 rounded shadow flex flex-wrap gap-4 bg-blue-300">
      <div>
        <label className="block text-sm font-medium">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border p-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border p-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">ABC Class:</label>
        <input
          type="text"
          name="abcClass"
          placeholder="e.g. A,B,C"
          value={filters.abcClass}
          onChange={handleChange}
          className="border p-1 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Item Name:</label>
        <input
          type="text"
          name="itemName"
          placeholder="e.g. Product 1"
          value={filters.itemName}
          onChange={handleChange}
          className="border p-1 rounded"
        />
      </div>
    </div>
  );
}
