import { flexRender } from "@tanstack/react-table";
import { UseTableProps } from "../../interfaces";
import { useTable } from "../../hooks";

const CustomTable = <T,>({
  columns,
  initialData,
  addRowStyle,
  rowBackgroundColor = "bg-white",
}: UseTableProps<T>) => {
  const { table, data } = useTable({
    columns,
    initialData,
  });

  return (
    <div className="max-w-full rounded-lg overflow-hidden">
      <div className="overflow-x-auto scrollbar-hidden">
        <table
          className="border-spacing-y-table w-full table-auto"
          style={{ minWidth: "max-content" }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#fff]">
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`text-[#8C8C8C] font-semibold text-[0.85rem] py-4 px-4 text-left ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-lg"
                        : ""
                    }`}
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={rowBackgroundColor}>
            {data && data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="text-[#1F2734] text-[0.85rem] border"
                  style={{ ...addRowStyle?.(row.original) }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`py-4 px-4 text-left ${
                        cell.column.id === "actions"
                          ? "sticky right-0 bg-white"
                          : ""
                      }`}
                      style={{
                        whiteSpace: "nowrap", // Prevent cell content wrapping
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div className="text-center py-6 text-[#8C8C8C]">
                    No Data Available
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
