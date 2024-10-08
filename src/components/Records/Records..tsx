import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableOperatorFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";

import { Tag } from "primereact/tag";
import { RecordsService } from "./service/CustomerService";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

interface Record {
  id: number;
  url: string;
  username: string;
  password: string;
  leaked_sources: number;
  created_at: string;
  modified_at: string;
  status: string;
}

const Records = ({ theme }: { theme: string }) => {
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: number]: boolean;
  }>({}); // Tracks visibility for each row

  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    url: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    username: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    password: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    leaked_sources: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    created_at: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    modified_at: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  useEffect(() => {
    RecordsService.getrecordsLarge().then((data) => setRecords(data));
  }, []);

  const togglePasswordVisibility = (id: number) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id],
    }));
  };

  // Password Column Body Template
  const passwordBodyTemplate = (rowData: Record) => {
    const isViewPassword = passwordVisibility[rowData.id]; // Check if password is visible for this row

    return (
      <div className="flex items-center gap-2">
        <input
          type={isViewPassword ? "text" : "password"}
          value={rowData.password}
          readOnly
          className="focus:outline-none bg-transparent"
        />
        <button
          // icon={isViewPassword ? "pi pi-eye-slash" : "pi pi-eye"} // Use an eye icon to indicate visibility
          onClick={() => togglePasswordVisibility(rowData.id)}
          className={`text-[20px] ${theme === "dim" && "text-[#adff2f]"}`}
        >
          {isViewPassword ? <IoIosEyeOff /> : <IoIosEye />}
        </button>
      </div>
    );
  };

  const formatDate = (value: string | Date) => {
    return new Date(value).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "unqualified":
        return "danger";
      case "done":
        return "success";
      case "new":
        return "info";
      case "pending":
        return "warning";
      case "renewal":
        return null;
    }
  };

  // Safe Type Narrowing using Type Guards
  const isOperatorFilterMeta = (
    filterMeta: DataTableFilterMetaData | DataTableOperatorFilterMetaData
  ): filterMeta is DataTableOperatorFilterMetaData => {
    return (
      (filterMeta as DataTableOperatorFilterMetaData).operator !== undefined
    );
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    // Check if the filter is a DataTableOperatorFilterMetaData
    const globalFilterMeta = _filters["global"];

    if (globalFilterMeta && !isOperatorFilterMeta(globalFilterMeta)) {
      globalFilterMeta.value = value;
    }

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center flex-wrap gap-2 justify-content-between align-items-center">
        <h4
          className={`m-0 font-manrope font-bold ${
            theme === "light" ? "text-[#000]" : "text-[#fff]"
          }`}
        >
          Records
        </h4>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="font-poppins font-normal"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={records}
        paginator
        header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedRecords}
        onSelectionChange={(e) => setSelectedRecords(e.value as Record[])}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          "url",
          "username",
          "password",
          "leaked_sources",
          "status",
        ]}
        emptyMessage="No records found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        rowClassName={() =>
          theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
        }
        paginatorClassName={`${
          theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
        } font-poppins`}
      >
        <Column
          field="url"
          header="URL"
          sortable
          filter
          filterPlaceholder="Search by URL"
          style={{ minWidth: "14rem" }}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />
        <Column
          field="username"
          header="Username"
          sortable
          filter
          filterPlaceholder="Search by Username"
          style={{ minWidth: "12rem" }}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />
        <Column
          field="password"
          header="Password"
          sortable
          filter
          filterPlaceholder="Search by Password"
          style={{ minWidth: "12rem" }}
          body={passwordBodyTemplate}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />
        <Column
          field="leaked_sources"
          header="Leaked Sources"
          sortable
          filter
          dataType="numeric"
          filterPlaceholder="Search by Leaked Sources"
          style={{ minWidth: "10rem" }}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />
        <Column
          field="created_at"
          header="Created At"
          sortable
          filter
          dataType="date"
          body={(rowData) => formatDate(rowData.created_at)}
          filterPlaceholder="mm/dd/yyyy"
          style={{ minWidth: "12rem" }}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />

        <Column
          field="modified_at"
          header="Modified At"
          sortable
          filter
          dataType="date"
          body={(rowData) => formatDate(rowData.modified_at)} // Formatting the modified_at field similarly
          filterPlaceholder="mm/dd/yyyy"
          style={{ minWidth: "12rem" }}
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
        />

        <Column
          field="status"
          header="Status"
          headerClassName={`text-nowrap font-manrope ${
            theme === "dim" ? "bg-dimSecondary text-secondaryText" : ""
          }`}
          sortable
          filter
          filterElement={(options) => (
            <Dropdown
              value={options.value}
              options={[
                "unqualified",
                "qualified",
                "new",
                "negotiation",
                "renewal",
              ]}
              onChange={(e) => options.filterCallback(e.value)}
              placeholder="Select Status"
            />
          )}
          body={(rowData) => (
            <Tag
              value={rowData.status}
              severity={getSeverity(rowData.status)}
            />
          )}
          style={{ minWidth: "10rem" }}
        />
      </DataTable>
    </div>
  );
};

export default Records;
