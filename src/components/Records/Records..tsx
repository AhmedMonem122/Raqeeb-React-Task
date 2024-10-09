import { useEffect } from "react";

import useRecords from "../../hooks/use-records";

const Records = () => {
  const {
    getRecords,
    page,
    setPage,
    records,
    search,
    isLoading,
    sortOrder,
    sortBy,
    setSortBy,
    setSortOrder,
    status,
    setStatus,
    limit,
    setLimit,
  } = useRecords();

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  useEffect(() => {
    getRecords();
  }, [page, search, sortOrder, sortBy, status, limit]);

  const handleUsernameSort = () => {
    setSortBy("username");
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const handleCreatedAtSort = () => {
    setSortBy("created_at");
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {!records.length ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No records found
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  URL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all"
                  onClick={handleUsernameSort}
                >
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Leaked sources
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all"
                  onClick={handleCreatedAtSort}
                >
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Modified At
                </th>
                <th scope="col" className="px-6 py-3 flex items-center  gap-5">
                  <div>Status</div>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 text-nowrap"
                    >
                      Choose your status
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li onClick={() => setStatus("")}>
                        <button>all</button>
                      </li>
                      <li onClick={() => setStatus("done")}>
                        <button>done</button>
                      </li>
                      <li onClick={() => setStatus("pending")}>
                        <button>pending</button>
                      </li>
                      <li onClick={() => setStatus("in progress")}>
                        <button>in progress</button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const {
                  _id,
                  created_at,
                  username,
                  leaked_sources,
                  modified_at,
                  status,
                  url,
                } = record;

                return (
                  <tr className=" border-b " key={_id}>
                    <td className="px-6 py-4">{url}</td>
                    <td className="px-6 py-4">{username}</td>
                    <td className="px-6 py-4">{leaked_sources}</td>
                    <td className="px-6 py-4">
                      {new Date(created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(modified_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`${
                          status === "done"
                            ? "bg-green-500"
                            : status === "pending"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        } text-white p-2 w-fit text-nowrap rounded-lg`}
                      >
                        {status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                {limit} rows
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li onClick={() => setLimit(10)}>
                  <button>10</button>
                </li>
                <li onClick={() => setLimit(25)}>
                  <button>25</button>
                </li>
                <li onClick={() => setLimit(50)}>
                  <button>50</button>
                </li>
                <li onClick={() => setLimit(100)}>
                  <button>100</button>
                </li>
                <li onClick={() => setLimit(200)}>
                  <button>200</button>
                </li>
              </ul>
            </div>

            <span className="text-sm text-gray-700 dark:text-gray-400">
              Page {page}
            </span>

            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={handlePreviousPage}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>

              <li>
                <button
                  onClick={handleNextPage}
                  className="flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Records;
