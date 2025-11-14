import { Tabs, Tab, Card } from "@heroui/react";
import { FC } from "react";

interface TabNavigationProps {
  selected: string;
  onSelectionChange: (key: React.Key) => void;
}

export const TabNavigation: FC<TabNavigationProps> = ({ selected, onSelectionChange }) => (
  <div className="bg-default-100 w-60  rounded-xl p-1">
   <Tabs aria-label="Options">
        <Tab key="Manully Upload " title="Manully Upload ">
          
        </Tab>
        <Tab key="Sync Invoices" title="Sync Invoices">
        
        </Tab>
        
      </Tabs>
  </div>
);
