import { api } from "./axios";
import * as XLSX from "xlsx";

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
const parseExcelBlob = async (blob: Blob) => {
  return new Promise<any[]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        
        // First sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to JSON
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Keep exact headers
        const headers = ["Invoice Number", "Vendor", "Date", "Due Date", "Subtotal", "Tax", "Total", "Currency"];
        const filteredData = jsonData.map((row) => {
          const obj: any = {};
          headers.forEach((header) => {
            obj[header] = row[header] || "";
          });
          return obj;
        });

        resolve(filteredData);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(blob);
  });
};

// Download and parse
export const downloadAndReadLog = async () => {
  try {
    const response = await api.get("/Auth/download-log", { responseType: "blob" });

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Optional: trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "log.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Parse Excel content
    const data = await parseExcelBlob(blob);
    console.log(data); // array of objects
    return data;
  } catch (error) {
    console.error("Download or parsing failed", error);
  }
};

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
