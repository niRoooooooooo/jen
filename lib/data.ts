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
    items: ["Git", "GitHub", "VS Code", "Figma", "Cursor", "Claude", "ChatGPT"],
  },
] as const;

export const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A bespoke digital showcase built with React and Tailwind CSS, focusing on performance and micro-interactions.",
    image: "/projects/portfolio.jpg",
    tags: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Student Management System",
    description:
      "A comprehensive Java-based application for educational institutions to manage student records and academic progress.",
    image: "/projects/studentmanagment.jpg",
    tags: ["Java", "MySQL", "Swing GUI"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "GreenTea Hub",
    description:
      "A backend-focused web application for managing product information and user data, with a relational database system for efficient data storage, retrieval, and consistency.",
    image: "/projects/teashop.jpg",
    tags: ["Node.js", "TypeScript", "JavaScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
] as const;

export const achievements = [
  // Awards
  {
    group: "Awards",
    type: "Award",
    title: "Dean's List Award – Spring 2024",
    description: "Recognized for academic excellence by Daffodil International University.",
  },
  {
    group: "Awards",
    type: "Award",
    title: "Dean's List Award – Fall 2024",
    description: "Recognized for academic excellence by Daffodil International University.",
  },
  // Competitions & Workshops
  {
    group: "Competitions & Workshops",
    type: "Competition",
    title: "CodeTrap Programming Contest – Spring 2025",
    description: "Competed in the CodeTrap programming contest at Daffodil International University.",
  },
  {
    group: "Competitions & Workshops",
    type: "Competition",
    title: "CodeTrap Programming Contest – Fall 2025",
    description: "Competed in the CodeTrap programming contest at Daffodil International University.",
  },
  {
    group: "Competitions & Workshops",
    type: "Competition",
    title: "DIU Breakout Algorithm Programming Contest – Spring 2025",
    description: "Participated in the algorithm programming contest at Daffodil International University.",
  },
  {
    group: "Competitions & Workshops",
    type: "Workshop",
    title: "Unlock Your Presentation Skills & Enhance Design Concepts",
    description: "Attended a professional development workshop at Daffodil International University, 2024.",
  },
] as const;

export const certificates = [
  {
    title: "Machine Learning Algorithms",
    issuer: "Simplilearn SkillUP",
    date: "Mar 2026",
    image: "/certs/Machine%20Learning%20Algorithms-1.png",
  },
  {
    title: "Web Dev: HTML, CSS & JS",
    issuer: "CodeSignal",
    date: "Mar 2026",
    image: "/certs/web_dev_html_css_basics-1.png",
  },
  {
    title: "PHP Laravel Basics",
    issuer: "CodeSignal",
    date: "Apr 2026",
    image: "/certs/PHP_LARAVEL-1.png",
  },
  {
    title: "AWS Cloud Security Foundations",
    issuer: "AWS Academy",
    date: "Apr 2026",
    image: "/certs/AWS_Academy_Graduate___Cloud_Security_Foundations-1.png",
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
