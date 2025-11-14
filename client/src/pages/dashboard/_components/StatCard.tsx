import { Card, CardBody } from "@heroui/react";
import { FC } from "react";

// Types
interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  number: string | number;
  label: string;
}

// Stat Card Component
export const StatCard: FC<StatCardProps> = ({ icon: Icon, number, label }) => (
  <Card className="flex-1 min-w-[200px]">
    <CardBody className="flex flex-row items-center justify-between py-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-default-600">{label}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
      <Icon className="w-8 h-8 text-default-400" />
    </CardBody>
  </Card>
);