"use client";
import * as React from "react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { JSX } from "react/jsx-runtime";

type FileItem = {
  id: number;
  fileName: string;
  companyName: string;
  fileType: string;
  uploadStatus: "Uploaded" | "Processing" | "Failed" | string;
  fileSize: string;
  uploadedBy?: string;
  category: string;
  inScope?: "Yes" | "No" | string;
  uploadDate?: string;
};

const mockFileData: FileItem[] = [
  {
    id: 1,
    fileName: "DORA_Assessment_Report.pdf",
    companyName: "ABC Ltd",
    fileType: "PDF Document",
    uploadStatus: "Uploaded",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "john.doe@company.com",
    category: "Assessment",
    inScope: "Yes",
  },
  {
    id: 2,
    fileName: "Remediation_Plan_v2.xlsx",
    companyName: "TechCorp",
    fileType: "Excel Spreadsheet",
    uploadStatus: "Processing",
    fileSize: "1.2 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "jane.smith@company.com",
    category: "Planning",
    inScope: "Yes",
  },
  {
    id: 3,
    fileName: "Compliance_Training.mp4",
    companyName: "SecureBank",
    fileType: "Video",
    uploadStatus: "Uploaded",
    fileSize: "15.6 MB",
    uploadDate: "2024-01-12",
    uploadedBy: "sarah.johnson@company.com",
    category: "Training",
    inScope: "No",
  },
  {
    id: 4,
    fileName: "Audit_Documents.zip",
    companyName: "FinanceGroup",
    fileType: "Archive",
    uploadStatus: "Failed",
    fileSize: "5.4 MB",
    uploadDate: "2024-01-11",
    uploadedBy: "david.brown@company.com",
    category: "Audit",
    inScope: "Yes",
  },
  {
    id: 5,
    fileName: "Policy_Framework.docx",
    companyName: "GovCorp",
    fileType: "Word Document",
    uploadStatus: "Uploaded",
    fileSize: "890 KB",
    uploadDate: "2024-01-10",
    uploadedBy: "alice.green@company.com",
    category: "Policy",
    inScope: "Yes",
  },
  {
    id: 6,
    fileName: "Risk_Assessment.pdf",
    companyName: "RiskManage Ltd",
    fileType: "PDF Document",
    uploadStatus: "Uploaded",
    fileSize: "3.2 MB",
    uploadDate: "2024-01-09",
    uploadedBy: "bob.white@company.com",
    category: "Risk",
    inScope: "Yes",
  },
];

function getStatusBadge(status: string, inScope?: string) {
  if (inScope === "Yes") {
    return (
      <Badge className="bg-blue-500 hover:bg-blue-600 text-white" aria-label="In scope">
        Yes
      </Badge>
    );
  }
  if (inScope === "No") {
    return <Badge variant="secondary">No</Badge>;
  }

  const variants: Record<string, "default" | "secondary" | "destructive"> = {
    Uploaded: "default",
    Processing: "secondary",
    Failed: "destructive",
  };

  const variant = variants[status] ?? "default";
  return <Badge variant={variant}>{status}</Badge>;
}

export default function FileTables(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [files] = useState<FileItem[]>(mockFileData);

  const filteredFiles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (file) =>
        file.fileName.toLowerCase().includes(q) ||
        file.companyName.toLowerCase().includes(q) ||
        file.category.toLowerCase().includes(q)
    );
  }, [files, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-semibold">File Management System</h1>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center space-x-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </div>

            {/* On small screens, show a compact upload button */}
            <div className="flex sm:hidden">
              <Button size="sm" className="px-2">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search / toolbar */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Find a file, company or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 w-full"
                aria-label="Search files"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:inline">{filteredFiles.length} records</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {/* Desktop / large table (md+) */}
        <div className="hidden md:block">
          <div className="min-w-full overflow-x-auto bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-50 border-b">
                <TableRow>
                  <TableHead className="w-12 text-center font-medium text-gray-700 border-r">#</TableHead>
                  <TableHead className="min-w-[200px] font-medium text-gray-700 border-r">File Name</TableHead>
                  <TableHead className="min-w-[140px] font-medium text-gray-700 border-r">Company</TableHead>
                  <TableHead className="min-w-[140px] font-medium text-gray-700 border-r">Type</TableHead>
                  <TableHead className="min-w-[120px] font-medium text-gray-700 border-r">Category</TableHead>
                  <TableHead className="min-w-[140px] font-medium text-gray-700 border-r">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file, index) => (
                  <TableRow key={file.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="text-center font-medium text-gray-500 border-r bg-gray-50/50">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium border-r">
                      <div className="flex items-center space-x-2">
                        <span className="truncate">{file.fileName}</span>
                      </div>
                      {file.uploadedBy && <div className="text-xs text-gray-500 mt-1">{file.uploadedBy}</div>}
                    </TableCell>
                    <TableCell className="border-r">{file.companyName}</TableCell>
                    <TableCell className="border-r text-gray-600">{file.fileType}</TableCell>
                    <TableCell className="border-r text-gray-600">{file.category}</TableCell>
                    <TableCell className="border-r">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(file.uploadStatus, file.inScope)}
                        <span className="text-sm text-gray-500">{file.fileSize}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile / stacked cards (md-) */}
        <div className="space-y-3 md:hidden">
          {filteredFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium truncate">{file.fileName}</h3>
                    <span className="text-xs text-gray-500 ml-2">{file.fileSize}</span>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{file.companyName}</span>
                      <span>•</span>
                      <span className="truncate">{file.category}</span>
                    </div>
                    {file.uploadedBy && <div className="mt-1">{file.uploadedBy}</div>}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div>{getStatusBadge(file.uploadStatus, file.inScope)}</div>
                  <div className="mt-4">
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="mt-6 flex items-center justify-center text-gray-500">
            No files found matching your search criteria.
          </div>
        )}
      </div>

      {/* Footer (desktop & mobile) */}
      <div className="bg-white border-t px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-sm text-gray-600">{filteredFiles.length} records</span>
        </div>
      </div>
    </div>
  );
}
