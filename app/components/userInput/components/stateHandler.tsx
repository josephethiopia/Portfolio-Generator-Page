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
    social_links: [{ link: "", platform: "" }],
    experience: "",
    skills: "",
    cv: {
      file: null as File | null,
      fileName: "",
    },
  });

  const handleAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      about_me: e.target.value,
    });
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      experience: e.target.value,
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      skills: e.target.value,
    });
  };

  const handlePersonalInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      personal_info: {
        ...formData.personal_info,
        [field]: e.target.value,
      },
    });
  };

  const handleSocialLinks = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "platform" | "link"
  ) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks[index][field] = e.target.value;
    setFormData({ ...formData, social_links: updatedLinks });
  };

  const addSocialLinks = () => {
    setFormData({
      ...formData,
      social_links: [...formData.social_links, { link: "", platform: "" }],
    });
  };

  const removeSocialLinks = (index: number) => {
    const updatedLinks = [...formData.social_links];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, social_links: updatedLinks });
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: {
          file: e.target.files[0],
          fileName: e.target.files[0].name,
        },
      });
    }
  };

  const handleCvUpload = () => {
    if (formData.cv.file) {
      console.log("Uploading file:", formData.cv.file);
      alert(`File "${formData.cv.fileName}" uploaded successfully!`);
      // Here you would typically send the file to your server
    } else {
      alert("Please select a file first");
    }
  };

  return {
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
  };
};

export default useFormHandler;
