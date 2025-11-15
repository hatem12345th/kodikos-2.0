'use client';

import { Card } from '@heroui/card';
import { Truck } from '@phosphor-icons/react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  suffix: string;
  change: string;
  isPositive: boolean;
}

export function StatCard({
  icon,
  label,
  value,
  suffix,
  change,
  isPositive,
}: StatCardProps) {
  return (
    <Card className="border border-divider bg-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Truck size={20} className="text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{suffix}</span>
          </div>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-semibold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    </Card>
  );
}
