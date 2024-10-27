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
import { Progress } from "@/components/ui/progress";
import { FileIcon, CheckCircle2, Upload } from "lucide-react";

interface CvProps {
  handleCvFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCvUpload: () => Promise<void>;
  formData: {
    cv: {
      fileName: string;
    };
  };
}

export default function Cv({
  handleCvFileChange,
  handleCvUpload,
  formData,
}: CvProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      handleCvFileChange(e);
    }
  };

  const simulateUpload = async () => {
    setUploadStatus("uploading");
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    await handleCvUpload();
    setUploadStatus("success");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload CV</CardTitle>
        <CardDescription>
          Upload your CV in PDF format. This will be used to showcase your
          qualifications.
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
                Browse...
              </Button>
              <input
                ref={fileInputRef}
                id="cv-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {formData.cv.fileName && (
                <Button variant="outline" size="sm" className="ml-2">
                  <FileIcon className="mr-2 h-4 w-4" />
                  {formData.cv.fileName}
                </Button>
              )}
            </div>
          </div>

          {uploadStatus === "uploading" && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Success
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your CV has been successfully uploaded.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={simulateUpload}
            disabled={
              !formData.cv.fileName ||
              uploadStatus === "uploading" ||
              uploadStatus === "success"
            }
            className="w-full"
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload CV"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
