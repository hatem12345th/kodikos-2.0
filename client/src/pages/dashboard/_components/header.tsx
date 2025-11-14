import { Button } from "@heroui/react";
import { Download } from "lucide-react";
import { FC } from "react";

export const Header: FC = () => (
  <div className="flex items-center justify-between mb-8">
    <h1 className="text-3xl font-bold">Incoming Invoices</h1>
    <Button color="primary" className="gap-2">
      Export to Xsl
      <Download className="w-4 h-4" />
    </Button>
  </div>
);