import React, { useState, FC } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Header } from './_components/header';
import { TabNavigation } from './_components/TabNavigation';
import { InvoiceList } from './_components/InvoiceList';
import { ImportActions } from './_components/ImportActions';
import { StatsSection } from './_components/StatsSection';
import { Files } from '@phosphor-icons/react';








// Invoice Status Badge Component






// Empty State Component
const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center py-12 gap-4">
    <Files  className="w-16 h-16 text-primary " />
    <div className="text-center">
      <p className="text-lg font-semibold text-primary">New 4 Invoice</p>
      <p className="text-sm text-default-500 mt-2">
        New invoices have been synced and loaded from the email
      </p>
    </div>
    <p className="text-xs text-default-400 mt-4">
      Last Sync on October 1, 2023, at 3:00 PM
    </p>
  </div>
);

// Import Actions Component

// Header Component


// Stats Section Component


// Main Page Component
const DashboardPage: FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('manually');

  const handleTabChange = (key: React.Key): void => {
    setSelectedTab(key as string);
  };

  return (
    <div className="w-full p-8 bg-default-50 ">
      <div className=" ">
        <Header />
        <StatsSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Invoice List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-col gap-4 border-b">
              </CardHeader>
              <CardBody className="gap-4">
                <InvoiceList />
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Import Actions */}
          
          <div className="flex flex-col gap-6">
                            <TabNavigation selected={selectedTab} onSelectionChange={handleTabChange} />

            <Card>
           
              <CardBody className="gap-4">
                <ImportActions />
                <EmptyState />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;