import { FC } from "react";
import { StatCard } from "./StatCard";
import { FileCloud, FileCloudIcon, FileMinusIcon, HandCoinsIcon, UploadIcon } from "@phosphor-icons/react";

export const StatsSection: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
   <StatCard icon={UploadIcon} number={"23"} label="Imported Invoices" />
          <StatCard icon={FileCloudIcon} number="45" label="Synced Invoices from email" />
          <StatCard icon={HandCoinsIcon} number="12" label="Paid Invoices" />
          <StatCard icon={FileMinusIcon} number="67" label="Unpaid Invoices" />
  </div>
);