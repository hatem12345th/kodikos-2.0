
import { Avatar, Card, CardBody } from "@heroui/react";
import { FC } from "react";
import { FileText, TrendingUp, Users, Activity } from "lucide-react";
import { FileCloudIcon } from "@phosphor-icons/react";

// Types
interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  number: string | number;
  label: string;
  trend?: number;
  color?: "blue" | "green" | "purple" | "orange";
}

// Stat Card Component
export const StatCard: FC<StatCardProps> = ({
  icon: Icon,
  number,
  label,
  trend,
  color = "blue",
}) => {
  const colorMap = {
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  };

  return (
    <Card className="flex-1 min-w-[200px] hover:shadow-lg transition-shadow " >
      <CardBody className="flex flex-col items-center justify-between py-6 px-6 gap-4">
       <div className="flex gap-8 items-center ">
        <div className="bg-default-300 rounded-full">
            <FileCloudIcon size={32} className=" " />
        </div>

       <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold text-default-900">{number}</p>
        </div>
        </div>
                          <p className="text-sm text-default-500 font-medium">{label}</p>

      </CardBody>

    </Card>
  );
};
