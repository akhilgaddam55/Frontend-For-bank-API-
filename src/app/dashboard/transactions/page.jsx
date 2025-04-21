"use client";
import { MaterialReactTable } from "material-react-table";
import { useState, useEffect } from "react";
import Link from "next/link";
import {  fetchTransactions } from "../../../utils/fetchers";
import { Button } from "@/components/ui/button";
import { MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";

const ExampleTable = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId')
        const transactions = await fetchTransactions(userId);
        setData(transactions);
      } catch (error) {
        console.error("Error fetching Accounts:", error.message);
      }
    };

    fetchData();
  }, []);



  const columns = [
    { accessorKey: "id", header: "Transaction Id" },
    { accessorKey: "type", header: "Balance" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "status", header: "Status" },
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
