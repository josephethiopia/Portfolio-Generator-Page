import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AboutMeProps {
  handleAboutMe: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AboutMe({ handleAboutMe }: AboutMeProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>About Me</CardTitle>
        <CardDescription>
          Tell us about yourself and what makes you unique. This information
          will be displayed on your portfolio page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="about_me">Your Bio</Label>
          <Textarea
            id="about_me"
            name="about_me"
            placeholder="I'm a passionate developer with experience in..."
            className="min-h-[200px]"
            onChange={handleAboutMe}
          />
          <p className="text-sm text-muted-foreground">
            Please include relevant information such as your background, skills,
            interests, and career goals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
