"use client";
import { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv"; // for export functionality

const ExchangeRatesTable = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.exchangeratesapi.io/v1/latest?access_key=c4aace06d49151f5f0c6c6fbb7316094"
        );
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error.message);
        }

        const baseToINR = data.rates["INR"];

        const formattedRates = Object.entries(data.rates)
          .filter(([currency]) => currency !== "INR")
          .map(([currency, rate]) => ({
            currency,
            rate: (rate / baseToINR).toFixed(4),
          }));

        setExchangeRates(formattedRates);
      } catch (err) {
        console.error("Failed to fetch exchange rates", err);
      }
    };

    fetchRates();
  }, []);

  // CSV Export configuration
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(exchangeRates);
    download(csvConfig)(csv);
  };

  const columns = [
    { accessorKey: "currency", header: "Currency" },
    { accessorKey: "rate", header: "Rate (per 1 INR)" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">INR Exchange Rates</h2>
      </div>
      <MaterialReactTable
        columns={columns}
        data={exchangeRates}
        enablePagination={true}
        enableColumnFilters={false}
        enableRowSelection={false}
        enableColumnActions={false}
        renderTopToolbarCustomActions={({ table }) => (
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export to CSV
          </button>
        )}
        muiTablePaginationProps={{
          rowsPerPageOptions: [10, 25, 50, 100], // Custom page size options
          showFirstButton: true,
          showLastButton: true,
        }}
      />
    </div>
  );
};

export default ExchangeRatesTable;