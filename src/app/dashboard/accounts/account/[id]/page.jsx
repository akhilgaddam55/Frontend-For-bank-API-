"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchAccountById,
  performTransaction,
  performTransfer,
} from "../../../../../utils/fetchers";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountDetails() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAccount = async () => {
    try {
      const acc = await fetchAccountById(id);
      setAccount(acc);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch account",
        text: err.message,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    if (id) fetchAccount();
  }, [id]);

  const handleTransaction = async (type) => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return showToast("Please enter a valid amount", "error");
    }

    try {
      setLoading(true);
      await performTransaction({
        accountId: id,
        amount,
        currency: account.currency,
        type,
      });

      showToast(`${type === "deposit" ? "Deposit" : "Withdrawal"} successful!`, "success");
      setAmount("");
      fetchAccount();
    } catch (err) {
      showToast(err.message || "Transaction failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!amount || !recipientId || isNaN(amount) || parseFloat(amount) <= 0) {
        return showToast("Please enter valid recipient and amount", "error");
    }

    try {
        setLoading(true);
        const res = await performTransfer({
            fromAccountId: id,
            toAccountId: recipientId,
            amount,
        });


        showToast("Transfer successful!", "success");
        setAmount("");
        setRecipientId("");
        setAccount({
            ...account,
            balance: res.data.balances.fromAccount,
        });
        fetchAccount();
    } catch (err) {
        console.log('error', err);
        showToast(err.message || "Transfer failed", "error");
    } finally {
        setLoading(false);
    }
};



  const showToast = (msg, type) => {
    Swal.fire({
      icon: type,
      title: msg,
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  if (!account) return <p>Loading account details...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Account Overview</h1>
      <hr></hr>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-3">
        <Card label="Account Type" value={account.accountType} />
        <Card label="Balance" value={`${new Intl.NumberFormat().format(account.balance)}`} />
        <Card label="Currency" value={account.currency} />
        <Card
          label="Status"
          value={
            account.status === "active" ? (
              <span className="text-green-600 font-bold">Active</span>
            ) : (
              <span className="text-red-600 font-semibold">{account.status}</span>
            )
          }
        />
      </div>

      <Tabs defaultValue="deposit" className="w-full bg-white p-4 rounded shadow ">
        <TabsList className="grid w-full grid-cols-3 mb-4 border-orange-500">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <TransactionForm
            label="Deposit Amount"
            amount={amount}
            setAmount={setAmount}
            onSubmit={() => handleTransaction("deposit")}
            loading={loading}
            buttonText="Deposit"
          />
        </TabsContent>

        <TabsContent value="withdraw">
          <TransactionForm
            label="Withdraw Amount"
            amount={amount}
            setAmount={setAmount}
            onSubmit={() => handleTransaction("withdraw")}
            loading={loading}
            buttonText="Withdraw"
          />
        </TabsContent>

        <TabsContent value="transfer">
          <h2 className="text-lg mb-2 font-semibold">Transfer Funds</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              placeholder="Recipient Account ID"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleTransfer} disabled={loading}>
              {loading ? "Processing..." : "Transfer"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Card = ({ label, value }) => (
  <div className="bg-white shadow-lg rounded p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const TransactionForm = ({ label, amount, setAmount, onSubmit, loading, buttonText }) => (
  <>
    <h2 className="text-lg mb-2 font-semibold">{label}</h2>
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Processing..." : buttonText}
      </Button>
    </div>
  </>
);
