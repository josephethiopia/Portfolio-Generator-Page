import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, Upload, AlertCircle } from "lucide-react";
import { validateFileSize, MAX_CV_SIZE_BYTES, formatFileSize, MAX_CV_SIZE_MB } from "@/app/utils/fileUpload";

interface CvProps {
  handleCvFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCvUpload: () => void;
  formData: {
    cv: {
      fileName: string;
    };
  };
}

export default function Cv({ handleCvFileChange, handleCvUpload, formData }: CvProps) {
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError("Please upload only PDF files");
        return;
      }

      // Validate file size
      if (!validateFileSize(file, MAX_CV_SIZE_BYTES)) {
        setError(`File size exceeds ${MAX_CV_SIZE_MB}MB limit. Current size: ${formatFileSize(file.size)}`);
        return;
      }

      setError("");
      handleCvFileChange(e);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload CV</CardTitle>
        <CardDescription>
          Upload your CV in PDF format (max {MAX_CV_SIZE_MB}MB)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cv-upload">Select CV</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                id="cv-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {formData.cv.fileName && !error && (
                <Button variant="outline" size="sm" className="ml-2">
                  <FileIcon className="mr-2 h-4 w-4" />
                  {formData.cv.fileName}
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleCvUpload}
            disabled={!formData.cv.fileName || !!error}
            className="w-full"
          >
            Upload CV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
