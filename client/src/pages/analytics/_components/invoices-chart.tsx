'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Button } from '@heroui/react';
import { CaretDown } from '@phosphor-icons/react';

const data = [
  { quarter: '', invoices: 10 },
  { quarter: '', invoices: 20 },
  { quarter: 'q1', invoices: 26 },
    { quarter: '', invoices: 30 },
      { quarter: '', invoices: 24 },
  { quarter: '', invoices: 10 },

    { quarter: 'q2', invoices: 26 },

  { quarter: '', invoices: 30 },
  { quarter: '', invoices: 26 },
  { quarter: '', invoices: 10 },
  { quarter: '', invoices: 24 },
  { quarter: 'q3', invoices: 25 },
  { quarter: '', invoices: 30 },
  { quarter: '', invoices: 24 },
  { quarter: '', invoices: 10 },
    { quarter: '', invoices: 20 },
  
    { quarter: 'q4', invoices: 26 },

];

export function InvoicesChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Invoices</h3>
          <p className="mt-1 text-2xl font-bold text-blue-600">4 Invoices P/day</p>
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

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="quarter" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Bar dataKey="invoices" fill="#0066ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-2 pt-2">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-sm text-muted-foreground">Invoices Uploaded</span>
      </div>
    </div>
  );
}
