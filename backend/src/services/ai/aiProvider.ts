export interface AIProvider {
  generatePlan(input: {
    internship: {
      role: string;
      company?: string;
      requiredSkills: string[];
      deadline: string;
    };
    userSkills: string[];
  }): Promise<string>;
}
