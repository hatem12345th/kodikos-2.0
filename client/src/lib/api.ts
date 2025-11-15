import { api } from "./axios";

// Google login
export const googleLogin = () => api.get("/Auth/google-login");

// Google callback with code
export const googleCallback = (code: string) =>
  api.get("/Auth/google-callback", { params: { code } });

// Get user status
export const getUserStatus = (userId: string) =>
  api.get(`/Auth/status/${userId}`);

// Get all users
export const getUsers = () => api.get("/Auth/users");

// Logout user
export const logoutUser = (userId: number) =>
  api.post(`/Auth/logout/${userId}`);

// Download auth log
export const downloadLog = () =>
  api.get("/Auth/download-log", { responseType: "blob" });

/* ---------------------- INVOICE APIs ---------------------- */

// Process uploaded invoice file
// export const processInvoiceFile = (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return api.post("/Invoice/process", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//     responseType: "blob", // if the response is a file
//   });
// };

// Manual add invoice to Excel
export interface InvoiceItem {
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
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

export const manualAddInvoice = (data: InvoiceData) =>
  api.post("/Invoice/manual-add-to-excel", data);