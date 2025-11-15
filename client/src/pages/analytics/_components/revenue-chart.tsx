'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Button } from '@heroui/react';
import { CaretDown } from '@phosphor-icons/react';

const data = [
  { month: 'Jan', revenue: 12000, profit: 6000 },
  { month: 'Feb', revenue: 11000, profit: 7000 },
  { month: 'Mar', revenue: 12000, profit: 8000 },
  { month: 'Apr', revenue: 14000, profit: 10000 },
  { month: 'May', revenue: 16000, profit: 11000 },
  { month: 'Jun', revenue: 13000, profit: 12000 },
];

export function RevenueChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">5.000,00</p>
          <p className="text-sm text-muted-foreground">50 Invoices</p>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              className="gap-1 bg-transparent text-foreground"
              variant="light"
              endContent={<CaretDown size={16} />}
            >
              This Week
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Time period">
            <DropdownItem key="week">This Week</DropdownItem>
            <DropdownItem key="month">This Month</DropdownItem>
            <DropdownItem key="year">This Year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0066ff"
            strokeWidth={2}
            dot={{ fill: '#0066ff', r: 5 }}
            name="Revenue Trends"
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#00c853"
            strokeWidth={2}
            dot={{ fill: '#00c853', r: 5 }}
            name="Net Profit Trend"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          <span className="text-sm text-muted-foreground">Revenue Trends</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-600"></div>
          <span className="text-sm text-muted-foreground">Net Profit Trend</span>
        </div>
      </div>
    </div>
  );
}
