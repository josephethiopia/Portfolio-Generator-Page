"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, CloudCog } from "lucide-react";
import AboutMe from "./components/about";
import Personal from "./components/personal";
import SocialLinks from "./components/social_links";
import ExperienceAndSkills from "./components/Experience_Skill";
import ProfileImageUpload from "./components/profile-img-upload";
import Cv from "./components/cv";
import useFormStore from "./components/stateHandler";
import { useRouter } from 'next/navigation';
import { convertFileToBase64, compressImage } from '@/app/utils/fileUpload';

const steps = [
  { id: "about", title: "About Me", component: AboutMe },
  { id: "personal", title: "Personal Info", component: Personal },
  { id: "social", title: "Social Links", component: SocialLinks },
  {
    id: "experience",
    title: "Experience and Skills",
    component: ExperienceAndSkills,
  },
  { id: "cv", title: "Upload your CV", component: Cv },
  { id: "profile-image", title: "Upload your Profile Image", component: ProfileImageUpload },
];

export default function UserInput() {
  const {formData, handleAboutMe, handlePersonalInfo, handleExperienceChange, handleSkillsChange, handleSocialLinks, addSocialLinks, removeSocialLinks, handleCvFileChange, handleCvUpload, processDataWithAI, formattedData, setFormattedData} = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      try {
        setIsLoading(true);
        const data = await processDataWithAI(formData);
        await setFormattedData(data);
        setIsLoading(false);
        
        router.push('/');
      } catch (error) {
        console.error("Error processing data:", error);
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  const getComponentProps = (stepId: string) => {
    switch (stepId) {
      case "about":
        return { handleAboutMe, formData };
      case "personal":
        return { handlePersonalInfo, formData };
      case "social":
        return {
          handleSocialLinks,
          addSocialLinks,
          removeSocialLinks,
          formData,
        };
      case "experience":
        return { handleExperienceChange, handleSkillsChange, formData };
      case "cv":
        return { handleCvFileChange, handleCvUpload, formData };
      case "profile-image":
        return { 
          handleImageFileChange: useFormStore.getState().handleImageFileChange, 
          handleImageUpload: useFormStore.getState().handleImageUpload,
          formData: formData 
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    if (formattedData.name) {
      console.log('formattedData updated:', formattedData);
    }
  }, [formattedData]);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
  
      // Prepare files
      let profileImageData = null;
      let cvData = null;
  
      // Handle profile image
      if (formData.profileImage?.file instanceof Blob) {
        const base64Image = await convertFileToBase64(formData.profileImage.file);
        profileImageData = await compressImage(base64Image);
      }
  
      // Handle CV
      if (formData.cv?.file instanceof Blob) {
        cvData = await convertFileToBase64(formData.cv.file);
      }
  
      // Prepare the payload
      const payload = {
        data: formData,
        name: 'developer',
        files: {
          ...(profileImageData && { profileImage: profileImageData }),
          ...(cvData && { cv: cvData })
        }
      };
  
      const response = await axios.post('http://localhost:5000/api/test', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
  
      console.log(response.data);
      setIsLoading(false);
      router.push('/');
      
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-center">
            Create Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Tabs value={steps[currentStep].id} className="w-full">
            {/* Desktop Navigation */}
            <TabsList className="hidden sm:grid w-full grid-cols-5 mb-6">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  disabled={index > currentStep}
                  onClick={() => setCurrentStep(index)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile Navigation */}
            <div className="sm:hidden mb-6">
              <Select
                value={steps[currentStep].id}
                onValueChange={(value) =>
                  setCurrentStep(steps.findIndex((step) => step.id === value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a step" />
                </SelectTrigger>
                <SelectContent>
                  {steps.map((step, index) => (
                    <SelectItem
                      key={step.id}
                      value={step.id}
                      disabled={index > currentStep}
                    >
                      {step.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 sm:mt-8">
              <TabsContent value={steps[currentStep].id} className="mt-0">
                <div className="max-h-[60vh] overflow-y-auto pr-4">
                  {CurrentStepComponent && (
                    <CurrentStepComponent
                      {...(getComponentProps(steps[currentStep].id) as any)}
                    />
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button 
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                {currentStep === steps.length - 1 ? "Submit" : "Next"}{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
