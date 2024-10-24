import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExperienceAndSkillsProps {
  handleSkillsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleExperienceChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ExperienceAndSkills({
  handleSkillsChange,
  handleExperienceChange,
}: ExperienceAndSkillsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Experience and Skills</CardTitle>
        <CardDescription>
          Tell us about your professional experience and the skills you've
          acquired.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="List your key skills, technologies you're proficient in, and any relevant certifications..."
                className="min-h-[200px]"
                onChange={handleSkillsChange}
              />
              <p className="text-sm text-muted-foreground">
                Include both technical and soft skills that are relevant to your
                field.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="experience">
            <div className="space-y-2">
              <Label htmlFor="experience">Your Work Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                placeholder="Describe your work history, including job titles, companies, dates, and key responsibilities..."
                className="min-h-[200px]"
                onChange={handleExperienceChange}
              />
              <p className="text-sm text-muted-foreground">
                Focus on experiences that are most relevant to your career goals
                and the position you're seeking.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
