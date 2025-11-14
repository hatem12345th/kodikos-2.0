import { Badge, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { FileText, MoreVertical } from "lucide-react";
import { FC } from "react";

interface InvoiceListItemProps {
  status: 'Valid' | 'Invalid';
}

interface StatusBadgeProps {
  status: 'Valid' | 'Invalid';
}
const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const isValid = status === 'Valid';
  return (
    <Badge
      content={status}
      color={isValid ? 'success' : 'danger'}
      variant="flat"
        
    >
      <div className="" /> 
    </Badge>
  );
};




export const InvoiceListItem: FC<InvoiceListItemProps> = ({ status }) => (
  <Card className="mb-3">
    <CardBody className="flex flex-row items-center justify-between py-4">
      <div className="flex items-center gap-4 flex-1">
        <FileText className="w-5 h-5 text-default-400" />
        <div className="flex flex-col">
          <p className="font-medium">Invoice Details</p>
          <p className="text-sm text-default-500">Today, 1:15 PM</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge status={status} />
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="view">View Details</DropdownItem>
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </CardBody>
  </Card>
);