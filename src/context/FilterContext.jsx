import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    startDate: "1970-01-01",
    endDate: new Date().toISOString().slice(0, 10),
    abcClass: "",
    itemName: "",
    selectedItemId: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

