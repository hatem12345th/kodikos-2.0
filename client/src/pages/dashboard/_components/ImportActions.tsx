import { Button, Card, CardBody } from "@heroui/react";
import { Download } from "lucide-react";
import { FC } from "react";

export const ImportActions: FC = () => (
  <Card className="" >
    <CardBody className="flex flex-row items-center justify-between py-6">
      <div className="flex gap-3">
        <Button variant="bordered" className="border-default-300">
          Preview
        </Button>
        <Button color="primary" className="gap-2">
          Import (4 invoices)
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </CardBody>
  </Card>
);
