import Component from "./pp";

export default function Page() {
  const portfolioProps = {
    name: "Jane Doe",
    title: "Full Stack Developer",
    phone: "+1234567890",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Django",
      "SQL",
      "GraphQL",
      "Docker",
      "AWS",
    ],
    experiences: [
      {
        title: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        period: "Jan 2020 - Present",
        description:
          "Lead development of scalable web applications using React, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers.",
      },
      {
        title: "Full Stack Developer",
        company: "Digital Solutions Ltd.",
        period: "Mar 2017 - Dec 2019",
        description:
          "Developed and maintained multiple client websites. Worked on both front-end and back-end using JavaScript, Python, and various databases.",
      },
      {
        title: "Junior Web Developer",
        company: "StartUp Nexus",
        period: "Jun 2015 - Feb 2017",
        description:
          "Assisted in building responsive websites and web applications. Gained experience in agile methodologies and version control systems.",
      },
    ],
    email: "jane.doe@example.com",
    githubUrl: "https://github.com/janedoe",
    linkedinUrl: "https://www.linkedin.com/in/janedoe",
    aboutMe: {
      paragraph1:
        "I'm a passionate Full Stack Developer with over 8 years of experience in creating robust and scalable web applications. My journey in tech started with a curiosity for how things work on the internet, which led me to dive deep into both front-end and back-end technologies.",
      paragraph2:
        "Throughout my career, I've had the opportunity to work on diverse projects, from small business websites to large-scale enterprise applications. I thrive in collaborative environments and enjoy tackling complex problems with innovative solutions.",
      paragraph3:
        "When I'm not coding, you can find me contributing to open-source projects, mentoring aspiring developers, or exploring the latest trends in web development. I'm always excited to take on new challenges and continue growing as a developer.",
    },
  };
  return <Component {...portfolioProps} />;
}
