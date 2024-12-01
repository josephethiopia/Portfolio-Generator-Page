import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
dotenv.config();
const genAI = new GoogleGenerativeAI("AIzaSyBjyRKjqalSGwA1qvCALcejAx_nYXo9rYk");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

interface FormState {
  formattedData: {
    name: string;
    occupation: string;
    location: string;
    phone: string;
    email: string;
    about: string;
    skills: string[];
    experience: any[];
    social_links: any[];
  };
  formData: {
    about_me: string;
    personal_info: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      occupation: string;
      location: string;
      additional_information: string;
    };
    social_links: { link: string; platform: string; }[];
    experience: string;
    skills: string;
    cv: {
      file: File | null;
      fileName: string;
    };
    profileImage: {
      file: File | null;
      fileName: string;
    };
  };
  setFormattedData: (data: any) => void;
  setFormData: (data: any) => void;
  handleAboutMe: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleExperienceChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSkillsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePersonalInfo: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleSocialLinks: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: "platform" | "link") => void;
  addSocialLinks: () => void;
  removeSocialLinks: (index: number) => void;
  handleCvFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCvUpload: () => void;
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => Promise<void>;
  processDataWithAI: (data: any) => Promise<any>;
}

const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formattedData: {
        name: "",
        occupation: "",
        location: "",
        phone: "",
        email: "",
        about: "",
        skills: [],
        experience: [],
        social_links: []
      },
      formData: {
        about_me: "",
        personal_info: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          occupation: "",
          location: "",
          additional_information: "",
        },
        social_links: [{ link: "", platform: "" }],
        experience: "",
        skills: "",
        cv: {
          file: null,
          fileName: "",
        },
        profileImage: {
          file: null,
          fileName: "",
        },
      },
      setFormattedData: (data) => set({ formattedData: data }),
      setFormData: (data) => set({ formData: data }),
      handleAboutMe: (e) => set((state) => ({
        formData: {
          ...state.formData,
          about_me: e.target.value,
        }
      })),
      handleExperienceChange: (e) => set((state) => ({
        formData: {
          ...state.formData,
          experience: e.target.value,
        }
      })),
      handleSkillsChange: (e) => set((state) => ({
        formData: {
          ...state.formData,
          skills: e.target.value,
        }
      })),
      handlePersonalInfo: (e, field) => set((state) => ({
        formData: {
          ...state.formData,
          personal_info: {
            ...state.formData.personal_info,
            [field]: e.target.value,
          },
        }
      })),
      handleSocialLinks: (e, index, field) => set((state) => {
        const updatedLinks = [...state.formData.social_links];
        updatedLinks[index][field] = e.target.value;
        return {
          formData: {
            ...state.formData,
            social_links: updatedLinks
          }
        };
      }),
      addSocialLinks: () => set((state) => ({
        formData: {
          ...state.formData,
          social_links: [...state.formData.social_links, { link: "", platform: "" }],
        }
      })),
      removeSocialLinks: (index) => set((state) => {
        const updatedLinks = [...state.formData.social_links];
        updatedLinks.splice(index, 1);
        return {
          formData: {
            ...state.formData,
            social_links: updatedLinks
          }
        };
      }),
      handleCvFileChange: (e) => set((state) => {
        if (e.target.files && e.target.files[0]) {
          return {
            formData: {
              ...state.formData,
              cv: {
                file: e.target.files[0],
                fileName: e.target.files[0].name,
              },
            }
          };
        }
        return state;
      }),
      handleCvUpload: () => set((state) => {
        if (state.formData.cv.file) {
          console.log("Uploading file:", state.formData.cv.file);
          alert(`File "${state.formData.cv.fileName}" uploaded successfully!`);
        } else {
          alert("Please select a file first");
        }
        return state;
      }),
      handleImageFileChange: (e) => set((state) => {
        if (e.target.files && e.target.files[0]) {
          return {
            formData: {
              ...state.formData,
              profileImage: {
                file: e.target.files[0],
                fileName: e.target.files[0].name,
              },
            }
          };
        }
        return state;
      }),
      handleImageUpload: async () => set((state) => {
        if (state.formData.profileImage.file) {
          console.log("Uploading file:", state.formData.profileImage.file);
          alert(`File "${state.formData.profileImage.fileName}" uploaded successfully!`);
        } else {
          alert("Please select a file first");
        }
        return state;
      }),
      processDataWithAI: async (data) => {
        try {
          const prompt = `Format the following JSON data for a portfolio page using this schema:

Schema:
{
  "name": string,
  "occupation": string,
  "location": string,
  "phone": string,
  "email": string,
  "about": string,
  "skills": Array<string>,
  "experience": Array<{
    "title": string,
    "company": string,
    "date": string,
    "description": string
  }>,
  "social_links": Array<{
    "platform": string,
    "link": string
  }>
}

Data to format:
${JSON.stringify(data)}

Instructions:
- Combine the personal info (first and last names) into a full name.
- List each skill as a separate string in an array.
- Format the "experience" into an array of objects, with at least one placeholder entry if specific job history details are missing (e.g., {"title": "Accountant", "company": "", "date": "over 10 years", "description": "Over 10 years of accounting experience with technological expertise"}).
- Add each social link as an object with 'platform' and 'link'.
- Ignore the "cv" file data for this output.
-Add some relevant information for the user to make him appear more professional. (but always be based on the user's input)

Return the formatted JSON object with correct field names and structure. Here is an example output:

{
  "name": "Yoseph Ashenafi",
  "occupation": "Accountant",
  "location": "Jimma, Ethiopia",
  "phone": "0941889660",
  "email": "joash.000111@gmail.com",
  "about": "I'm an accountant graduated from Addis Ababa University with great grades and 10 years of professional experience. I specialize in data analysis and technological integrations for the field of accounting.",
  "skills": ["problem solving", "tech", "communication"],
  "experience": [
    {
      "title": "Accountant",
      "company": "",
      "date": "over 10 years",
      "description": "Over 10 years of accounting experience with technological expertise."
    }
  ],
  "social_links": [
    {
      "platform": "facebook",
      "link": "https://facebook.com/@joe"
    }
  ]
}`;
          const result = await model.generateContent(prompt);
          const responseText = result.response.text();

          const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (!jsonMatch) {
            throw new Error("Could not extract JSON from response");
          }
          const formattedData = JSON.parse(jsonMatch[1]);

          if (!formattedData.name || !formattedData.occupation) {
            throw new Error("Formatted data is missing required fields");
          }

          set({ formattedData });
          return formattedData;
        } catch (error) {
          console.error("Error processing data with AI:", error);
          throw error;
        }
      }
    }),
    {
      name: 'form-storage',
    }
  )
);

export default useFormStore;
