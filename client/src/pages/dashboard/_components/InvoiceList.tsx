import { FC } from "react";
import { InvoiceListItem } from "./InvoiceListItem";

// Invoice List Component
export const InvoiceList: FC = () => (
  <div className="space-y-3">
    <InvoiceListItem status="Valid" />
    <InvoiceListItem status="Invalid" />
    <InvoiceListItem status="Valid" />
    <InvoiceListItem status="Valid" />
    <InvoiceListItem status="Valid" />
    <InvoiceListItem status="Invalid" />
    <InvoiceListItem status="Valid" />
  </div>
);