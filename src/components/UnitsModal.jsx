"use client";
import { MaterialReactTable } from 'material-react-table';
import { useState, useEffect } from "react";
import { fetchUnits } from '../utils/fetchers';
import { Button } from "@/components/ui/button"; 

const Units = ({ onSelect }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = sessionStorage.getItem('companyId');
        const units = await fetchUnits(companyId); 
        setData(units);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching units:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { accessorKey: "type", header: "Name" },
    { accessorKey: "unitName", header: "House Number" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "size", header: "Size" },
    {
      accessorKey: "isActive", 
      header: "Active", 
      Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No')
    },
    { 
      id: "actions", 
      header: "Actions",
      Cell: ({ row }) => (
        <Button onClick={() => onSelect(row.original)} className="text-blue-500">
          Select
        </Button>
      )
    },
  ];

  return (
    <div style={{ overflowX: 'auto' }}> {/* Added for horizontal scrolling */}
      {loading && <p>Please Wait</p>}
      <MaterialReactTable
        columns={columns}
        data={data}
        enablePagination
        enableColumnFilters
        muiTableProps={{
          sx: {
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            minWidth: '600px', // Ensuring a minimum width for responsiveness
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: '#f5f5f5',
            padding: '12px',
            fontWeight: 'bold', // Enhancing header visibility
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: '12px',
            fontSize: '0.875rem', // Adjust font size for readability
          },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: '400px', // Optional: set a maximum height for scrolling
            overflowY: 'auto', // Enable vertical scrolling if needed
          },
        }}
      />
    </div>
  );
};

export default Units;
