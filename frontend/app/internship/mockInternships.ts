// app/internship/mockInternships.ts

export type Internship = {
  id: string;
  title: string;
  company: string;
  skills: string[];
  deadline: string;
  description: string;
  location: string;
  stipend: string;
};

export const internships: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Google",
    skills: ["React", "JavaScript", "Tailwind"],
    deadline: "2025-02-15",
    description:
      "Work on modern frontend applications using React and Tailwind.",
    location: "Remote",
    stipend: "₹30,000 / month",
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "Amazon",
    skills: ["Node.js", "Express", "MongoDB"],
    deadline: "2025-03-01",
    description: "Build scalable backend APIs and services.",
    location: "Bangalore",
    stipend: "₹35,000 / month",
  },
  {
    id: "3",
    title: "Full Stack Intern",
    company: "Microsoft",
    skills: ["React", "Node.js", "SQL"],
    deadline: "2025-02-28",
    description: "Develop full stack features.",
    location: "Hyderabad",
    stipend: "₹40,000 / month",
  },
];
