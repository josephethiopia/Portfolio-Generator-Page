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
import { FileIcon, CheckCircle2, Upload, AlertCircle } from "lucide-react";

interface ProfileImageProps {
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => Promise<void>;
  formData: {
    profileImage?: {
      fileName: string;
    };
  };
}

export default function ProfileImageUpload({
  handleImageFileChange,
  handleImageUpload,
  formData,
}: ProfileImageProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setUploadStatus("error");
        setErrorMessage("Please upload only JPG, JPEG or PNG images");
        return;
      }

      // Check file size (250KB = 250 * 1024 bytes)
      if (file.size > 250 * 1024) {
        setUploadStatus("error");
        setErrorMessage("Image size should be less than 250KB. Please compress your image or choose another one.");
        return;
      }

      handleImageFileChange(e);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const simulateUpload = async () => {
    setUploadStatus("uploading");
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    await handleImageUpload();
    setUploadStatus("success");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Upload a professional photo of yourself. This will be the main image on your portfolio.
          Only JPG, JPEG or PNG formats are accepted (max 250KB).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Select Image</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              {formData?.profileImage?.fileName && (
                <Button variant="outline" size="sm" className="ml-2">
                  <FileIcon className="mr-2 h-4 w-4" />
                  {formData.profileImage.fileName}
                </Button>
              )}
            </div>
          </div>

          {uploadStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{errorMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <p>Your profile picture has been successfully uploaded.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={simulateUpload}
            disabled={
              !formData?.profileImage?.fileName ||
              uploadStatus === "uploading" ||
              uploadStatus === "success" ||
              uploadStatus === "error"
            }
            className="w-full"
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
