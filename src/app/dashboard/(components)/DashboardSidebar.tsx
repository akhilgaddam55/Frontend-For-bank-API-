"use client"

import clsx from "clsx"
import { HomeIcon, Folder, Banknote, Settings, Building2, User, HousePlus, UserRound, BanknoteIcon, MailPlus, CircleDollarSign, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    const x = sessionStorage.getItem('isSuper');
    setIsSuper(x === 'true');
  }, []);

  return (
    <div className="lg:block hidden border-r h-full bg-gray-900 shadow-lg text-white">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/">
            <span className="">Akhil (Banking App)</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2 ">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all  dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900  transition-all  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname === "/dashboard"
              })}
              href="/dashboard"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <HomeIcon className="h-4 w-4" />
              </div>
              Dashboard
            </Link>
            <h1 className="text-base mt-2 mb-2">Accounts</h1>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all  dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900  transition-all  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname.includes("/dashboard/accounts")
              })}
              href="/dashboard/accounts"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <Folder className="h-4 w-4" />
              </div>
              Bank Accounts
            </Link>
            <h1 className="text-base mt-2 mb-2">Operations</h1>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all  dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900  transition-all  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname.includes("/dashboard/units")
              })}
              href="/dashboard/transactions"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <HousePlus className="h-4 w-4" />
              </div>
              Transactions
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all  dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900  transition-all  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname.includes("/dashboard/units")
              })}
              href="/dashboard/rates"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <HousePlus className="h-4 w-4" />
              </div>
              Exchange Rates
            </Link>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all  dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900  transition-all  dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname.includes("/dashboard/units")
              })}
              href="/dashboard/alerts"
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <HousePlus className="h-4 w-4" />
              </div>
              Alerts
            </Link>
            <h1 className="text-base mt-2 mb-2">..............</h1>
            <Link
              className={clsx("flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all dark:text-gray-400 dark:hover:text-gray-50", {
                "flex items-center gap-2 rounded-lg bg-[#22d3ee] px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50": pathname.includes("/dashboard/logout")
              })}
              href="/"
              id="logout"
              onClick={(e) => {
                if (confirm("Are you sure you want to log out?")) {
                  sessionStorage.removeItem('token');
                } else {
                  e.preventDefault();
                }
              }}
            >
              <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1">
                <LogOut className="h-4 w-4" />
              </div>
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}