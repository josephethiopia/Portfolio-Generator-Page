import { useState } from "react";

const useFormHandler = () => {
  const [formData, setFormData] = useState({
    about_me: "",
    personal_info: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      occupation: "",
      location: "",
    },
    social_links: {
      linkedin: "",
      github: "",
      twitter: "",
    },
    experience: "",
    skills: "",
  });
  const handleAboutMe = (e: any) => {
    setFormData({
      ...formData,
      about_me: e.target.value,
    });
  };
  const handleExperience = (e: any) => {
    setFormData({
      ...formData,
      experience: e.target.value,
    });
  };
  const handleSkills = (e: any) => {
    setFormData({
      ...formData,
      skills: e.target.value,
    });
  };

  const handlePersonalInfo = (e: any, field: string) => {
    setFormData({
      ...formData,
      personal_info: {
        ...formData.personal_info,
        [field]: e.target.value,
      },
    });
  };

  return {
    formData,
    handleAboutMe,
    handlePersonalInfo,
    handleExperience,
    handleSkills,
  };
};

export default useFormHandler;
