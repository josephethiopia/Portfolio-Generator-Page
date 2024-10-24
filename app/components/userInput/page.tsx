"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const formSchema = z.object({
  personalInfo: z.object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters." }),
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    occupation: z
      .string()
      .min(2, { message: "Occupation must be at least 2 characters." }),
    gender: z.string().optional(),
  }),
  aboutMe: z.object({
    bio: z
      .string()
      .min(50, { message: "Bio must be at least 50 characters." })
      .max(500, { message: "Bio must not exceed 500 characters." }),
  }),
  experienceAndSkills: z.object({
    experiences: z.array(
      z.object({
        jobTitle: z.string().min(2, { message: "Job title is required." }),
        company: z.string().min(2, { message: "Company name is required." }),
        startDate: z.string().min(2, { message: "Start date is required." }),
        endDate: z.string().min(2, { message: "End date is required." }),
        description: z
          .string()
          .min(10, { message: "Please provide a brief description." }),
      })
    ),
    skills: z
      .array(z.string())
      .min(1, { message: "Please add at least one skill." }),
  }),
  socialLinks: z.object({
    linkedin: z
      .string()
      .url({ message: "Please enter a valid LinkedIn URL." })
      .optional()
      .or(z.literal("")),
    github: z
      .string()
      .url({ message: "Please enter a valid GitHub URL." })
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .url({ message: "Please enter a valid website URL." })
      .optional()
      .or(z.literal("")),
    other: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PortfolioForm() {
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        phoneNumber: "",
        email: "",
        occupation: "",
        gender: "",
      },
      aboutMe: { bio: "" },
      experienceAndSkills: {
        experiences: [
          {
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
        skills: [""],
      },
      socialLinks: { linkedin: "", github: "", website: "", other: "" },
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experienceAndSkills.experiences",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "experienceAndSkills.skills" as "experienceAndSkills.experiences",
  });

  const steps = [
    "Personal Info",
    "About Me",
    "Experience & Skills",
    "Social Links",
  ];

  const onSubmit = (data: FormValues) => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowSummary(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="personalInfo.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="aboutMe.bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short bio about yourself..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe your background, interests, or professional
                    goals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Experience</h3>
              {experienceFields.map((field, index) => (
                <Card key={field.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Experience {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name={`experienceAndSkills.experiences.${index}.jobTitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experienceAndSkills.experiences.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`experienceAndSkills.experiences.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`experienceAndSkills.experiences.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`experienceAndSkills.experiences.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="ml-auto"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  appendExperience({
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                Add Experience
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Skills</h3>
              {skillFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <FormField
                    control={form.control}
                    name={`experienceAndSkills.skills.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input {...field} placeholder="Enter a skill" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                // onClick={() => appendSkill('')}
              >
                Add Skill
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="socialLinks.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.linkedin.com/in/johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialLinks.github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialLinks.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.johndoe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialLinks.other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://other-social-profile.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderSummary = () => {
    const { personalInfo, aboutMe, experienceAndSkills, socialLinks } =
      form.getValues();
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Full Name</dt>
                <dd>{personalInfo.fullName}</dd>
              </div>
              <div>
                <dt className="font-medium">Phone Number</dt>
                <dd>{personalInfo.phoneNumber}</dd>
              </div>
              <div>
                <dt className="font-medium">Email</dt>
                <dd>{personalInfo.email}</dd>
              </div>
              <div>
                <dt className="font-medium">Occupation</dt>
                <dd>{personalInfo.occupation}</dd>
              </div>
              {personalInfo.gender && (
                <div>
                  <dt className="font-medium">Gender</dt>
                  <dd>{personalInfo.gender}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{aboutMe.bio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Experience & Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium mb-2">Experience</h3>
            {experienceAndSkills.experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-medium">
                  {exp.jobTitle} at {exp.company}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
            <h3 className="text-lg font-medium mt-4 mb-2">Skills</h3>
            <ul className="list-disc list-inside">
              {experienceAndSkills.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              {Object.entries(socialLinks).map(
                ([key, value]) =>
                  value && (
                    <div key={key}>
                      <dt className="font-medium capitalize">{key}</dt>
                      <dd className="truncate">
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {value}
                        </a>
                      </dd>
                    </div>
                  )
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    );
  };

  const handleSubmit = (data: FormValues) => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Portfolio</CardTitle>
          <CardDescription>
            Fill in the details to generate your professional portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {!showSummary && (
                <>
                  <div className="mb-8">
                    <Tabs value={steps[step]} className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        {steps.map((stepName, index) => (
                          <TabsTrigger
                            key={stepName}
                            value={stepName}
                            disabled={index > step}
                            onClick={() => setStep(index)}
                          >
                            {stepName}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  {renderStep()}
                </>
              )}
              {showSummary && renderSummary()}
              <div className="flex justify-between">
                {!showSummary && step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                {showSummary && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSummary(false)}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                {!showSummary && (
                  <Button type="submit">
                    {step < steps.length - 1 ? (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "Review"
                    )}
                  </Button>
                )}
                {showSummary && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (form.formState.isValid) {
                        console.log("Submit portfolio", form.getValues());
                      } else {
                        console.error("Form is not valid");
                      }
                    }}
                  >
                    Submit Portfolio
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
