import { useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UseTableProps } from "../interfaces";

export function useTable<T>({ columns, initialData }: UseTableProps<T>) {
  const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const updateRow = (index: number, newData: T) => {
    setData((prev) => {
      const newDataArray = [...prev];
      newDataArray[index] = newData;
      return newDataArray;
    });
  };

  const addRow = (newData: T) => {
    setData((prev) => [...prev, newData]);
  };

  const deleteRow = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return { table, data, updateRow, addRow, deleteRow };
}
