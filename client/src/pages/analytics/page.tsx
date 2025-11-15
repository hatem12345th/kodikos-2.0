'use client';

import { Header } from './_components/header';
import { StatCard } from './_components/stat-card';
import { RevenueChart } from './_components/revenue-chart';
import { InvoicesChart } from './_components/invoices-chart';
import { InvoicesStatus } from './_components/invoices-status';
import { Card } from '@heroui/react';

export default function Analytics() {
  return (
    <main className="min-h-screen ">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-6 md:p-8">
      

        {/* Top Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div className='grid grid-cols-2 gap-2'>
          <StatCard
            icon="truck"
            label="Total Revenue"
            value="18 2000"
            suffix="DZD"
            change="+8.4%"
            isPositive={true}
          />
          <StatCard
            icon="truck"
            label="Net Profit"
            value="12 0000"
            suffix="DZD"
            change="-3.1%"
            isPositive={false}
          />
          <StatCard
            icon="truck"
            label="Total Expenses"
            value="4 2000"
            suffix="DZD"
            change="-3.1%"
            isPositive={false}
          />
          <StatCard
            icon="truck"
            label="Net Profit"
            value="16 0000"
            suffix="DZD"
            change="-3.1%"
            isPositive={false}
          />
          </div>
           <Card className="border border-divider bg-card p-6">
              <InvoicesChart />
            </Card>

        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-3">
          {/* Revenue Chart - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="border border-divider bg-card p-6">
              <RevenueChart />
            </Card>
          </div>

          <div className="space-y-6 h-full">           
            <Card className="border border-divider bg-card p-6">
              <InvoicesStatus />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
