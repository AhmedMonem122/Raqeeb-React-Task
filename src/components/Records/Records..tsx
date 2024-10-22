import { FaFilter } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useEffect, useState } from "react";

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
    username,
    setUsername,
    leakedSources,
    setLeakedSources,
  } = useRecords();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  useEffect(() => {
    getRecords();
  }, [page, search, sortOrder, sortBy, status, limit, username, leakedSources]);

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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => setIsFilterModalOpen(true)}>
        <FaFilter />
      </button>
      <dialog
        id="my_modal_1"
        className={`modal ${isFilterModalOpen && "modal-open"}`}
      >
        <div className="modal-box">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow border-none focus:shadow-none"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Type Leaked Sources number</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={leakedSources}
                onChange={(e) => setLeakedSources(parseInt(e.target.value))}
              />
            </label>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

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
                <th scope="col" className="px-6 py-3 text-nowrap">
                  URL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all text-nowrap flex items-center justify-between gap-5"
                  onClick={handleUsernameSort}
                >
                  <p>Username</p>
                  <div>
                    {sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Leaked sources
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all text-nowrap flex items-center justify-between gap-5"
                  onClick={handleCreatedAtSort}
                >
                  <p>Created At</p>
                  <div>
                    {sortOrder === "asc" ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Modified At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 flex items-center  gap-5 text-nowrap"
                >
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
              {records.map((record, i) => {
                const {
                  // _id,
                  created_at,
                  username,
                  leaked_sources,
                  modified_at,
                  status,
                  url,
                } = record;

                return (
                  <tr className=" border-b " key={i}>
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
