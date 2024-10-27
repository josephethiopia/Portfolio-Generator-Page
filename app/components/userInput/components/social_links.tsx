import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

interface SocialLink {
  platform: string;
  link: string;
}

interface SocialLinksProps {
  handleSocialLinks: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "platform" | "link"
  ) => void;
  addSocialLinks: () => void;
  removeSocialLinks: (index: number) => void;
  formData: {
    social_links: SocialLink[];
  };
}

export default function SocialLinks({
  handleSocialLinks,
  addSocialLinks,
  removeSocialLinks,
  formData,
}: SocialLinksProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>
          Add links to your social media profiles or personal websites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {formData.social_links.map((link: SocialLink, index: number) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 items-end"
            >
              <div className="flex-1 space-y-2">
                <Label htmlFor={`platform-${index}`}>Platform</Label>
                <Input
                  type="text"
                  id={`platform-${index}`}
                  name="platform"
                  value={link.platform}
                  onChange={(e) => handleSocialLinks(e, index, "platform")}
                  placeholder="e.g., LinkedIn, Twitter, GitHub"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`link-${index}`}>Link</Label>
                <Input
                  type="url"
                  id={`link-${index}`}
                  name="link"
                  value={link.link}
                  onChange={(e) => handleSocialLinks(e, index, "link")}
                  placeholder="https://..."
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeSocialLinks(index)}
                aria-label={`Remove ${link.platform || "social link"}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={addSocialLinks} className="mt-4" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
        </Button>
      </CardContent>
    </Card>
  );
}
