import React, { useState, FC } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { Header } from './_components/header';
import { TabNavigation } from './_components/TabNavigation';
import { InvoiceList } from './_components/InvoiceList';
import { StatsSection } from './_components/StatsSection';
import { Files } from '@phosphor-icons/react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

// Progress Overlay Component
interface ProgressOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

const ProgressOverlay: FC<ProgressOverlayProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleComplete = () => {
    setProgress(100);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center max-w-sm mx-4">
        <div className="mb-8 flex justify-center">
          <div className="relative w-20 h-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              color="#3B82F6"
            >
              <path d="M16 4h24v20h12v36H16z" />
              <path d="M40 4v20h12" />
              <line x1="20" y1="28" x2="44" y2="28" />
              <line x1="20" y1="36" x2="44" y2="36" />
              <line x1="20" y1="44" x2="40" y2="44" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-white text-lg font-semibold mb-6">
          Extracting Data from Invoice ...
        </h2>

        <div className="mb-4">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full  from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-8">{Math.round(progress)}% Complete</p>

        {progress < 100 && (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Simulate Complete
          </button>
        )}
      </div>
    </div>
  );
};

interface EmptyStateProps {
  selectedTab: string;
  onUploadClick: () => void;
  onFilesSelected: (files: FileList) => void;
}

export const EmptyState: FC<EmptyStateProps> = ({ selectedTab, onUploadClick, onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
    }
    
  };
  

  return (
    <div 
      className={`flex flex-col items-center justify-center py-12 gap-4 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-primary bg-primary/10' : 'border-default-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Files className="w-16 h-16 text-primary" />
      <div className="text-center">
        {selectedTab === "manually" ? (
          <>
            <p className="text-lg font-semibold text-primary">Upload Your Invoice</p>
            <p className="text-sm text-default-500 mt-2 mb-4">Drag and drop or click to select</p>
            <div className="flex gap-2 justify-center">
              <Button color="primary" onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
              <Button color="primary" variant="bordered" onClick={onUploadClick}>
                Upload
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.xlsx,.xls,.csv"
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-primary">New 4 Invoice</p>
            <p className="text-sm text-default-500 mt-2">
              New invoices have been synced and loaded from the email
            </p>
          </>
        )}
      </div>
      <p className="text-xs text-default-400 mt-4">
        Last Sync on October 1, 2023, at 3:00 PM
      </p>
    </div>
  );
};

const DashboardPage: FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('manually');
  const [showProgress, setShowProgress] = useState(false);

  const uploadInvoices = async (files: FileList) => {
    if (files.length === 0) return;
    setShowProgress(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/api/Invoice/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Invoice processed:", response.data);
      }

      setTimeout(() => setShowProgress(false), 1000);
    } catch (error: any) {
      console.error("Error processing invoice:", error);
      setShowProgress(false);

      toast.error(
        error.response?.data?.message ||
        "Failed to process invoice. Please try again."
      );
    }
  };

  return (
    <div className="w-full p-8 bg-default-50">
      <ProgressOverlay
        isVisible={showProgress}
        onComplete={() => setShowProgress(false)}
      />

      <Header />
      <StatsSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-1">
          <Card>
            <CardBody>
              <InvoiceList />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <TabNavigation
            selected={selectedTab}
            onSelectionChange={setSelectedTab}
          />

          <Card>
            <CardBody>
              <EmptyState
                selectedTab={selectedTab}
                onUploadClick={() => setShowProgress(true)}
                onFilesSelected={uploadInvoices}   // ⭐ REAL UPLOAD CALL HERE
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};



export default DashboardPage;