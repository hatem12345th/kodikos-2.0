import { useState } from "react";
import { CreateInvoice, OutgoingInvoices,  } from "@/pages";
import { useSearchParams } from "react-router-dom";

 const OutgoingInvoicesLayout = () => {
 const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "";

  const handleTabChange = (newTab: "tabA" | "tabB") => {
    setSearchParams({ tab: newTab });
  };
  return (
    <div className="p-4">

      {/* Tabs */}
    

      {/* Tab content */}
      <div>
        {(tab  === "" || tab !=="new" ) && <OutgoingInvoices />}
        {tab  === "new" && <CreateInvoice />}
      </div>
    </div>
  );
};
export default OutgoingInvoicesLayout
