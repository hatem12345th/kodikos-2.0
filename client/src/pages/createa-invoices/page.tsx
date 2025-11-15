'use client';

import { useState } from 'react';
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
} from '@heroui/react';
import {
  BookmarkSimple,
  Plus,
  DotsThreeVertical,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface LineItem {
  id: number;
  no: string;
  description: string;
  price: number;
  tax: number;
  amount: number;
}

export default function CreateInvoice() {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: 1,
      no: '01',
      description: 'Fendi Nofel',
      price: 4000,
      tax: 10,
      amount: 4400,
    },
    {
      id: 2,
      no: '02',
      description: 'Gucci Avelon',
      price: 6000,
      tax: 15,
      amount: 5100,
    },
    {
      id: 3,
      no: '03',
      description: 'Prada Vero',
      price: 5000,
      tax: 20,
      amount: 4000,
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: 'RIAD',
    lastName: 'Mohamed',
    address: '123 Rue des Martyrs, Algiers, Algeria',
    invoiceNumber: 'RIAD',
    date: 'Dec -23 2025',
    reference: 'RIAD',
    dueDate: 'Dec -23 2025',
  });

  const handleAddLine = () => {
    const newItem: LineItem = {
      id: lineItems.length + 1,
      no: String(lineItems.length + 1).padStart(2, '0'),
      description: '',
      price: 0,
      tax: 0,
      amount: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + item.price, 0);
  const totalTax = 12;
  const total = 18000;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header Section */}
      <div className="mb-8">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem>
            <div className="flex items-center gap-2" onClick={() => navigate("")} >
              <BookmarkSimple size={16} />
              Outgoing Invoices
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem>Create Invoice</BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Create Invoice</h1>
          <div className="flex gap-3">
            <Button
              variant="bordered"
              className="bg-secondary text-secondary-foreground"
              startContent={<BookmarkSimple size={16} />}
            >
              Draft
            </Button>
            <Button
              color="primary"
              className="bg-blue-600 text-white"
              startContent={<Plus size={16} />}
            >
              New Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Details Section */}
      <Card className="mb-8 border border-border">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Invoice Details
          </h2>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    First Name
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Last Name
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="bg-muted"
                  variant="flat"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Invoice Number
                  </label>
                  <Input
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange(e, 'invoiceNumber')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Date
                  </label>
                  <Input
                    value={formData.date}
                    onChange={(e) => handleInputChange(e, 'date')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Reference
                  </label>
                  <Input
                    value={formData.reference}
                    onChange={(e) => handleInputChange(e, 'reference')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Due Date
                  </label>
                  <Input
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange(e, 'dueDate')}
                    className="bg-muted"
                    variant="flat"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Line Items Table Section */}
      <Card className="border border-border">
        <CardHeader className="flex flex-col items-start px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Invoice Details
          </h2>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <Table aria-label="Invoice line items">
            <TableHeader>
              <TableColumn className="bg-muted">No.</TableColumn>
              <TableColumn className="bg-muted">Qte</TableColumn>
              <TableColumn className="bg-muted">Price</TableColumn>
              <TableColumn className="bg-muted">Tax</TableColumn>
              <TableColumn className="bg-muted">Amount</TableColumn>
              <TableColumn className="bg-muted w-12"> </TableColumn>
            </TableHeader>
            <TableBody>
              {lineItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price} DA</TableCell>
                  <TableCell>{item.tax}%</TableCell>
                  <TableCell>{item.amount} DA</TableCell>
                  <TableCell>
                    <button className="text-muted-foreground hover:text-foreground">
                      <DotsThreeVertical size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add New Line */}
          <div className="mt-6 flex justify-center py-4 border-t border-border">
            <button
              onClick={handleAddLine}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              New line
            </button>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end gap-12 mt-8 pt-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">
                Total Amount
              </p>
              <p className="text-lg font-semibold text-foreground">
                {totalAmount} DA
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">Tax</p>
              <p className="text-lg font-semibold text-foreground">
                {totalTax}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-2">Total</p>
              <p className="text-2xl font-bold text-foreground">{total} DA</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
