import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Briefcase,
  Calendar,
  Code,
} from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ComponentProps {
  name: string;
  title: string;
  skills: string[];
  experiences: Experience[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  aboutMe: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

export default function Component({
  name,
  title,
  skills,
  experiences,
  email,
  githubUrl,
  linkedinUrl,
  aboutMe,
}: ComponentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white shadow-md p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">{name}</span>
          <div className="space-x-4">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
            <a href="#skills" className="hover:text-blue-600">
              Skills
            </a>
            <a href="#experience" className="hover:text-blue-600">
              Experience
            </a>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto text-center">
          <User className="mx-auto h-24 w-24 text-gray-700 mb-4" />
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-xl mb-8">{title}</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Download CV</Button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">About Me</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">{aboutMe.paragraph1}</p>
            <p className="text-lg text-gray-700 mb-6">{aboutMe.paragraph2}</p>
            <p className="text-lg text-gray-700">{aboutMe.paragraph3}</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-lg py-2 px-4 bg-blue-100 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Professional Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <Card key={index} className="relative">
                <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-gray-200"></div>
                <CardContent className="p-6 ml-12">
                  <div className="absolute top-6 left-4 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  <h3 className="text-xl font-semibold flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                    {exp.title} at {exp.company}
                  </h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    {exp.period}
                  </p>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Contact Me</h2>
          <div className="flex justify-center space-x-6">
            <a
              href={`mailto:${email}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Mail className="h-8 w-8" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Github className="h-8 w-8" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-8 w-8" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
