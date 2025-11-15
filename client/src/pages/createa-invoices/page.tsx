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
import { BookmarkSimple, Plus } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { manualAddInvoice, downloadAndReadLog } from '@/lib/api';

// ---------- Types ----------
interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface InvoiceItem {
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  vendorName?: string;
  vendorAddress?: string;
  customerName?: string;
  customerAddress?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  totalAmount: number;
  taxAmount: number;
  subtotal: number;
  currency?: string;
  paymentTerms?: string;
  paymentInstructions?: string;
  items?: InvoiceItem[];
}

// ---------- Input Patterns ----------
const PATTERNS = {
  vendorName: '^[a-zA-Z0-9\\s\\-&.,()]{1,100}$',
  address: '^[a-zA-Z0-9\\s\\-,.#/()]{1,150}$',
  invoiceNumber: '^[a-zA-Z0-9\\-/#]{1,50}$',
  date: '^\\d{4}-\\d{2}-\\d{2}$', // YYYY-MM-DD
  currency: '^[A-Z]{3}$', // ISO 4217
  description: '^[a-zA-Z0-9\\s\\-&.,()]{1,200}$',
  quantity: '^[0-9]+(\\.[0-9]{1,4})?$',
  price: '^[0-9]+(\\.[0-9]{1,2})?$',
  taxPercent: '^([0-9]{1,2}(\\.[0-9]{1,2})?|100)$',
};

export default function CreateInvoice() {
  const navigate = useNavigate();

  // ---------- FORM DATA ----------
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorAddress: '',
    customerName: '',
    customerAddress: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    currency: 'DA',
  });

  // ---------- LINE ITEMS ----------
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  // ---------- AUTO FILL FROM XLSX ----------
  const handleAutoFill = async () => {
    const excel = await downloadAndReadLog();

    if (!excel || excel.length === 0) return;

    const row = excel[0]; // take first row

    setFormData({
      vendorName: row.Vendor,
      vendorAddress: 'Algeria',
      customerName: 'Client',
      customerAddress: '',
      invoiceNumber: row['Invoice Number'],
      invoiceDate: row.Date,
      dueDate: row['Due Date'],
      currency: row.Currency,
    });

    setLineItems([
      {
        id: 1,
        description: row.Vendor,
        quantity: 1,
        unitPrice: row.Subtotal,
        tax: row.Tax,
        total: row.Total,
      },
    ]);
  };

  // ---------- Add line ----------
  const handleAddLine = () => {
    const newLine: LineItem = {
      id: lineItems.length + 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    };
    setLineItems([...lineItems, newLine]);
  };

  // ---------- Submit Invoice ----------
  const handleSubmit = async () => {
    const payload: InvoiceData = {
      ...formData,
      subtotal: lineItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0),
      taxAmount: lineItems.reduce((s, i) => s + ((i.unitPrice * i.quantity) * i.tax) / 100, 0),
      totalAmount: lineItems.reduce(
        (s, i) => s + (i.unitPrice * i.quantity + (i.unitPrice * i.quantity * i.tax) / 100),
        0
      ),
      items: lineItems.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        total: i.total,
      })),
    };

    await manualAddInvoice(payload);
    navigate('/outgoing-invoices');
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem>Outgoing Invoices</BreadcrumbItem>
          <BreadcrumbItem>Create Invoice</BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Create Invoice</h1>

          <div className="flex gap-3">
            <Button variant="bordered">Draft</Button>

            <Button color="primary" onClick={handleSubmit}>
              Create Invoice
            </Button>

            <Button color="secondary" onClick={handleAutoFill}>
              Auto Fill From XLSX
            </Button>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold">Invoice Details</h2>
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm">Vendor Name</label>
              <Input
                value={formData.vendorName}
                pattern={PATTERNS.vendorName}
                placeholder="Enter vendor name"
                onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-sm">Vendor Address</label>
              <Input
                value={formData.vendorAddress}
                pattern={PATTERNS.address}
                placeholder="Enter vendor address"
                onChange={(e) => setFormData({...formData, vendorAddress: e.target.value})}
                maxLength={150}
              />
            </div>

            <div>
              <label className="text-sm">Customer Name</label>
              <Input
                value={formData.customerName}
                pattern={PATTERNS.vendorName}
                placeholder="Enter customer name"
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                maxLength={100}
              />
            </div>

            <div>
              <label className="text-sm">Customer Address</label>
              <Input
                value={formData.customerAddress}
                pattern={PATTERNS.address}
                placeholder="Enter customer address"
                onChange={(e) => setFormData({...formData, customerAddress: e.target.value})}
                maxLength={150}
              />
            </div>

            <div>
              <label className="text-sm">Invoice Number</label>
              <Input
                value={formData.invoiceNumber}
                pattern={PATTERNS.invoiceNumber}
                placeholder="e.g., INV-001 or 2024/001"
                onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                maxLength={50}
              />
            </div>

            <div>
              <label className="text-sm">Date</label>
              <Input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm">Due Date</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm">Currency</label>
              <Input
                value={formData.currency}
                pattern={PATTERNS.currency}
                placeholder="e.g., DA, USD, EUR"
                onChange={(e) => setFormData({...formData, currency: e.target.value.toUpperCase()})}
                maxLength={3}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Line Items</h2>
        </CardHeader>

        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>Description</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Unit Price</TableColumn>
              <TableColumn>Tax %</TableColumn>
              <TableColumn>Total</TableColumn>
            </TableHeader>

            <TableBody>
              {lineItems.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      pattern={PATTERNS.description}
                      placeholder="Item description"
                      onChange={(e) => {
                        const updated = [...lineItems];
                        updated[idx].description = e.target.value;
                        setLineItems(updated);
                      }}
                      maxLength={200}
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={item.quantity.toString()}
                      pattern={PATTERNS.quantity}
                      placeholder="0"
                      onChange={(e) => {
                        const updated = [...lineItems];
                        updated[idx].quantity = Number(e.target.value) || 0;
                        setLineItems(updated);
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice.toString()}
                      pattern={PATTERNS.price}
                      placeholder="0.00"
                      onChange={(e) => {
                        const updated = [...lineItems];
                        updated[idx].unitPrice = Number(e.target.value) || 0;
                        setLineItems(updated);
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={item.tax.toString()}
                      pattern={PATTERNS.taxPercent}
                      placeholder="0"
                      onChange={(e) => {
                        const updated = [...lineItems];
                        updated[idx].tax = Number(e.target.value) || 0;
                        setLineItems(updated);
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {((item.unitPrice * item.quantity) * (1 + item.tax / 100)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 text-center">
            <Button variant="light" onClick={handleAddLine}>
              <Plus size={16} /> Add new line
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}