import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import CommentsTable from "../../components/table/comments";
import TextField from "../../components/textfield";
import { useComments } from "../../hooks/useComments";
import { IComment } from "../../interfaces";
import { sortTableData } from "../../utils";
import Button from "../../components/button";

export default function Comments() {
  const {
    data,
    isFetching,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    refetchComment,
  } = useComments();
  const [sortedData, setSortedData] = useState<IComment[]>(data);

  useEffect(() => {
    if (data && data.length > 0) {
      setSortedData(data);
    }
  }, [data]);

  const handleSortByEmail = () => {
    const sorted = sortTableData<IComment>(sortedData, "email");
    setSortedData(sorted);
    refetchComment();
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section className="w-full h-full bg-white">
      <div className="flex justify-between items-center md:p-3">
        <div className="md:w-[80%]">
          <TextField
            placeholder={"Search Comment..."}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery || ""}
          />
        </div>
        <div className="md:w-[15%]">
          <Button
            label="Sort By Email"
            className="w-full text-sm md:text-base bg-[#ec1d26] text-white hover:bg-[#B72B36] p-[8px_16px] font-medium rounded-lg focus:outline-none"
            onClick={handleSortByEmail}
          />
        </div>
      </div>

      <div className="h-[90%] border-b border-[#eee] py-2 overflow-y-scroll">
        {isFetching ? <Loader /> : <CommentsTable data={sortedData || []} />}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onRowsPerPageChange={(rows) => {
          setItemsPerPage(rows);
          setCurrentPage(1);
        }}
      />
    </section>
  );
}
