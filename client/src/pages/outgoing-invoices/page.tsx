'use client'

import React, { useState } from 'react'
import {
  Card,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import {
  FileText,
  Clock,
  Star,
  CheckCircle,
  List,
  GridFour,
  Download,
  CaretRight,
  CaretLeft,
  DotsThreeVertical,
  Plus,
} from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { downloadLog } from '@/lib/api'

const invoices = [
  {
    id: 'INV-1001',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1002',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1003',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1004',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1005',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1006',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1007',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1008',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
  {
    id: 'INV-1009',
    customer: 'Fendi Nofel',
    invoiceDate: '23/02/2025',
    dueDate: '25/02/2025',
    amount: '4000 DA',
    status: 'Paid',
  },
]

const StatCard = ({ icon: Icon, value, label }:any) => (
  <Card className="flex flex-col gap-4 p-6 border border-default-200">
    <div className="flex items-center gap-3">
      <Icon size={24} className="text-default-500" />
      <span className="text-3xl font-bold text-foreground">{value}</span>
    </div>
    <p className="text-sm text-default-500">{label}</p>
  </Card>
)

export default function OutgoingInvoices() {
  const [page, setPage] = useState(1)
  const [viewType, setViewType] = useState('list')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set([]))
      const navigate = useNavigate();

  const itemsPerPage = 5
  const totalPages = Math.ceil(invoices.length / itemsPerPage)
  const startIdx = (page - 1) * itemsPerPage
  const paginatedInvoices = invoices.slice(startIdx, startIdx + itemsPerPage)

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="min-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Outgoing Invoice</h1>
          <Button
            color="primary"
            startContent={<Plus size={20} />}
            className="font-semibold"
            onPress={() => navigate('?tab=new')}
          >
            New Invoice
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} value="45" label="Imported Invoices" />
          <StatCard icon={Clock} value="45" label="Pending Orders" />
          <StatCard icon={Star} value="12" label="Customer Reviews" />
          <StatCard icon={CheckCircle} value="67" label="Completed Transactions" />
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              isIconOnly
              variant={viewType === 'list' ? 'flat' : 'light'}
              onClick={() => setViewType('list')}
              className="text-default-500"
            >
              <List size={20} />
            </Button>
            <Button
              isIconOnly
              variant={viewType === 'grid' ? 'flat' : 'light'}
              onClick={() => setViewType('grid')}
              className="text-default-500"
            >
              <GridFour size={20} />
            </Button>
          </div>
          <Button
            variant="flat"
            startContent={<Download size={18} />}
            className="text-default-700 font-medium"
            onClick={downloadLog}
          >
            Export to Xsl
          </Button>
        </div>

        {/* Table */}
        <Table
          color="default"
          selectionMode="multiple"
          selectedKeys={selectedRows}
          onSelectionChange={(keys) => {
            if (keys !== "all") {
              setSelectedRows(keys as Set<string>)
            }
          }}          className="mb-6"
          aria-label="Invoice table"
        >
          <TableHeader>
            <TableColumn key="invoiceNumber">Invoice Number</TableColumn>
            <TableColumn key="customerName">Customer Name</TableColumn>
            <TableColumn key="invoiceDate">Invoice Date</TableColumn>
            <TableColumn key="dueDate">Due Date</TableColumn>
            <TableColumn key="totalAmount">Total Amount</TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn key="actions" align="center">
              Actions
            </TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    color="success"
                    size="sm"
                    className="font-medium"
                  >
                    {invoice.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-default-500"
                      >
                        <DotsThreeVertical size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="view">View Details</DropdownItem>
                      <DropdownItem key="edit">Edit Invoice</DropdownItem>
                      <DropdownItem key="download">Download PDF</DropdownItem>
                      <DropdownItem key="send">Send to Customer</DropdownItem>
                      <DropdownItem key="delete" color="danger">
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer Info & Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-default-500">
            {selectedRows.size} of {itemsPerPage} row(s) selected.
          </p>
          <div className="flex gap-2">
            <Button
              isDisabled={page === 1}
              variant="bordered"
              startContent={<CaretLeft size={18} />}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              isDisabled={page === totalPages}
              variant="bordered"
              endContent={<CaretRight size={18} />}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
