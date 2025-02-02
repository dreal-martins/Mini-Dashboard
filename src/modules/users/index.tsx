import UsersTable from "../../components/table/users";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useUsers } from "../../hooks/useUsers";
import TextField from "../../components/textfield";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { sortTableData } from "../../utils";
import { IUsers } from "../../interfaces";

export default function Users() {
  const {
    fetchData,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    isFetching,
    refetchUser,
  } = useUsers();
  const [sortedData, setSortedData] = useState<IUsers[]>(fetchData || []);

  useEffect(() => {
    if (!isFetching && fetchData && fetchData.length > 0) {
      setSortedData(fetchData);
    }
  }, [fetchData, isFetching]);

  const handleSortByName = () => {
    const sorted = sortTableData<IUsers>(sortedData, "name");
    setSortedData(sorted);
    refetchUser();
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section className="w-full h-full bg-white">
      <div className="flex justify-between items-center md:p-3">
        <div className="md:w-[80%]">
          <TextField
            placeholder={"Search User..."}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery || ""}
          />
        </div>
        <div className="md:w-[15%]">
          <Button
            label="Sort By Name"
            className="w-full text-sm md:text-base bg-[#ec1d26] text-white hover:bg-[#B72B36] p-[8px_16px] font-medium rounded-lg focus:outline-none"
            onClick={handleSortByName}
          />
        </div>
      </div>
      <div className="h-[90%] border-b border-[#eee] py-2 overflow-y-scroll">
        <UsersTable data={sortedData} />
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
