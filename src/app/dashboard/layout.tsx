"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardSidebar from './(components)/DashboardSidebar';
import DashboardTopNav from './(components)/DashboardTopNav';
import { isAuthenticated } from '../../utils/auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push('/');
    }
  }, [router]);

  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[250px_1fr]'>
      <DashboardSidebar/>
      <DashboardTopNav>
        <main className="flex flex-col gap-4 p-4 lg:gap-6 bg-gray-100 min-h-screen shadow">
          {children}
        </main>
      </DashboardTopNav>
    </div>
  );
}

