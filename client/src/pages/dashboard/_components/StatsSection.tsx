import { FC } from "react";
import { StatCard } from "./StatCard";
import { FileCloud } from "@phosphor-icons/react";

export const StatsSection: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatCard icon={FileCloud} number="23" label="Imported Invoices" />
    <StatCard icon={FileCloud} number="45" label="Pending Orders" />
    <StatCard icon={FileCloud} number="12" label="Customer Reviews" />
    <StatCard icon={FileCloud} number="67" label="Completed Transactions" />
  </div>
);