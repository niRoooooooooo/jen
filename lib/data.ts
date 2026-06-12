export const siteConfig = {
  name: "Arifun Jani",
  title: "Software Engineering Student",
  description:
    "Building digital experiences through code, creativity, and continuous learning. Passionate about architecting scalable software and intuitive interfaces.",
  email: "arifunnaharjani@gmail.com",
  location: "Dhaka, Bangladesh",
  university: "Daffodil International University",
  github: "https://github.com/Jenn-w-yyyyyyy",
  linkedin: "https://www.linkedin.com/in/arifun-jenny-a66408305",
  instagram: "https://www.instagram.com/_.jenn.yyyy_/",
  facebook: "https://www.facebook.com/arifun.jenny.02",
  siteUrl: "https://arifunjani.vercel.app",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
] as const;

export const skills = [
  {
    category: "Languages",
    icon: "code",
    items: ["C++", "Java", "Python", "JavaScript"],
  },
  {
    category: "Web Dev",
    icon: "terminal",
    items: ["HTML5", "CSS3", "React", "Node.js"],
  },
  {
    category: "Tools",
    icon: "wrench",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
] as const;

export const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A bespoke digital showcase built with React and Tailwind CSS, focusing on performance and micro-interactions.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtBBcurjnHfd5cZtOoPKj_dW7FWyVODV2sU8nvzI-a1FXhtWjS1eQz3SJgxfDotk5IAn2ttqvcNp9Vhxsv_xMBSrf9V7iWwewRuz5IwZceDu33UQlQ2EU58pF7CAGy4kzv119Ql--CzNe6I9nuOMTLVFcKUdfx3b0QVLmCFBgGvB-YoM7kE-9JhKbdEtou7Sfz7wu3laZ99y9Z9v-37SEyNphDHE1ttcM8Ba2np6ngaAj3Ct4TDvPL-XQ",
    tags: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Student Management System",
    description:
      "A comprehensive Java-based application for educational institutions to manage student records and academic progress.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsXjKDES0B51OryCq8FF5tdBTq_50kspGaoSl618VeHcNbHCjNNhmCxWTCWMMHpAtdFdnoSrWU7ELq1q607fmIvfwQaGgM8e3L9nl_VAmSFGXExuMfyDj2WXsq8j1Fec97ESU1JsXg9E3xtrlgAyZOTcfRmJJdC0aBGK0jnVlYYPnZ0RZtJGmQYR8ivh5wR38VnFeltpO0N_Ee5KG-5Y0KLkesinJjYobWlQZmF6x3PMZqzV0H2SDubag",
    tags: ["Java", "MySQL", "Swing GUI"],
    liveUrl: "#",
    sourceUrl: "#",
  },
] as const;

export const achievements = [
  {
    type: "Competition",
    title: "DIU Breakout Contest",
    description:
      "Ranked among top performers in a competitive programming and problem-solving challenge.",
  },
  {
    type: "Certification",
    title: "Presentation Skills Workshop",
    description:
      "Completed an intensive program focusing on effective communication and technical presentation.",
  },
] as const;

export const careerVision = [
  {
    icon: "monitor",
    title: "Frontend Dev",
    description: "Crafting pixel-perfect, accessible user interfaces.",
  },
  {
    icon: "cpu",
    title: "Software Eng",
    description: "Solving complex architectural challenges with logic.",
  },
  {
    icon: "book-open",
    title: "Continuous Learning",
    description: "Staying at the forefront of emerging technologies.",
  },
] as const;

export const education = [
  {
    level: "University",
    tag: "Bachelor's Degree",
    degree: "Bachelor of Software Engineering",
    major: "Data Science Major",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    year: "2023 – 2027",
    metric: "CGPA: 4.00",
    extra: "Expected Graduation: July 2027",
    active: true,
  },
  {
    level: "Higher Secondary",
    tag: "HSC",
    degree: "Higher Secondary Certificate",
    major: "Science Group",
    institution: "Mirpur Cantonment Public School & College",
    location: "Dhaka, Bangladesh",
    year: "2022",
    metric: "GPA: 5.00 / 5.00",
    extra: "Passing Year: 2022",
    active: false,
  },
  {
    level: "Secondary School",
    tag: "SSC",
    degree: "Secondary School Certificate",
    major: "Science Background",
    institution: "Mirpur Cantonment Public School & College",
    location: "Dhaka, Bangladesh",
    year: "2020",
    metric: "GPA: 5.00 / 5.00",
    extra: "Passing Year: 2020",
    active: false,
  },
] as const;
