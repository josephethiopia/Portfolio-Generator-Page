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
    experience_skills: {
      experience: "",
      skills: "",
    },
  });
  const handleAboutMe = (e: any) => {
    setFormData({
      ...formData,
      about_me: e.target.value,
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
  };
};

export default useFormHandler;
