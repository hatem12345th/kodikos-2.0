'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Button } from '@heroui/react';
import { CaretDown } from '@phosphor-icons/react';

const data = [
  { name: 'Paid', value: 50 },
  { name: 'Unpaid', value: 15 },
  { name: 'Overdue', value: 35 },
];

const COLORS = ['#0066ff', '#00c853', '#7c3aed'];

export function InvoicesStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Invoices status</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">50 Invoices</p>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              className="gap-1 bg-transparent w-24 text-foreground"
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

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          <span className="text-sm text-foreground">Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-600"></div>
          <span className="text-sm text-foreground">Unpaid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-600"></div>
          <span className="text-sm text-foreground">Overdue</span>
        </div>
      </div>
    </div>
  );
}
