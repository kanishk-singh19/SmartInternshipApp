import { AIProvider } from "./aiProvider";

export class MockAIProvider implements AIProvider {
  async generatePlan({
    internship,
    userSkills,
  }: {
    internship: {
      role: string;
      company?: string;
      requiredSkills: string[];
      deadline: string;
    };
    userSkills: string[];
  }): Promise<string> {
    const missingSkills = internship.requiredSkills.filter(
      (skill) => !userSkills.includes(skill)
    );

    return `
Internship Preparation Plan

Role: ${internship.role}
Company: ${internship.company || "N/A"}
Deadline: ${internship.deadline}

Required Skills:
${internship.requiredSkills.join(", ")}

Your Skills:
${userSkills.join(", ")}

Missing Skills:
${missingSkills.length ? missingSkills.join(", ") : "None"}

Roadmap:
Week 1–2:
- Learn ${missingSkills.slice(0, 2).join(", ") || "Advanced concepts"}

Week 3–4:
- Build projects using ${internship.requiredSkills.join(", ")}

Interview Preparation:
- Core concepts of ${internship.role}
- Common interview questions

(Mock AI response)
`;
  }
}
