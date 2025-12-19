import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider } from "./aiProvider";

export class GeminiProvider implements AIProvider {
  private model;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
  }

  async generatePlan(input: {
    internship: {
      role: string;
      company?: string;
      requiredSkills: string[];
      deadline: string;
    };
    userSkills: string[];
  }): Promise<string> {
    const { internship, userSkills } = input;

    const missingSkills = internship.requiredSkills.filter(
      (skill) => !userSkills.includes(skill)
    );

    const prompt = `
You are an expert AI career mentor.

Internship Details:
- Role: ${internship.role}
- Company: ${internship.company || "N/A"}
- Required Skills: ${internship.requiredSkills.join(", ")}
- Application Deadline: ${internship.deadline}

User Current Skills:
- ${userSkills.join(", ")}

Missing Skills:
- ${missingSkills.join(", ") || "None"}

TASK:
1. Identify the skill gaps.
2. Create a week-wise learning roadmap to cover missing skills before the deadline.
3. Prioritize skills based on internship requirements.
4. Suggest tools, resources, and project ideas.
5. Provide the top 5 most asked interview questions for this internship role.

Respond in a clear, structured format with headings and bullet points.
`;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Gemini generation failed");
    }
  }
}
