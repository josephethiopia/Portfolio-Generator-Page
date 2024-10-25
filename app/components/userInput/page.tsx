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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutMe from "./components/about";
import Personal from "./components/personal";
import SocialLinks from "./components/social_links";
import ExperienceAndSkills from "./components/Experience_Skill";
import useFormHandler from "./components/stateHandler";

const steps = [
  { id: "about", title: "About Me", component: AboutMe },
  { id: "personal", title: "Personal Info", component: Personal },
  { id: "social", title: "Social Links", component: SocialLinks },
  {
    id: "experience",
    title: "Experience and Skills",
    component: ExperienceAndSkills,
  },
];

export default function UserInput() {
  const {
    formData,
    handleAboutMe,
    handlePersonalInfo,
    handleExperience,
    handleSkills,
  } = useFormHandler();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;

  const getComponentProps = (stepId: string) => {
    switch (stepId) {
      case "about":
        return { handleAboutMe };
      case "personal":
        return { handlePersonalInfo };
      case "social":
        return {};
      case "experience":
        return { handleExperience, handleSkills }; // Add props for these components when needed
      default:
        return {};
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={steps[currentStep].id} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {steps.map((step, index) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                disabled={index > currentStep}
                onClick={() => setCurrentStep(index)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {step.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-8">
            <TabsContent value={steps[currentStep].id} className="mt-0">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  {...(getComponentProps(steps[currentStep].id) as any)}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}{" "}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
