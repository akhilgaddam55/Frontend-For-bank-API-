"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Banknote, Folder, HomeIcon, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3 bg-gray-900 justify-between">
        {/* Left section with hamburger menu */}
        <div className="flex items-center gap-4">
          <Dialog>
            <SheetTrigger className="min-[1024px]:hidden p-2 transition">
              <HamburgerMenuIcon style={{ color: 'white' }} />
              <Link href="/dashboard">
                <span className="sr-only">Dashboard</span>
              </Link>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link href="/accounts">
                  <SheetTitle>Akhil Banking App</SheetTitle>
                </Link>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-[1rem]">
                <DialogClose asChild>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/dashboard/accounts">
                    <Button variant="outline" className="w-full">
                      <Banknote className="mr-2 h-4 w-4" />
                      Accounts
                    </Button>
                  </Link>
                </DialogClose>
                <Separator className="my-3" />
                <DialogClose asChild>
                  <Link href="/dashboard/transactions">
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Transactions
                    </Button>
                  </Link>
                </DialogClose>
              </div>
            </SheetContent>
          </Dialog>
        </div>
        
        {/* Right section with profile icon */}
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <User className="h-10 w-10 text-white cursor-pointer mr-5" />
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
