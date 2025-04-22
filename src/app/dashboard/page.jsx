"use client";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaWallet,
  FaExchangeAlt,
  FaPiggyBank,
  FaMoneyBillWave,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { fetchDashboardData } from "@/utils/fetchers";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const userId = sessionStorage.getItem("userId");
          const dashboardData = await fetchDashboardData(userId);
          setData(dashboardData);
        }
      } catch (error) {
        console.error("Error fetching Accounts:", error.message);
      }
    };
  
    fetchData();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  if (!data) {
    return (
      <div>
         <div className="px-4 pt-4">
      <p className="text-right mb-4">
        Welcome{" "}
        <span className="font-semibold">
        {typeof window !== "undefined" ? sessionStorage.getItem("email") || "" : ""}
        </span>
      </p>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
        <Card
          icon={<FaHome size={28} className="text-blue-500" />}
          title="Total Accounts"
          value={ 0}
        />
        <Card
          icon={<FaWallet size={28} className="text-green-500" />}
          title="Total Balance"
          value={0}
        />
        <Card
          icon={<FaPiggyBank size={28} className="text-purple-500" />}
          title="Savings Balance"
          value={0}
        />
        <Card
          icon={<FaMoneyBillWave size={28} className="text-yellow-500" />}
          title="Current Balance"
          value={0}
        />
      </div>
      <hr className="mt-2"></hr>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 mb-6 mt-2">
        <Card
          icon={<FaArrowDown size={28} className="text-blue-600" />}
          title="Total Deposits"
          value={0}
        />
        <Card
          icon={<FaArrowUp size={28} className="text-red-500" />}
          title="Total Withdrawals"
          value={0}
        />
        <Card
          icon={<FaExchangeAlt size={28} className="text-indigo-500" />}
          title="Total Transfers"
          value={0}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="border shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Transaction Breakdown</h2>
          <PieChart
            data={[
              {
                name: "Deposits",
                value: 0,
              },
              {
                name: "Withdrawals",
                value: 0,
              },
              {
                name: "Transfers",
                value:  0,
              },
            ]}
          />
        </div>

        <div className="border shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Transaction Totals</h2>
          <BarChart
            data={[
              {
                name: "Deposits",
                amount: 0,
              },
              {
                name: "Withdrawals",
                amount:  0,
              },
              {
                name: "Transfers",
                amount:  0,
              },
            ]}
          />
        </div>
      </div>
    </div>

      </div>
    );
  }

  const { totalAccounts, totalBalance, balanceByType, transactionSummary } =
    data;

  return (
    <div className="px-4 pt-4">
      <p className="text-right mb-4">
        Welcome{" "}
        <span className="font-semibold">
        {typeof window !== "undefined" ? sessionStorage.getItem("email") || "" : ""}
        </span>
      </p>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
        <Card
          icon={<FaHome size={28} className="text-blue-500" />}
          title="Total Accounts"
          value={totalAccounts}
        />
        <Card
          icon={<FaWallet size={28} className="text-green-500" />}
          title="Total Balance"
          value={formatCurrency(totalBalance)}
        />
        <Card
          icon={<FaPiggyBank size={28} className="text-purple-500" />}
          title="Savings Balance"
          value={formatCurrency(balanceByType?.savings || 0)}
        />
        <Card
          icon={<FaMoneyBillWave size={28} className="text-yellow-500" />}
          title="Current Balance"
          value={formatCurrency(balanceByType?.current || 0)}
        />
      </div>
      <hr className="mt-2"></hr>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 mb-6 mt-2">
        <Card
          icon={<FaArrowDown size={28} className="text-blue-600" />}
          title="Total Deposits"
          value={formatCurrency(transactionSummary?.totals?.depositAmount || 0)}
        />
        <Card
          icon={<FaArrowUp size={28} className="text-red-500" />}
          title="Total Withdrawals"
          value={formatCurrency(
            transactionSummary?.totals?.withdrawalAmount || 0
          )}
        />
        <Card
          icon={<FaExchangeAlt size={28} className="text-indigo-500" />}
          title="Total Transfers"
          value={formatCurrency(
            transactionSummary?.totals?.transferAmount || 0
          )}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="border shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Transaction Breakdown</h2>
          <PieChart
            data={[
              {
                name: "Deposits",
                value: transactionSummary?.counts?.deposits || 0,
              },
              {
                name: "Withdrawals",
                value: transactionSummary?.counts?.withdrawals || 0,
              },
              {
                name: "Transfers",
                value: transactionSummary?.counts?.transfers || 0,
              },
            ]}
          />
        </div>

        <div className="border shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Transaction Totals</h2>
          <BarChart
            data={[
              {
                name: "Deposits",
                amount: transactionSummary?.totals?.depositAmount || 0,
              },
              {
                name: "Withdrawals",
                amount: transactionSummary?.totals?.withdrawalAmount || 0,
              },
              {
                name: "Transfers",
                amount: transactionSummary?.totals?.transferAmount || 0,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="border shadow-md h-20 rounded-lg flex items-center p-2 bg-white">
      {icon}
      <div className="ml-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
