"use client";

import { useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutMe from "./components/about";
import Personal from "./components/personal";
import SocialLinks from "./components/social_links";
import ExperienceAndSkills from "./components/Experience_Skill";
import useFormHandler from "./components/stateHandler";
import Cv from "./components/cv";

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
];

export default function UserInput() {
  const {
    formData,
    handleAboutMe,
    handlePersonalInfo,
    handleExperienceChange,
    handleSkillsChange,
    handleSocialLinks,
    addSocialLinks,
    removeSocialLinks,
    handleCvFileChange,
    handleCvUpload,
  } = useFormHandler();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    if (currentStep === steps.length - 1) {
      console.log(formData);
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
      default:
        return {};
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
          <Button onClick={handleNext} className="w-full sm:w-auto">
            {currentStep === steps.length - 1 ? "Submit" : "Next"}{" "}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
