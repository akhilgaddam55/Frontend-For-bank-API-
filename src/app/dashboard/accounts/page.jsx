"use client";
import { MaterialReactTable } from "material-react-table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBuildingsData, fetchuserAccounts } from "../../../utils/fetchers";
import { Button } from "@/components/ui/button";
import { MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";

const ExampleTable = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const accounts = await fetchuserAccounts(userId);
        setData(accounts);
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
    { accessorKey: "accountType", header: "Account Type" },
    { accessorKey: "balance", header: "Balance" },
    { accessorKey: "currency", header: "Currency" },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Button
          onClick={() => handleViewClick(row.original.id)}
          className="text-blue-500"
        >
          <MdVisibility />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        onRowSelectionChange={(newSelection) => setRowSelection(newSelection)}
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
