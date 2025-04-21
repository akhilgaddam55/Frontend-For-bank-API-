"use client";
import { MaterialReactTable } from "material-react-table";
import { useState, useEffect } from "react";
import Link from "next/link";
import {  fetchuserAccounts, fetchAlerts } from "../../../utils/fetchers";
import { Button } from "@/components/ui/button";
import { MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";

const ExampleTable = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = sessionStorage.getItem("email");
        const alerts = await fetchAlerts(userEmail);
        setData(alerts);
      } catch (error) {
        console.error("Error fetching Accounts:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (accountId) => {
    router.push(`/dashboard/accounts/account/${accountId}`);
  };

  const columns = [
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "recipient",
      header: "Recipient",
    },
    {
      accessorKey: "isSent",
      header: "Status",
      Cell: ({ cell }) => {
        const isSent = cell.getValue();
        return (
          <span className={isSent ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {isSent ? "Delivered to Mail" : "Not Mailed"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Message Date",
      Cell: ({ cell }) => {
        const rawDate = cell.getValue();
        const date = new Date(rawDate);
        const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        return <span>{formatted}</span>;
      },
    },
  ];

  return (
    <div className="p-6">
      <MaterialReactTable
        columns={columns}
        data={data}
        enablePagination
        enableColumnFilters
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 25],
        }}
      />
    </div>
  );
};

export default ExampleTable;
