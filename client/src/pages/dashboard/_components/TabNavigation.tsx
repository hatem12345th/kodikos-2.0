import { Tabs, Tab } from "@heroui/react";
import { FC } from "react";

interface TabNavigationProps {
  selected: string;
  onSelectionChange: (key: string) => void; // callback to update selection
}

export const TabNavigation: FC<TabNavigationProps> = ({ selected, onSelectionChange }) => (
  <div className="bg-default-100 min-w-40 max-w-70 rounded-xl p-2">
    <Tabs
      aria-label="Options"
      selectedKey={selected}              // control selected tab
      onSelectionChange={(key) => onSelectionChange(key.toString())} // update parent state
    >
      <Tab key="manually" title="Manually Upload">
        {/* You can render tab content here */}
      </Tab>
      <Tab key="sync-invoices" title="Sync Invoices">
        {/* You can render tab content here */}
      </Tab>
    </Tabs>
  </div>
);
